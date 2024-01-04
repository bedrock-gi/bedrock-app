import type { ZodType } from "zod";
import { GridCellKind } from "@glideapps/glide-data-grid";

export interface TableColumn {
  accessor: string;
  label?: string;
  type: GridCellKind;
}

export enum ColumnType {
  String = "String",
  Number = "Number",
  Float = "Float",
  Boolean = "Boolean",
  DateTime = "DateTime",
}

export const getBaseType = (zodSchema: ZodType<any>): GridCellKind => {
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
      return GridCellKind.Number;
    } else if (
      zodSchema._def.options.find(
        (option) => option._def.typeName === "ZodDate"
      )
    ) {
      return GridCellKind.Text;
    }
  }

  return GridCellKind.Text;
};
