import type { ZodObject, ZodTypeAny } from "zod";
import { ZodNumber, z, ZodNullable, ZodDate } from "zod";
import type { ObjectWithStringKeys, DataColumns } from "../../types/agsMapping";

export type ZodPrismaType<T extends ObjectWithStringKeys> = ZodObject<
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
      //   throw error;
      // console.log(error);
      return undefined;
    }
  });
  const filteredRecords = parsedRecords.filter(
    (record) => record !== undefined
  ) as unknown as DataColumns<T>[];
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
      } else if (value instanceof ZodDate) {
        return [key, z.date().or(z.string().nonempty()).pipe(z.coerce.date())];
      } else if (
        value instanceof ZodNullable &&
        value._def.innerType instanceof ZodDate
      ) {
        return [
          key,
          z
            .literal("")
            .transform(() => undefined)
            .or(z.coerce.date())
            .optional(),
        ];
      }

      return [key, value];
    })
  );

  return z.object(updatedShape) as T;
}

export function makeNullableOptional<
  T extends ZodObject<X>,
  X extends ObjectWithStringKeys
>(schema: T): T {
  const shape = schema._def.shape();

  const updatedShape = Object.fromEntries(
    Object.entries(shape).map(([key, value]: [string, ZodTypeAny]) => {
      if (value instanceof ZodNullable) {
        return [key, value._def.innerType.optional()];
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
  const newSchema = removePrismaFieldsFromSchema(
    makeSchemaCoercePrimitives(schema)
  );
  return makeNullableOptional(newSchema);
}
