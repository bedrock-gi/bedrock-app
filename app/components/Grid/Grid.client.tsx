import "@glideapps/glide-data-grid/dist/index.css";

import type { GridCell, Item } from "@glideapps/glide-data-grid";
import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import { type TableColumn } from "~/models/ags/getTableColumns";
import type { ObjectWithStringKeys } from "~/types/agsMappingConfig";
import { Suspense } from "react";

interface Props {
  cols: TableColumn[];
  data: ObjectWithStringKeys[];
}

export default function Grid({ cols, data }: Props) {
  console.log("data", data);

  const columns = cols.map((col) => {
    return {
      title: col.label ?? col.accessor,
      width: 100,
    };
  });

  const colIndexMap = cols.reduce((acc, col, index) => {
    acc[index] = col;
    return acc;
  }, {} as { [key: number]: TableColumn });

  const getCellContent = (cell: Item): GridCell => {
    const [cellCol, cellRow] = cell;

    // console.log("cell", cell);

    const tableColumn = colIndexMap[cellCol];

    const rowData = data[cellRow];
    const d = rowData[tableColumn.accessor];
    // console.log("data", d);
    // console.log("rowData", rowData);
    // console.log("colName", colName);

    return {
      kind: tableColumn.type,
      data: d,
      displayData: JSON.stringify(d),
      allowOverlay: true,
      readonly: false,
    };
  };

  console.log("data length", data.length);
  console.log("data", data);
  console.log("data.includes", data.includes({}));

  return (
    <div className="h-full w-full overflow-scroll">
      <Suspense fallback={<div>Loading...</div>}>
        <DataEditor
          columns={columns}
          rows={data.length}
          getCellContent={getCellContent}
          getCellsForSelection={true}
        />
      </Suspense>
    </div>
  );
}
