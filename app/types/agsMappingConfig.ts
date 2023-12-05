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

type AgsUploadRecords<
  T extends ObjectWithStringKeys,
  M extends AgsMapping<T, any, any>
> = {
  newRecords: IncomingRecord<M>[];
  updatedRecords: IncomingRecord<M>[];
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

  async createRecords(records: IncomingRecord<this>[], projectId: string) {
    const parentMappings = this.#parentMappings();

    const preparedRecords = await this.prepareWriteData(
      records,
      parentMappings,
      projectId
    );

    await prisma[this.prismaLabel].createMany({ data: preparedRecords });
  }

  async #addIdToFieldsByUniqueConstraints(
    recordsWithConstraints: Pick<T, this["uniqueConstraint"][number]>[],
    idField: keyof OmitFields,
    removeConstraintFieldsFromRecord: boolean = true
  ) {
    // @ts-ignore
    const client = prisma[this.prismaLabel];

    const recordsWithIds = recordsWithConstraints.map(async (record) => {
      const where = {
        ags: this.uniqueConstraint.reduce((acc, key) => {
          acc[key] = record[key];
          return acc;
        }, {} as any),
      };

      const existingRecord = await client.findUnique({
        where,
      });

      if (removeConstraintFieldsFromRecord) {
        this.uniqueConstraint.forEach((key) => {
          delete record[key];
        });
      }

      return {
        ...record,
        [idField]: existingRecord.id,
      };
    });

    return Promise.all(recordsWithIds);
  }

  // #getIncludeForParentMappings() {
  //   const parentMappings = this.#parentMappings();

  //   const include = parentMappings.reduceRight((acc, mapping) => {
  //     const label = mapping.prismaLabel;
  //     const parentLabel = mapping.parentMapping?.prismaLabel;

  //     if (parentLabel) {
  //       acc[label] = {
  //         include: {
  //           [parentLabel]: true,
  //         },
  //       };
  //     } else {
  //       acc[label] = true;
  //     }

  //     return acc;
  //   }, {} as any);

  //   return include;
  // }

  async updateRecords(
    records: IncomingRecord<this>[],
    projectId: string
  ): Promise<void> {
    const parentMappings = this.#parentMappings();
    parentMappings.unshift(this);

    const preparedRecords = await this.prepareWriteData(
      records,
      parentMappings,
      projectId
    );

    preparedRecords.forEach(({ id, ...record }) =>
      prisma[this.prismaLabel].update({ where: id, data: record })
    );
    console.log("records updated for ", this.prismaLabel);
  }

  async prepareWriteData(
    records: IncomingRecord<this>[],
    mappings: AgsMappingAny[],
    projectId: string
  ) {
    let currentMapping: AgsMappingAny | undefined = mappings.pop();
    records = records.map((rec) => {
      return {
        ...rec,
        projectId,
      };
    });

    while (currentMapping) {
      const isThisMapping = currentMapping.prismaLabel === this.prismaLabel;

      const idLabel = isThisMapping ? "id" : `${currentMapping.prismaLabel}Id`;
      records = await currentMapping.#addIdToFieldsByUniqueConstraints(
        records,
        idLabel,
        !isThisMapping
      );

      currentMapping = mappings.pop();
    }
    return records;
  }

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
    const updatedRecords: IncomingRecord<this>[] = [];

    incomingRecords.forEach((incomingRecord) => {
      const existingRecord = this.#incomingRecordinExistingRecords(
        incomingRecord,
        existingRecords
      );

      if (existingRecord) {
        updatedRecords.push(incomingRecord);
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

    return summary;
  }
}
