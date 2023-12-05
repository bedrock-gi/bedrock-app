export interface TableHierarchy {
  name: string;
  label: string;
  children: TableHierarchy[];
}

export const tableHierarchy: TableHierarchy = {
  name: "location",
  label: "Locations",
  children: [
    {
      name: "sample",
      label: "Samples",
      children: [],
    },
  ],
};
