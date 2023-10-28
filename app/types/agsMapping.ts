import type { ZodPrismaType } from "../models/ags/zod";

export type ObjectWithStringKeys = {
  [key: string]: any;
};

export type DataColumns<T extends ObjectWithStringKeys> = Omit<
  T,
  "createdAt" | "updatedAt" | "id" | "customColumns"
>;

type AgsMapping<T extends ObjectWithStringKeys> = {
  agsTableName: string;
  prismaLabel: string;

  checkIfRecordExists: (
    record: DataColumns<ObjectWithStringKeys>,
    projectId: string
  ) => Promise<boolean>;

  zodSchema: ZodPrismaType<T>;
  columns: {
    [agsColumnName: string]: keyof DataColumns<T>;
  };
};
export default AgsMapping;
