import type { AgsRaw } from "~/types/ags";

import { parseAgs } from "./parse";

export class Ags {
  agsData: AgsRaw;

  constructor(public agsString: string) {
    this.agsString = agsString;
    this.agsData = parseAgs(agsString);
    // validateAgsColumnLengths(this.agsData);
  }
}
