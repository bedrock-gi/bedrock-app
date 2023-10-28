interface AgsUploadSummary {
  [key: string]: AgsUploadSummaryGroup;
}

interface AgsUploadSummaryGroup {
  tableName: string;
  newRecords: number;
  updatedRecords: number;
}

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

export enum agsType {
  X = "X",
  ID = "ID",
  PA = "PA",
  PT = "PT",
  PU = "PU",
  XN = "XN",
  T = "T",
  DT = "DT",
  MC = "MC",
  nDP = "nDP",
  nSCI = "nSCI",
  U = "U",
  YN = "YN",
  RL = "RL",
}
