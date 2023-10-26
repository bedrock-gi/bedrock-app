import { createColumnHelper } from "@tanstack/react-table";
import type {
  ObjectWithStringKeys,
  DataColumns,
} from "~/models/ags/mappingUtils";

export interface Column<T extends ObjectWithStringKeys> {
  label?: string;
  accessor: keyof DataColumns<T>;
}

export interface TableConfig<T extends ObjectWithStringKeys> {
  id: string;
  title: string;
  columns: Column<T>[];
}

// takes a prisma model and returns a table config
export function createColumns<T extends ObjectWithStringKeys>(
  config: TableConfig<T>
) {
  const columnHelper = createColumnHelper<T>();

  return config.columns.map((column) =>
    columnHelper.accessor((row: DataColumns<T>) => row[column.accessor], {
      id: column.accessor as string,
      header: column.label ? column.label : column.accessor.toString(),
      cell: (info) => info.getValue(),
    })
  );
}
