import type { ZodPrismaType } from "../models/ags/zod";
import { prisma } from "~/db.server";
import set from "set-value";

export type ObjectWithStringKeys = {
  [key: string]: any;
};

export type AgsMappingAny = AgsMapping<
  ObjectWithStringKeys,
  any,
  ObjectWithStringKeys
>;

export type DataColumns<T extends ObjectWithStringKeys> = Omit<
  T,
  "createdAt" | "updatedAt" | "id" | "customColumns"
>;

// type PrismaRecordWithParent<
//   T extends ObjectWithStringKeys,
//   K extends AgsMapping<T, any, any>
// > = T & {
//   [key: string]: PrismaRecordWithParent<T, K["parentMapping"]> | undefined;
// };

type AgsUploadRecords<
  T extends ObjectWithStringKeys,
  M extends AgsMapping<T, any, any>
> = {
  newRecords: IncomingRecord<M>[];
  updatedRecords: T[];
};

// type to create a union from array of string literals

type IncomingRecord<T extends AgsMapping<any, any, any>> = Omit<
  DataColumns<T>,
  keyof T["omitFields"]
> &
  T["inheritedFields"];

export abstract class AgsMapping<
  T extends ObjectWithStringKeys,
  OmitFields extends Partial<T>,
  InheritedFields extends ObjectWithStringKeys
> {
  constructor(
    public omitFields: (keyof OmitFields)[],
    public inheritedFields: (keyof InheritedFields)[],
    public zodSchema: ZodPrismaType<
      Omit<DataColumns<T>, keyof OmitFields> & InheritedFields
    >,
    public agsTableName: string,
    public prismaLabel: string,
    public columns: {
      [agsColumnName: string]: keyof (Omit<DataColumns<T>, keyof OmitFields> &
        InheritedFields);
    },
    public uniqueConstraint: (keyof DataColumns<T>)[],
    public parentMapping?: AgsMapping<
      ObjectWithStringKeys,
      any,
      ObjectWithStringKeys
    >
  ) {
    this.agsTableName = agsTableName;
    this.prismaLabel = prismaLabel;

    this.columns = columns;
    this.uniqueConstraint = uniqueConstraint;
    this.parentMapping = parentMapping;
    this.omitFields = omitFields;
    this.inheritedFields = inheritedFields;

    this.zodSchema = zodSchema;
  }

  abstract createRecords(
    records: DataColumns<T>[],
    projectId: string
  ): Promise<void>;

  abstract updateRecords(records: T[]): Promise<void>;

  #parentMappings() {
    let currentMapping: AgsMappingAny | undefined = this.parentMapping;
    const parentMappings = [];

    while (currentMapping) {
      parentMappings.push(currentMapping);
      currentMapping = currentMapping.parentMapping;
    }

    return parentMappings;
  }

  #prepareFindExistingRecordsQuery(
    records: IncomingRecord<this>[],
    projectId: string
  ) {
    const orClauses = records.map((record) => {
      const uniqueConstraint = this.uniqueConstraint;

      const where = uniqueConstraint.reduce((acc, key) => {
        acc[key] = {
          equals:
            key === "projectId"
              ? projectId
              : record[key as keyof IncomingRecord<this>],
        };

        return acc;
      }, {} as any);

      let recordClause = {
        AND: where,
      };

      let currentMapping: (typeof this)["parentMapping"] =
        this.parentMapping || undefined;

      const pathToParent = [];

      while (currentMapping) {
        const parentUniqueConstraint = currentMapping.uniqueConstraint;

        pathToParent.push(currentMapping.prismaLabel);

        const parentClause = parentUniqueConstraint.reduce((acc, key) => {
          acc[key] = {
            equals:
              key === "projectId"
                ? projectId
                : record[key as keyof IncomingRecord<this>],
          };

          return acc;
        }, {} as any);

        const path = pathToParent.join(".");
        set(recordClause, path, parentClause);

        const parentId = `${currentMapping.prismaLabel}Id`;
        delete recordClause.AND[parentId];
        currentMapping = currentMapping.parentMapping;
      }

      return recordClause;
    });

    const parentMappings = this.#parentMappings();

    const include = parentMappings.reduceRight((acc, mapping) => {
      const label = mapping.prismaLabel;
      const parentLabel = mapping.parentMapping?.prismaLabel;

      if (parentLabel) {
        acc[label] = {
          include: {
            [parentLabel]: true,
          },
        };
      } else {
        acc[label] = true;
      }

      return acc;
    }, {} as any);

    const query: any = {
      where: {
        OR: orClauses,
      },
    };

    if (Object.keys(include).length > 0) {
      query.include = include;
    }
    return query;
  }

  #incomingRecordinExistingRecords(
    incomingRecord: IncomingRecord<this>,
    existingRecords: (T & {
      [key: string]: any;
    })[]
  ) {
    const found = existingRecords.find((existingRecord) => {
      const uniqueConstraintForType = this.uniqueConstraint.filter(
        (key) => !this.omitFields.includes(key)
      );

      if (
        !uniqueConstraintForType.every(
          (key) =>
            existingRecord[key] ===
            incomingRecord[key as keyof IncomingRecord<this>]
        )
      ) {
        // console.log("unique constraint failed on first level");
        return false;
      }

      let currentMapping: AgsMappingAny | undefined =
        this.parentMapping || undefined;
      const pathToParent: string[] = [];

      while (currentMapping) {
        const parentUniqueConstraint =
          currentMapping.uniqueConstraint as string[];

        pathToParent.push(currentMapping.prismaLabel);
        const uniqueConstraintForType = parentUniqueConstraint.filter(
          (key) => !currentMapping?.omitFields.includes(key)
        );

        if (
          !uniqueConstraintForType.every((key) => {
            let value = existingRecord;
            pathToParent.forEach((path) => {
              value = value[path];
            });
            return (
              value[key] === incomingRecord[key as keyof IncomingRecord<this>]
            );
          })
        ) {
          // console.log("unique constraint failed on parent level");
          return false;
        }
        currentMapping = currentMapping.parentMapping;
      }
      return true;
    });

    return found;

    // we need to check all the values for the incoming record
    // and then recursively check the values for the parent records
    // const parentRelationKey = this.parentMapping?.prismaLabel;
  }

  // TODO fix this function
  #createAgsUploadRecords(
    existingRecords: T[],
    incomingRecords: IncomingRecord<this>[]
  ) {
    const newRecords: IncomingRecord<this>[] = [];
    const updatedRecords: T[] = [];

    incomingRecords.forEach((incomingRecord) => {
      const existingRecord = this.#incomingRecordinExistingRecords(
        incomingRecord,
        existingRecords
      );

      if (existingRecord) {
        updatedRecords.push(existingRecord);
        return;
      }
      newRecords.push(incomingRecord);
    });

    return {
      newRecords,
      updatedRecords,
    };
  }

  async findExistingRecords(
    records: IncomingRecord<this>[],
    projectId: string
  ): Promise<AgsUploadRecords<T, this>> {
    const queryData = this.#prepareFindExistingRecordsQuery(records, projectId);

    // @ts-ignore - this is a hack to get around the fact that the type of the
    // prisma client cannot be used for generic types
    const existingRecords: T[] = await prisma[this.prismaLabel].findMany(
      queryData
    );

    const summary = this.#createAgsUploadRecords(existingRecords, records);
    console.log("summary", {
      newrecords: summary.newRecords.length,
      updatedRecords: summary.updatedRecords.length,
    });
    return summary;
  }
}
