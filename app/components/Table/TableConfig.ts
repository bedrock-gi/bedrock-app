import { createColumnHelper } from "@tanstack/react-table";

import type { ObjectWithStringKeys, DataColumns } from "~/types/agsMapping";
import type AgsMapping from "~/types/agsMapping";

export interface Column<T extends ObjectWithStringKeys> {
  label?: string;
  accessor: keyof DataColumns<T>;
}

export class TableConfig<T extends ObjectWithStringKeys> {
  columns: {
    accessor: Exclude<
      keyof T,
      "id" | "createdAt" | "updatedAt" | "customColumns"
    >;
    label?: string;
  }[];
  constructor(public id: string, public title: string, mapping: AgsMapping<T>) {
    this.id = id;
    this.title = title;

    const cols = Object.values(mapping.columns).map((mapping) => {
      return {
        accessor: mapping as keyof DataColumns<T>,
      };
    });
    this.columns = cols;
  }

  getTableColumns() {
    const columnHelper = createColumnHelper<T>();

    return this.columns.map((column) =>
      columnHelper.accessor((row: DataColumns<T>) => row[column.accessor], {
        id: column.accessor as string,
        header: column.label ? column.label : column.accessor.toString(),
      })
    );
  }
}
