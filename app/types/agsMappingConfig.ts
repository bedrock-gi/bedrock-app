import type { ZodPrismaType } from "../models/ags/zod";
import { prisma } from "~/db.server";
import type { AgsMappingAny } from "~/models/ags/mappings";
import set from "set-value";

export type ObjectWithStringKeys = {
  [key: string]: any;
};

export type DataColumns<T extends ObjectWithStringKeys> = Omit<
  T,
  "createdAt" | "updatedAt" | "id" | "customColumns"
>;

type AgsUploadRecords<T extends ObjectWithStringKeys> = {
  newRecords: DataColumns<T>[];
  updatedRecords: T[];
};

export abstract class AgsMapping<
  T extends ObjectWithStringKeys,
  Parent extends ObjectWithStringKeys,
  OmitFields extends Partial<T>,
  InheritedFields extends Partial<Parent>
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
      Parent,
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
    records: DataColumns<T>[],
    projectId: string
  ) {
    const orClauses = records.map((record) => {
      const uniqueConstraint = this.uniqueConstraint;

      const where = uniqueConstraint.reduce((acc, key) => {
        acc[key] = {
          equals: key === "projectId" ? projectId : record[key],
        };

        return acc;
      }, {} as any);

      let recordClause = {
        AND: where,
      };

      let currentMapping: AgsMappingAny | undefined =
        this.parentMapping || undefined;

      const pathToParent = [];

      while (currentMapping) {
        const parentUniqueConstraint =
          currentMapping.uniqueConstraint as string[];

        pathToParent.push(currentMapping.prismaLabel);

        const parentClause = parentUniqueConstraint.reduce((acc, key) => {
          acc[key] = {
            equals: key === "projectId" ? projectId : record[key],
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

  // TODO fix this function
  #createAgsUploadRecords(
    existingRecords: T[],
    incomingRecords: DataColumns<T>[]
  ): AgsUploadRecords<T> {
    const newRecords: DataColumns<T>[] = [];
    const updatedRecords: T[] = [];

    incomingRecords.forEach((incomingRecord) => {
      const existingRecord = existingRecords.find((existingRecord) => {
        return this.uniqueConstraint.every((key) => {
          return existingRecord[key] === incomingRecord[key];
        });
      });

      if (existingRecord) {
        updatedRecords.push(existingRecord);
      } else {
        newRecords.push(incomingRecord);
      }
    });

    return {
      newRecords,
      updatedRecords,
    };
  }

  async findExistingRecords(
    records: DataColumns<T>[],
    projectId: string
  ): Promise<AgsUploadRecords<T>> {
    const queryData = this.#prepareFindExistingRecordsQuery(records, projectId);

    // @ts-ignore - this is a hack to get around the fact that the type of the
    // prisma client cannot be used for generic types
    const existingRecords: T[] = await prisma[this.prismaLabel].findMany(
      queryData
    );

    console.log("existingRecords", existingRecords.length);

    const summary = this.#createAgsUploadRecords(existingRecords, records);
    console.log("summary", {
      newrecords: summary.newRecords.length,
      updatedRecords: summary.updatedRecords.length,
    });
    return summary;
  }
}
