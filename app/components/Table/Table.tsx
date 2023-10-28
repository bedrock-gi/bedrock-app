import { useState } from "react";
import { Location } from "@prisma/client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TableConfig, createColumns } from "./TableConfig";
import { ObjectWithStringKeys } from "~/types/agsMapping";

interface Props<T extends ObjectWithStringKeys> {
  data: T[];
  tableConfig: TableConfig<T>;
}

export function Table<T extends ObjectWithStringKeys>({
  data,
  tableConfig,
}: Props<T>) {
  const columns = createColumns(tableConfig);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-y-scroll rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-semibold">{tableConfig.title}</h1>
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-200 px-4 py-2 text-sm font-semibold uppercase text-gray-800"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b border-gray-200 px-4 py-3 text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
}
