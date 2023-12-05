import { locationTableDataFetcher } from "./locations";
import { sampleTableDataFetcher } from "./samples";

export interface TableDataFetcher<T> {
  name: string;
  label: string;
  findAll: (projectId: string) => Promise<T[]>;
  getCount(projectId: string): Promise<number>;
}

export const tableDataFetchers = {
  location: locationTableDataFetcher,
  sample: sampleTableDataFetcher,
};
