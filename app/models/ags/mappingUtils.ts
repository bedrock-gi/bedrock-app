import type { ZodObject, ZodTypeAny } from "zod";
import { ZodNullable, ZodNumber, z } from "zod";
import type { GroupRaw } from "~/models/ags/models";

export type ObjectWithStringKeys = {
  [key: string]: any;
};

export type DataColumns<T extends ObjectWithStringKeys> = Omit<
  T,
  "createdAt" | "updatedAt" | "id" | "customColumns"
>;

type ZodPrismaType<T extends ObjectWithStringKeys> = z.ZodType<DataColumns<T>>;

export type AgsMapping<T extends ObjectWithStringKeys> = {
  agsTableName: string;
  prismaLabel: string;

  checkIfRecordExists: (
    record: DataColumns<ObjectWithStringKeys>
  ) => Promise<boolean>;

  zodSchema: ZodPrismaType<T>;
  columns: {
    [agsColumnName: string]: keyof DataColumns<T>;
  };
  __typeExample?: DataColumns<T>;
};

export function parseAgsGroup<T extends ObjectWithStringKeys>(
  agsData: GroupRaw,
  agsMapping: AgsMapping<T>
) {
  if (agsData.name !== agsMapping.agsTableName) {
    throw new Error(
      `Ags group name ${agsData.name} does not match expected name ${agsMapping.agsTableName}`
    );
  }

  const agsDataColumns = Object.keys(agsData.columns);

  //   find subset of agsDataColumns we expect
  const expectedAgsColumns = Object.keys(agsMapping.columns);

  const intersection = agsDataColumns.filter((x) =>
    expectedAgsColumns.includes(x)
  );

  //   for now, assume cols are same length
  const numRecords = agsData.columns[agsDataColumns[0]].data.length;

  const records: ObjectWithStringKeys[] = [];
  for (let i = 0; i < numRecords; i++) {
    const record = Object.fromEntries(
      intersection.map((column) => [
        agsMapping.columns[column],
        agsData.columns[column].data[i],
      ])
    );
    records.push(record);
  }

  return parseRecordsToZod(records, agsMapping.zodSchema);
}

const parseRecordsToZod = <T extends ObjectWithStringKeys>(
  records: T[],
  zodSchema: ZodPrismaType<T>
): {
  parsedRecords: DataColumns<T>[];
  errors: string[];
} => {
  const errors: string[] = [];

  const parsedRecords = records.map((record) => {
    try {
      return zodSchema.parse(record);
    } catch (error) {
      errors.push(error as string);
      console.log(error);
    }
  });
  const filteredRecords = parsedRecords.filter(
    (record) => record !== undefined
  ) as DataColumns<T>[];
  return { parsedRecords: filteredRecords, errors };
};

export function makeSchemaCoercePrimitives<
  T extends ZodObject<X>,
  X extends ObjectWithStringKeys
>(schema: T): T {
  const shape = schema._def.shape();

  const updatedShape = Object.fromEntries(
    Object.entries(shape).map(([key, value]: [string, ZodTypeAny]) => {
      if (value instanceof ZodNumber) {
        return [key, z.coerce.number()];
      } else if (
        value instanceof ZodNullable &&
        value._def.innerType instanceof ZodNumber
      ) {
        return [key, z.coerce.number().optional()];
      }

      return [key, value];
    })
  );

  return z.object(updatedShape) as T;
}

export function removePrismaFieldsFromSchema<
  T extends ZodObject<X>,
  X extends ObjectWithStringKeys
>(schema: T): T {
  return schema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    customColumns: true,
  }) as T;
}

export function prepareAgsZodSchema<
  T extends ZodObject<X>,
  X extends ObjectWithStringKeys
>(schema: T): T {
  return removePrismaFieldsFromSchema(makeSchemaCoercePrimitives(schema));
}
