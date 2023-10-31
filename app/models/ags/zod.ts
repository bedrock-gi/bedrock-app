import type { ZodObject, ZodTypeAny } from "zod";
import { ZodNumber, z, ZodNullable } from "zod";
import type { ObjectWithStringKeys, DataColumns } from "../../types/agsMapping";

export type ZodPrismaType<T extends ObjectWithStringKeys> = z.ZodType<
  DataColumns<T>
>;

export const parseRecordsToZod = <T extends ObjectWithStringKeys>(
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
      return undefined;
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
        // parses non empty string to number, empty string to undefined, number to number
        return [
          key,
          z.number().or(z.string().nonempty()).pipe(z.coerce.number()),
        ];
      } else if (
        value instanceof ZodNullable &&
        value._def.innerType instanceof ZodNumber
      ) {
        return [
          key,
          z
            .literal("")
            .transform(() => undefined)
            .or(z.coerce.number())
            .optional(),
        ];
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
