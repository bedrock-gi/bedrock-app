import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
  Column,
} from "react-datasheet-grid";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";
import { ZodTypeAny } from "zod";
import { ZodPrismaType } from "~/models/ags/zod";

interface Props {
  zodSchema: ZodTypeAny;
}

export default function Grid({ zodSchema }: Props) {
  console.log(zodSchema);

  return <DataSheetGrid />;
}
