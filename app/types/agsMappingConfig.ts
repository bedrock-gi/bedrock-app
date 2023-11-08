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
    public zodSchema: ZodPrismaType<
      Omit<T, keyof OmitFields> & InheritedFields
    >,
    public agsTableName: string,
    public prismaLabel: string,
    public columns: {
      [agsColumnName: string]: keyof (Omit<T, keyof OmitFields> &
        InheritedFields);
    },
    public uniqueConstraint: keyof DataColumns<T>[],
    public parent?: Parent
  ) {
    this.agsTableName = agsTableName;
    this.prismaLabel = prismaLabel;
    this.parent = parent;
    this.columns = columns;
    this.zodSchema = zodSchema;
    this.uniqueConstraint = uniqueConstraint;
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
