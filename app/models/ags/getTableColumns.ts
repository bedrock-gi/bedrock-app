import { ObjectWithStringKeys } from "~/types/agsMappingConfig";
import { ZodPrismaType } from "./zod";
import { ZodObject, ZodType } from "zod";

export interface TableColumn {
  accessor: string;
  label?: string;
  type: ColumnType;
}

export enum ColumnType {
  String = "String",
  Number = "Number",
  Float = "Float",
  Boolean = "Boolean",
  DateTime = "DateTime",
}

export const getBaseType = (zodSchema: ZodType<any>): ColumnType => {
  // console.log(zodSchema._def);

  while (zodSchema._def.innerType) {
    zodSchema = zodSchema._def.innerType;
  }

  if (zodSchema._def.typeName === "ZodUnion") {
    if (
      zodSchema._def.options.find(
        (option) => option._def.typeName === "ZodNumber"
      )
    ) {
      return ColumnType.Number;
    } else if (
      zodSchema._def.options.find(
        (option) => option._def.typeName === "ZodDate"
      )
    ) {
      return ColumnType.DateTime;
    }
  }

  return ColumnType.String;
};
