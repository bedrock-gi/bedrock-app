import type { ZodPrismaType } from "../models/ags/zod";

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
    public uniqueConstraint: keyof DataColumns<T>[],
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

  abstract findExistingRecords(
    records: DataColumns<T>[],
    parentId: string
  ): Promise<AgsUploadRecords<T>>;
}
