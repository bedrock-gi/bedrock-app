import { useMemo, useState } from "react";
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
  Column,
  dateColumn,
  floatColumn,
} from "react-datasheet-grid";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";
import { ZodTypeAny } from "zod";
import { ColumnType, TableColumn } from "~/models/ags/getTableColumns";
import { ZodPrismaType } from "~/models/ags/zod";

interface Props {
  cols: TableColumn[];
}

export default function Grid({ cols }: Props) {
  const timestamp = new Date().getTime();
  console.log("rendering grid", timestamp);

  const [data, setData] = useState<any[]>([]);

  const columns = useMemo(
    () =>
      cols.map((col) => {
        if (col.type === ColumnType.Boolean)
          return {
            ...keyColumn(col.accessor, checkboxColumn),
            title: col.label,
            id: col.accessor,
          };
        else if (col.type === ColumnType.String)
          return {
            ...keyColumn(col.accessor, textColumn),
            title: col.label,
            id: col.accessor,
          };
        else if (col.type === ColumnType.Number)
          return {
            ...keyColumn(col.accessor, floatColumn),
            title: col.label,
            id: col.accessor,
          };
        else if (col.type === ColumnType.DateTime)
          return {
            ...keyColumn(col.accessor, dateColumn),
            title: col.label,
            id: col.accessor,
          };

        return {
          ...keyColumn(col.accessor, textColumn),
          title: col.label,
          id: col.accessor,
        };
      }),
    [cols]
  );

  return (
    <div>
      <DataSheetGrid columns={columns} value={data} onChange={setData} />;
    </div>
  );
}
