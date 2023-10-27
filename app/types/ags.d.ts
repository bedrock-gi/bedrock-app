interface AgsUploadSummary {
  [key: string]: AgsUploadSummaryGroup;
}

interface AgsUploadSummaryGroup {
  tableName: string;
  newRecords: number;
  updatedRecords: number;
}
