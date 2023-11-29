import { locationTableDataFetcher } from "./locations";

export interface TableDataFetcher<T> {
  name: string;
  findAll: (projectId: string) => Promise<T[]>;
}

export const tableDataFetchers = {
  location: locationTableDataFetcher,
};
