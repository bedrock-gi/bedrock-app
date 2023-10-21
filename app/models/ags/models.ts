import { agsType } from "./agsTypes";
import {
  parseAgs,
  validateAgsColumnLengths,
  validateGroupColumnLengths,
} from "./parse";

export interface HeadingRaw {
  name: string;
  type: agsType;
  unit: string;
}

export interface ColumnRaw {
  heading: HeadingRaw;
  data: string[];
}

export interface GroupRaw {
  name: string;
  columns: {
    [key: string]: ColumnRaw;
  };
}

export interface AgsRaw {
  [key: string]: GroupRaw;
}

export class Ags {
  agsData: AgsRaw;

  constructor(public agsString: string) {
    this.agsString = agsString;
    this.agsData = parseAgs(agsString);
    validateAgsColumnLengths(this.agsData);
  }

  getNumRecords() {
    return Object.values(this.agsData)[0].columns[0].data.length;
  }
}
