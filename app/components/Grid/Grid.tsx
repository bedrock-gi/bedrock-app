import "@glideapps/glide-data-grid/dist/index.css";

import type { GridCell, Item } from "@glideapps/glide-data-grid";
import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import type { TableColumn } from "~/models/ags/getTableColumns";
import type { ObjectWithStringKeys } from "~/types/agsMappingConfig";

const glideModule = require("@glideapps/glide-data-grid");

interface Props {
  cols: TableColumn[];
  data: ObjectWithStringKeys[];
}

export default function Grid({ cols, data }: Props) {
  const columns = cols.map((col) => {
    return {
      title: col.label ?? col.accessor,
      width: 100,
    };
  });

  const colIndexMap = cols.reduce((acc, col, index) => {
    acc[index] = col.accessor;
    return acc;
  }, {} as { [key: number]: string });

  const getCellContent = (cell: Item): GridCell => {
    const [cellRow, cellCol] = cell;

    const colName = colIndexMap[cellCol];
    return {
      kind: GridCellKind.Text,
      data: data[cellRow][colName],
      displayData: data[cellRow][colName],
      allowOverlay: false,
    };
  };

  return (
    <div className="h-full w-full overflow-scroll">
      <DataEditor
        columns={columns}
        rows={data.length}
        getCellContent={getCellContent}
      />
    </div>
  );
}
