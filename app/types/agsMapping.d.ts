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

export type AgsMapping<T extends ObjectWithStringKeys> = {
  agsTableName: string;
  prismaLabel: string;

  createRecords: (
    records: DataColumns<T>[],
    projectId: string
  ) => Promise<void>;
  updateRecords: (records: T[]) => Promise<void>;

  findExistingRecords: (
    records: DataColumns<T>[],
    parentId: string
  ) => Promise<AgsUploadRecords<T>>;

  zodSchema: ZodPrismaType;
  columns: {
    [agsColumnName: string]: keyof DataColumns<T>;
  };
};
