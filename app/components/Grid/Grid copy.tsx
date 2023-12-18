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
    {
      minWidth: 100,
      maxWidth: 100,
      ...keyColumn("active", checkboxColumn),
      title: "Active",
    },
    {
      minWidth: 100,
      maxWidth: 100,
      ...keyColumn("firstName", textColumn),
      title: "First name",
    },
    {
      minWidth: 100,
      maxWidth: 100,
      ...keyColumn("lastName", textColumn),
      title: "Last name",
    },
    // generate 20 cols
    ...Array.from({ length: 20 }, (_, i) => ({
      minWidth: 100,
      maxWidth: 100,
      ...keyColumn(`col${i}`, textColumn),
      title: `Col ${i}`,
    })),
  ];

  return <DataSheetGrid value={data} onChange={setData} columns={columns} />;
};
