import { locationMapping } from "./location";
import { sampleMapping } from "./sample";

export type TableMapping = {
  mapping: any;
  children: TableMapping[];
};

export const mappingsHierarchy: TableMapping = {
  mapping: locationMapping,
  children: [
    {
      mapping: sampleMapping,
      children: [],
    },
  ],
};

export const mappings = {
  location: locationMapping,
  sample: sampleMapping,
};

export type PrismaTable = "location" | "sample";
