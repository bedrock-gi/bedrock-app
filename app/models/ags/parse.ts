import type { GroupRaw, agsType, AgsRaw } from "~/types/ags";
import type {
  AgsMapping,
  ObjectWithStringKeys,
} from "../../types/agsMappingConfig";

import { parseRecordsToZod } from "./zod";

const newLineRegex = /\r?\n/;

export function parse(input: string): string {
  return input;
}

export function parseLine(input: string): string[] {
  //   each entry in input should be surrounded by double quotes
  //   each entry should be separated by a comma
  //   input should be parsed into an array of strings

  const parsedInput = input.split(",");
  const parsedInputNoQuotes = parsedInput.map((entry) => {
    return entry.replace(/"/g, "");
  });
  return parsedInputNoQuotes;
}

export function parseGroup(input: string): GroupRaw {
  // we are assuming validation on structure has already been done
  const parsedInput = input.split(newLineRegex);
  const lines = parsedInput.map((line) => parseLine(line));

  const [
    [, groupName],
    [, ...headings],
    [, ...units],
    [, ...types],
    ...dataLines
  ] = lines;

  const data = dataLines.map((line) => line.slice(1));

  const columns = headings.map((heading, index) => {
    return {
      heading: {
        name: heading,
        type: types[index] as agsType,
        unit: units[index],
      },
      data: data.map((line) => line[index]),
    };
  });

  return {
    name: groupName,
    columns: Object.fromEntries(
      columns.map((column) => [column.heading.name, column])
    ),
  };
}

export const parseAgs = (input: string) => {
  const splitter = /\n"GROUP",/;

  const parsedInput = input
    .split(splitter)
    .map((group, index) => (index === 0 ? group : `GROUP,${group}`));

  const groups = parsedInput.map((group) => parseGroup(group));

  const ags: AgsRaw = {};
  groups.forEach((group) => {
    ags[group.name] = group;
  });

  return ags;
};

// export const validateGroupColumnLengths = (agsData: GroupRaw) => {
//   const numRecords = Object.values(agsData.columns)[0].data.length;
//   const agsDataColumns = Object.keys(agsData.columns);
//   agsDataColumns.forEach((column) => {
//     if (agsData.columns[column].data.length !== numRecords) {
//       throw new Error(
//         `Column ${column} has length ${agsData.columns[column].data.length} but expected ${numRecords}`
//       );
//     }
//   });
// };

// export const validateAgsColumnLengths = (agsData: AgsRaw) => {
//   Object.values(agsData).forEach((group) => {
//     validateGroupColumnLengths(group);
//   });
// };

export function parseAgsGroup<T extends ObjectWithStringKeys>(
  agsData: GroupRaw,
  agsMapping: AgsMapping<T>
) {
  if (agsData.name !== agsMapping.agsTableName) {
    throw new Error(
      `Ags group name ${agsData.name} does not match expected name ${agsMapping.agsTableName}`
    );
  }

  const agsDataColumns = Object.keys(agsData.columns);

  //   find subset of agsDataColumns we expect
  const expectedAgsColumns = Object.keys(agsMapping.columns);

  const intersection = agsDataColumns.filter((x) =>
    expectedAgsColumns.includes(x)
  );

  //   for now, assume cols are same length
  const numRecords = agsData.columns[agsDataColumns[0]].data.length;

  const records: ObjectWithStringKeys[] = [];
  for (let i = 0; i < numRecords; i++) {
    const record = Object.fromEntries(
      intersection.map((column) => [
        agsMapping.columns[column],
        agsData.columns[column].data[i],
      ])
    );
    records.push(record);
  }

  return parseRecordsToZod(records, agsMapping.zodSchema);
}
