import type { AgsMapping } from "../mappingUtils";
import { locationMapping } from "./locations";

export type TableMapping = {
  [key in PrismaTable]: AgsMapping<any>;
};

export const mappings = {
  location: locationMapping,
};

export type PrismaTable = "location";
