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

export const Example = () => {
  const [data, setData] = useState<any>([
    { active: true, firstName: "Elon", lastName: "Musk" },
    { active: false, firstName: "Jeff", lastName: "Bezos" },
  ]);

  const columns = [
    { ...keyColumn("active", checkboxColumn), title: "Active" },
    { ...keyColumn("firstName", textColumn), title: "First name" },
    { ...keyColumn("lastName", textColumn), title: "Last name" },
    // generate 20 cols
    ...Array.from({ length: 20 }, (_, i) => ({
      ...keyColumn(`col${i}`, textColumn),
      title: `Col ${i}`,
    })),
  ];

  return <DataSheetGrid value={data} onChange={setData} columns={columns} />;
};
