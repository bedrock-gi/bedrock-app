import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','createdAt','updatedAt']);

export const UserProjectScalarFieldEnumSchema = z.enum(['role','createdAt','updatedAt','userId','projectId']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const LocationScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','projectId','latitude','longitude','customColumns','locationType','locationStatus','nationalEasting','nationalNorthing','gridReference','groundLevel','remarks','finalDepth','startDate','purpose','termination','endDate','gridReferenceLetter','localGridX','localGridY','localDatumLevel','localGridSystem','localDatumSystem','endOfTraverseEasting','endOfTraverseNorthing','endOfTraverseGroundLevel','localGridEasting','localGridNorthing','localElevation','latitudeEnd','longitudeEnd','projectionFormat','locationMethod','locationSubdivision','phaseGrouping','alignmentId','offset','chainage','transformDetails','associatedFileReference','nationalDatum','originalHoleId','originalJobReference','originatingCompany']);

export const SampleScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','locationId','depthTop','sampleReference','sampleType','sampleUniqueID','depthBase','dateAndTimeSampleTaken','numBlowsRequired','sampleContainer','samplePreparation','sampleDiameter','depthToWaterBelowGroundSurface','percentageSampleRecovered','samplingTechnique','sampleMatrix','sampleQAType','samplerInitials','reasonForSampling','sampleRemarks','sampleDescription','dateSampleDescribed','personResponsibleForDescription','sampleCondition','sampleClassification','barometricPressure','sampleTemperature','gasPressureAboveBarometric','gasFlowRate','dateAndTimeSamplingCompleted','samplingDuration','captionUsedToDescribeSample','sampleRecordLink','stratumReference','associatedFileReference','lengthSampleRecovered']);

export const ColumnDefinitionScalarFieldEnumSchema = z.enum(['id','columnId','tableId','projectId','label','dataType']);

export const AgsUploadScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','projectId','fileUrl','parsedRecordsUrl','status','newRecordsCount','updatedRecordsCount']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const RoleSchema = z.enum(['OWNER','ADMIN','VIEWER','EDITOR']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const DataTypeSchema = z.enum(['STRING','NUMBER']);

export type DataTypeType = `${z.infer<typeof DataTypeSchema>}`

export const AgsUploadStatusSchema = z.enum(['VALIDATED','CANCELLED','FAILED','COMPLETED','STARTED']);

export type AgsUploadStatusType = `${z.infer<typeof AgsUploadStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PROJECT SCHEMA
/////////////////////////////////////////

export const UserProjectSchema = z.object({
  role: RoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  projectId: z.string(),
})

export type UserProject = z.infer<typeof UserProjectSchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  projectId: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  customColumns: NullableJsonValue.optional(),
  locationType: z.string().nullable(),
  locationStatus: z.string().nullable(),
  nationalEasting: z.number().nullable(),
  nationalNorthing: z.number().nullable(),
  gridReference: z.string().nullable(),
  groundLevel: z.number().nullable(),
  remarks: z.string().nullable(),
  finalDepth: z.number().nullable(),
  startDate: z.coerce.date().nullable(),
  purpose: z.string().nullable(),
  termination: z.string().nullable(),
  endDate: z.coerce.date().nullable(),
  gridReferenceLetter: z.string().nullable(),
  localGridX: z.number().nullable(),
  localGridY: z.number().nullable(),
  localDatumLevel: z.number().nullable(),
  localGridSystem: z.string().nullable(),
  localDatumSystem: z.string().nullable(),
  endOfTraverseEasting: z.number().nullable(),
  endOfTraverseNorthing: z.number().nullable(),
  endOfTraverseGroundLevel: z.number().nullable(),
  localGridEasting: z.number().nullable(),
  localGridNorthing: z.number().nullable(),
  localElevation: z.number().nullable(),
  latitudeEnd: z.string().nullable(),
  longitudeEnd: z.string().nullable(),
  projectionFormat: z.string().nullable(),
  locationMethod: z.string().nullable(),
  locationSubdivision: z.string().nullable(),
  phaseGrouping: z.string().nullable(),
  alignmentId: z.string().nullable(),
  offset: z.number().nullable(),
  chainage: z.string().nullable(),
  transformDetails: z.string().nullable(),
  associatedFileReference: z.string().nullable(),
  nationalDatum: z.string().nullable(),
  originalHoleId: z.string().nullable(),
  originalJobReference: z.string().nullable(),
  originatingCompany: z.string().nullable(),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// SAMPLE SCHEMA
/////////////////////////////////////////

export const SampleSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  locationId: z.string(),
  depthTop: z.number().nullable(),
  sampleReference: z.string().nullable(),
  sampleType: z.string().nullable(),
  sampleUniqueID: z.string().nullable(),
  depthBase: z.number().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().nullable(),
  numBlowsRequired: z.number().int().nullable(),
  sampleContainer: z.string().nullable(),
  samplePreparation: z.string().nullable(),
  sampleDiameter: z.number().nullable(),
  depthToWaterBelowGroundSurface: z.number().nullable(),
  percentageSampleRecovered: z.number().nullable(),
  samplingTechnique: z.string().nullable(),
  sampleMatrix: z.string().nullable(),
  sampleQAType: z.string().nullable(),
  samplerInitials: z.string().nullable(),
  reasonForSampling: z.string().nullable(),
  sampleRemarks: z.string().nullable(),
  sampleDescription: z.string().nullable(),
  dateSampleDescribed: z.coerce.date().nullable(),
  personResponsibleForDescription: z.string().nullable(),
  sampleCondition: z.string().nullable(),
  sampleClassification: z.string().nullable(),
  barometricPressure: z.number().nullable(),
  sampleTemperature: z.number().nullable(),
  gasPressureAboveBarometric: z.number().nullable(),
  gasFlowRate: z.number().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().nullable(),
  samplingDuration: z.string().nullable(),
  captionUsedToDescribeSample: z.string().nullable(),
  sampleRecordLink: z.string().nullable(),
  stratumReference: z.string().nullable(),
  associatedFileReference: z.string().nullable(),
  lengthSampleRecovered: z.number().nullable(),
})

export type Sample = z.infer<typeof SampleSchema>

/////////////////////////////////////////
// COLUMN DEFINITION SCHEMA
/////////////////////////////////////////

export const ColumnDefinitionSchema = z.object({
  dataType: DataTypeSchema,
  id: z.string().uuid(),
  columnId: z.string(),
  tableId: z.string(),
  projectId: z.string(),
  label: z.string(),
})

export type ColumnDefinition = z.infer<typeof ColumnDefinitionSchema>

/////////////////////////////////////////
// AGS UPLOAD SCHEMA
/////////////////////////////////////////

export const AgsUploadSchema = z.object({
  status: AgsUploadStatusSchema,
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  projectId: z.string(),
  fileUrl: z.string().nullable(),
  parsedRecordsUrl: z.string().nullable(),
  newRecordsCount: z.number().int().nullable(),
  updatedRecordsCount: z.number().int().nullable(),
})

export type AgsUpload = z.infer<typeof AgsUploadSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  userProjects: z.union([z.boolean(),z.lazy(() => UserProjectFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  userProjects: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userProjects: z.union([z.boolean(),z.lazy(() => UserProjectFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER PROJECT
//------------------------------------------------------

export const UserProjectIncludeSchema: z.ZodType<Prisma.UserProjectInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  agsUploads: z.union([z.boolean(),z.lazy(() => AgsUploadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserProjectArgsSchema: z.ZodType<Prisma.UserProjectArgs> = z.object({
  select: z.lazy(() => UserProjectSelectSchema).optional(),
  include: z.lazy(() => UserProjectIncludeSchema).optional(),
}).strict();

export const UserProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.UserProjectCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.UserProjectCountOutputTypeSelect> = z.object({
  agsUploads: z.boolean().optional(),
}).strict();

export const UserProjectSelectSchema: z.ZodType<Prisma.UserProjectSelect> = z.object({
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  agsUploads: z.union([z.boolean(),z.lazy(() => AgsUploadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  locations: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  userProjects: z.union([z.boolean(),z.lazy(() => UserProjectFindManyArgsSchema)]).optional(),
  columnDefinitions: z.union([z.boolean(),z.lazy(() => ColumnDefinitionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  locations: z.boolean().optional(),
  userProjects: z.boolean().optional(),
  columnDefinitions: z.boolean().optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  locations: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  userProjects: z.union([z.boolean(),z.lazy(() => UserProjectFindManyArgsSchema)]).optional(),
  columnDefinitions: z.union([z.boolean(),z.lazy(() => ColumnDefinitionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  samples: z.union([z.boolean(),z.lazy(() => SampleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationCountOutputTypeArgsSchema: z.ZodType<Prisma.LocationCountOutputTypeArgs> = z.object({
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LocationCountOutputTypeSelectSchema: z.ZodType<Prisma.LocationCountOutputTypeSelect> = z.object({
  samples: z.boolean().optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  projectId: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  customColumns: z.boolean().optional(),
  locationType: z.boolean().optional(),
  locationStatus: z.boolean().optional(),
  nationalEasting: z.boolean().optional(),
  nationalNorthing: z.boolean().optional(),
  gridReference: z.boolean().optional(),
  groundLevel: z.boolean().optional(),
  remarks: z.boolean().optional(),
  finalDepth: z.boolean().optional(),
  startDate: z.boolean().optional(),
  purpose: z.boolean().optional(),
  termination: z.boolean().optional(),
  endDate: z.boolean().optional(),
  gridReferenceLetter: z.boolean().optional(),
  localGridX: z.boolean().optional(),
  localGridY: z.boolean().optional(),
  localDatumLevel: z.boolean().optional(),
  localGridSystem: z.boolean().optional(),
  localDatumSystem: z.boolean().optional(),
  endOfTraverseEasting: z.boolean().optional(),
  endOfTraverseNorthing: z.boolean().optional(),
  endOfTraverseGroundLevel: z.boolean().optional(),
  localGridEasting: z.boolean().optional(),
  localGridNorthing: z.boolean().optional(),
  localElevation: z.boolean().optional(),
  latitudeEnd: z.boolean().optional(),
  longitudeEnd: z.boolean().optional(),
  projectionFormat: z.boolean().optional(),
  locationMethod: z.boolean().optional(),
  locationSubdivision: z.boolean().optional(),
  phaseGrouping: z.boolean().optional(),
  alignmentId: z.boolean().optional(),
  offset: z.boolean().optional(),
  chainage: z.boolean().optional(),
  transformDetails: z.boolean().optional(),
  associatedFileReference: z.boolean().optional(),
  nationalDatum: z.boolean().optional(),
  originalHoleId: z.boolean().optional(),
  originalJobReference: z.boolean().optional(),
  originatingCompany: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  samples: z.union([z.boolean(),z.lazy(() => SampleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SAMPLE
//------------------------------------------------------

export const SampleIncludeSchema: z.ZodType<Prisma.SampleInclude> = z.object({
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
}).strict()

export const SampleArgsSchema: z.ZodType<Prisma.SampleArgs> = z.object({
  select: z.lazy(() => SampleSelectSchema).optional(),
  include: z.lazy(() => SampleIncludeSchema).optional(),
}).strict();

export const SampleSelectSchema: z.ZodType<Prisma.SampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  locationId: z.boolean().optional(),
  depthTop: z.boolean().optional(),
  sampleReference: z.boolean().optional(),
  sampleType: z.boolean().optional(),
  sampleUniqueID: z.boolean().optional(),
  depthBase: z.boolean().optional(),
  dateAndTimeSampleTaken: z.boolean().optional(),
  numBlowsRequired: z.boolean().optional(),
  sampleContainer: z.boolean().optional(),
  samplePreparation: z.boolean().optional(),
  sampleDiameter: z.boolean().optional(),
  depthToWaterBelowGroundSurface: z.boolean().optional(),
  percentageSampleRecovered: z.boolean().optional(),
  samplingTechnique: z.boolean().optional(),
  sampleMatrix: z.boolean().optional(),
  sampleQAType: z.boolean().optional(),
  samplerInitials: z.boolean().optional(),
  reasonForSampling: z.boolean().optional(),
  sampleRemarks: z.boolean().optional(),
  sampleDescription: z.boolean().optional(),
  dateSampleDescribed: z.boolean().optional(),
  personResponsibleForDescription: z.boolean().optional(),
  sampleCondition: z.boolean().optional(),
  sampleClassification: z.boolean().optional(),
  barometricPressure: z.boolean().optional(),
  sampleTemperature: z.boolean().optional(),
  gasPressureAboveBarometric: z.boolean().optional(),
  gasFlowRate: z.boolean().optional(),
  dateAndTimeSamplingCompleted: z.boolean().optional(),
  samplingDuration: z.boolean().optional(),
  captionUsedToDescribeSample: z.boolean().optional(),
  sampleRecordLink: z.boolean().optional(),
  stratumReference: z.boolean().optional(),
  associatedFileReference: z.boolean().optional(),
  lengthSampleRecovered: z.boolean().optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
}).strict()

// COLUMN DEFINITION
//------------------------------------------------------

export const ColumnDefinitionIncludeSchema: z.ZodType<Prisma.ColumnDefinitionInclude> = z.object({
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

export const ColumnDefinitionArgsSchema: z.ZodType<Prisma.ColumnDefinitionArgs> = z.object({
  select: z.lazy(() => ColumnDefinitionSelectSchema).optional(),
  include: z.lazy(() => ColumnDefinitionIncludeSchema).optional(),
}).strict();

export const ColumnDefinitionSelectSchema: z.ZodType<Prisma.ColumnDefinitionSelect> = z.object({
  id: z.boolean().optional(),
  columnId: z.boolean().optional(),
  tableId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  label: z.boolean().optional(),
  dataType: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// AGS UPLOAD
//------------------------------------------------------

export const AgsUploadIncludeSchema: z.ZodType<Prisma.AgsUploadInclude> = z.object({
  userProject: z.union([z.boolean(),z.lazy(() => UserProjectArgsSchema)]).optional(),
}).strict()

export const AgsUploadArgsSchema: z.ZodType<Prisma.AgsUploadArgs> = z.object({
  select: z.lazy(() => AgsUploadSelectSchema).optional(),
  include: z.lazy(() => AgsUploadIncludeSchema).optional(),
}).strict();

export const AgsUploadSelectSchema: z.ZodType<Prisma.AgsUploadSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  fileUrl: z.boolean().optional(),
  parsedRecordsUrl: z.boolean().optional(),
  status: z.boolean().optional(),
  newRecordsCount: z.boolean().optional(),
  updatedRecordsCount: z.boolean().optional(),
  userProject: z.union([z.boolean(),z.lazy(() => UserProjectArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userProjects: z.lazy(() => UserProjectListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userProjects: z.lazy(() => UserProjectOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserProjectWhereInputSchema: z.ZodType<Prisma.UserProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProjectWhereInputSchema),z.lazy(() => UserProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProjectWhereInputSchema),z.lazy(() => UserProjectWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  agsUploads: z.lazy(() => AgsUploadListRelationFilterSchema).optional()
}).strict();

export const UserProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProjectOrderByWithRelationInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
  agsUploads: z.lazy(() => AgsUploadOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserProjectWhereUniqueInputSchema: z.ZodType<Prisma.UserProjectWhereUniqueInput> = z.object({
  userId_projectId: z.lazy(() => UserProjectUserIdProjectIdCompoundUniqueInputSchema).optional()
}).strict();

export const UserProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProjectOrderByWithAggregationInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserProjectCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserProjectMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locations: z.lazy(() => LocationListRelationFilterSchema).optional(),
  userProjects: z.lazy(() => UserProjectListRelationFilterSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionListRelationFilterSchema).optional()
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  locations: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectOrderByRelationAggregateInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  customColumns: z.lazy(() => JsonNullableFilterSchema).optional(),
  locationType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  locationStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nationalEasting: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  nationalNorthing: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gridReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  groundLevel: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  remarks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalDepth: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  purpose: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  termination: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  localGridX: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridY: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localDatumLevel: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridSystem: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  localDatumSystem: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridEasting: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridNorthing: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localElevation: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  latitudeEnd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitudeEnd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectionFormat: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  locationMethod: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  locationSubdivision: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phaseGrouping: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alignmentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  offset: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  chainage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  transformDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  associatedFileReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nationalDatum: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  originalHoleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  originalJobReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  originatingCompany: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  samples: z.lazy(() => SampleListRelationFilterSchema).optional()
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  customColumns: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationalEasting: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationalNorthing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gridReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  groundLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remarks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  finalDepth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  purpose: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  termination: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gridReferenceLetter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridX: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridY: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localDatumLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridSystem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localDatumSystem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endOfTraverseEasting: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endOfTraverseNorthing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endOfTraverseGroundLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridEasting: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridNorthing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localElevation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitudeEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitudeEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectionFormat: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationMethod: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationSubdivision: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phaseGrouping: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alignmentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  offset: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chainage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  transformDetails: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  associatedFileReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationalDatum: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  originalHoleId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  originalJobReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  originatingCompany: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
  samples: z.lazy(() => SampleOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  customColumns: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationalEasting: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationalNorthing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gridReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  groundLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remarks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  finalDepth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  purpose: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  termination: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gridReferenceLetter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridX: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridY: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localDatumLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridSystem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localDatumSystem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endOfTraverseEasting: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endOfTraverseNorthing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endOfTraverseGroundLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridEasting: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localGridNorthing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  localElevation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitudeEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitudeEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectionFormat: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationMethod: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationSubdivision: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phaseGrouping: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alignmentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  offset: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chainage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  transformDetails: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  associatedFileReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationalDatum: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  originalHoleId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  originalJobReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  originatingCompany: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  customColumns: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  locationType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  locationStatus: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nationalEasting: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  nationalNorthing: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  gridReference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  groundLevel: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  remarks: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  finalDepth: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  purpose: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  termination: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  localGridX: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  localGridY: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  localDatumLevel: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  localGridSystem: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  localDatumSystem: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  localGridEasting: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  localGridNorthing: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  localElevation: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  latitudeEnd: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  longitudeEnd: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectionFormat: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  locationMethod: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  locationSubdivision: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phaseGrouping: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  alignmentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  offset: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  chainage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  transformDetails: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  associatedFileReference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nationalDatum: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  originalHoleId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  originalJobReference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  originatingCompany: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SampleWhereInputSchema: z.ZodType<Prisma.SampleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SampleWhereInputSchema),z.lazy(() => SampleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SampleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SampleWhereInputSchema),z.lazy(() => SampleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  depthTop: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  sampleReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleUniqueID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  depthBase: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  numBlowsRequired: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  sampleContainer: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  samplePreparation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleDiameter: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  samplingTechnique: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleMatrix: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleQAType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  samplerInitials: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reasonForSampling: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleRemarks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleCondition: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleClassification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  barometricPressure: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  sampleTemperature: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gasFlowRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  samplingDuration: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleRecordLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stratumReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  associatedFileReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  location: z.union([ z.lazy(() => LocationRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional(),
}).strict();

export const SampleOrderByWithRelationInputSchema: z.ZodType<Prisma.SampleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  depthTop: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleUniqueID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  depthBase: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateAndTimeSampleTaken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numBlowsRequired: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleContainer: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplePreparation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleDiameter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  depthToWaterBelowGroundSurface: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  percentageSampleRecovered: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplingTechnique: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleMatrix: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleQAType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplerInitials: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reasonForSampling: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleRemarks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateSampleDescribed: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  personResponsibleForDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleCondition: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleClassification: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  barometricPressure: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleTemperature: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gasPressureAboveBarometric: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gasFlowRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateAndTimeSamplingCompleted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplingDuration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  captionUsedToDescribeSample: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleRecordLink: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stratumReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  associatedFileReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lengthSampleRecovered: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional()
}).strict();

export const SampleWhereUniqueInputSchema: z.ZodType<Prisma.SampleWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const SampleOrderByWithAggregationInputSchema: z.ZodType<Prisma.SampleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  depthTop: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleUniqueID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  depthBase: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateAndTimeSampleTaken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numBlowsRequired: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleContainer: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplePreparation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleDiameter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  depthToWaterBelowGroundSurface: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  percentageSampleRecovered: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplingTechnique: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleMatrix: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleQAType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplerInitials: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reasonForSampling: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleRemarks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateSampleDescribed: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  personResponsibleForDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleCondition: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleClassification: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  barometricPressure: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleTemperature: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gasPressureAboveBarometric: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gasFlowRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateAndTimeSamplingCompleted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  samplingDuration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  captionUsedToDescribeSample: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sampleRecordLink: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stratumReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  associatedFileReference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lengthSampleRecovered: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SampleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SampleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SampleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SampleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SampleSumOrderByAggregateInputSchema).optional()
}).strict();

export const SampleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SampleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SampleScalarWhereWithAggregatesInputSchema),z.lazy(() => SampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SampleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SampleScalarWhereWithAggregatesInputSchema),z.lazy(() => SampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  depthTop: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  sampleReference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleUniqueID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  depthBase: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  numBlowsRequired: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  sampleContainer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  samplePreparation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleDiameter: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  samplingTechnique: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleMatrix: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleQAType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  samplerInitials: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  reasonForSampling: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleRemarks: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleCondition: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleClassification: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  barometricPressure: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  sampleTemperature: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  gasFlowRate: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  samplingDuration: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sampleRecordLink: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stratumReference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  associatedFileReference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ColumnDefinitionWhereInputSchema: z.ZodType<Prisma.ColumnDefinitionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnDefinitionWhereInputSchema),z.lazy(() => ColumnDefinitionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnDefinitionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnDefinitionWhereInputSchema),z.lazy(() => ColumnDefinitionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tableId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataType: z.union([ z.lazy(() => EnumDataTypeFilterSchema),z.lazy(() => DataTypeSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const ColumnDefinitionOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnDefinitionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  tableId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  dataType: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const ColumnDefinitionWhereUniqueInputSchema: z.ZodType<Prisma.ColumnDefinitionWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ColumnDefinitionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnDefinitionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  tableId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  dataType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnDefinitionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnDefinitionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnDefinitionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ColumnDefinitionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnDefinitionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnDefinitionScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnDefinitionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnDefinitionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnDefinitionScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnDefinitionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tableId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dataType: z.union([ z.lazy(() => EnumDataTypeWithAggregatesFilterSchema),z.lazy(() => DataTypeSchema) ]).optional(),
}).strict();

export const AgsUploadWhereInputSchema: z.ZodType<Prisma.AgsUploadWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgsUploadWhereInputSchema),z.lazy(() => AgsUploadWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgsUploadWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgsUploadWhereInputSchema),z.lazy(() => AgsUploadWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAgsUploadStatusFilterSchema),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  newRecordsCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  userProject: z.union([ z.lazy(() => UserProjectRelationFilterSchema),z.lazy(() => UserProjectWhereInputSchema) ]).optional(),
}).strict();

export const AgsUploadOrderByWithRelationInputSchema: z.ZodType<Prisma.AgsUploadOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  fileUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parsedRecordsUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  newRecordsCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedRecordsCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userProject: z.lazy(() => UserProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const AgsUploadWhereUniqueInputSchema: z.ZodType<Prisma.AgsUploadWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const AgsUploadOrderByWithAggregationInputSchema: z.ZodType<Prisma.AgsUploadOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  fileUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parsedRecordsUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  newRecordsCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedRecordsCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AgsUploadCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AgsUploadAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AgsUploadMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AgsUploadMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AgsUploadSumOrderByAggregateInputSchema).optional()
}).strict();

export const AgsUploadScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AgsUploadScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AgsUploadScalarWhereWithAggregatesInputSchema),z.lazy(() => AgsUploadScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgsUploadScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgsUploadScalarWhereWithAggregatesInputSchema),z.lazy(() => AgsUploadScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fileUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAgsUploadStatusWithAggregatesFilterSchema),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  newRecordsCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userProjects: z.lazy(() => UserProjectCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userProjects: z.lazy(() => UserProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userProjects: z.lazy(() => UserProjectUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userProjects: z.lazy(() => UserProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProjectCreateInputSchema: z.ZodType<Prisma.UserProjectCreateInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProjectsInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutUserProjectsInputSchema),
  agsUploads: z.lazy(() => AgsUploadCreateNestedManyWithoutUserProjectInputSchema).optional()
}).strict();

export const UserProjectUncheckedCreateInputSchema: z.ZodType<Prisma.UserProjectUncheckedCreateInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  projectId: z.string(),
  agsUploads: z.lazy(() => AgsUploadUncheckedCreateNestedManyWithoutUserProjectInputSchema).optional()
}).strict();

export const UserProjectUpdateInputSchema: z.ZodType<Prisma.UserProjectUpdateInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProjectsNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutUserProjectsNestedInputSchema).optional(),
  agsUploads: z.lazy(() => AgsUploadUpdateManyWithoutUserProjectNestedInputSchema).optional()
}).strict();

export const UserProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agsUploads: z.lazy(() => AgsUploadUncheckedUpdateManyWithoutUserProjectNestedInputSchema).optional()
}).strict();

export const UserProjectCreateManyInputSchema: z.ZodType<Prisma.UserProjectCreateManyInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  projectId: z.string()
}).strict();

export const UserProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProjectUpdateManyMutationInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateManyInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutProjectInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectCreateNestedManyWithoutProjectInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutProjectNestedInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectUpdateManyWithoutProjectNestedInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutLocationsInputSchema),
  samples: z.lazy(() => SampleCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  projectId: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable(),
  samples: z.lazy(() => SampleUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutLocationsNestedInputSchema).optional(),
  samples: z.lazy(() => SampleUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samples: z.lazy(() => SampleUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  projectId: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable()
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SampleCreateInputSchema: z.ZodType<Prisma.SampleCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  depthTop: z.number().optional().nullable(),
  sampleReference: z.string().optional().nullable(),
  sampleType: z.string().optional().nullable(),
  sampleUniqueID: z.string().optional().nullable(),
  depthBase: z.number().optional().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().optional().nullable(),
  numBlowsRequired: z.number().int().optional().nullable(),
  sampleContainer: z.string().optional().nullable(),
  samplePreparation: z.string().optional().nullable(),
  sampleDiameter: z.number().optional().nullable(),
  depthToWaterBelowGroundSurface: z.number().optional().nullable(),
  percentageSampleRecovered: z.number().optional().nullable(),
  samplingTechnique: z.string().optional().nullable(),
  sampleMatrix: z.string().optional().nullable(),
  sampleQAType: z.string().optional().nullable(),
  samplerInitials: z.string().optional().nullable(),
  reasonForSampling: z.string().optional().nullable(),
  sampleRemarks: z.string().optional().nullable(),
  sampleDescription: z.string().optional().nullable(),
  dateSampleDescribed: z.coerce.date().optional().nullable(),
  personResponsibleForDescription: z.string().optional().nullable(),
  sampleCondition: z.string().optional().nullable(),
  sampleClassification: z.string().optional().nullable(),
  barometricPressure: z.number().optional().nullable(),
  sampleTemperature: z.number().optional().nullable(),
  gasPressureAboveBarometric: z.number().optional().nullable(),
  gasFlowRate: z.number().optional().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().optional().nullable(),
  samplingDuration: z.string().optional().nullable(),
  captionUsedToDescribeSample: z.string().optional().nullable(),
  sampleRecordLink: z.string().optional().nullable(),
  stratumReference: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  lengthSampleRecovered: z.number().optional().nullable(),
  location: z.lazy(() => LocationCreateNestedOneWithoutSamplesInputSchema)
}).strict();

export const SampleUncheckedCreateInputSchema: z.ZodType<Prisma.SampleUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locationId: z.string(),
  depthTop: z.number().optional().nullable(),
  sampleReference: z.string().optional().nullable(),
  sampleType: z.string().optional().nullable(),
  sampleUniqueID: z.string().optional().nullable(),
  depthBase: z.number().optional().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().optional().nullable(),
  numBlowsRequired: z.number().int().optional().nullable(),
  sampleContainer: z.string().optional().nullable(),
  samplePreparation: z.string().optional().nullable(),
  sampleDiameter: z.number().optional().nullable(),
  depthToWaterBelowGroundSurface: z.number().optional().nullable(),
  percentageSampleRecovered: z.number().optional().nullable(),
  samplingTechnique: z.string().optional().nullable(),
  sampleMatrix: z.string().optional().nullable(),
  sampleQAType: z.string().optional().nullable(),
  samplerInitials: z.string().optional().nullable(),
  reasonForSampling: z.string().optional().nullable(),
  sampleRemarks: z.string().optional().nullable(),
  sampleDescription: z.string().optional().nullable(),
  dateSampleDescribed: z.coerce.date().optional().nullable(),
  personResponsibleForDescription: z.string().optional().nullable(),
  sampleCondition: z.string().optional().nullable(),
  sampleClassification: z.string().optional().nullable(),
  barometricPressure: z.number().optional().nullable(),
  sampleTemperature: z.number().optional().nullable(),
  gasPressureAboveBarometric: z.number().optional().nullable(),
  gasFlowRate: z.number().optional().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().optional().nullable(),
  samplingDuration: z.string().optional().nullable(),
  captionUsedToDescribeSample: z.string().optional().nullable(),
  sampleRecordLink: z.string().optional().nullable(),
  stratumReference: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  lengthSampleRecovered: z.number().optional().nullable()
}).strict();

export const SampleUpdateInputSchema: z.ZodType<Prisma.SampleUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.lazy(() => LocationUpdateOneRequiredWithoutSamplesNestedInputSchema).optional()
}).strict();

export const SampleUncheckedUpdateInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SampleCreateManyInputSchema: z.ZodType<Prisma.SampleCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locationId: z.string(),
  depthTop: z.number().optional().nullable(),
  sampleReference: z.string().optional().nullable(),
  sampleType: z.string().optional().nullable(),
  sampleUniqueID: z.string().optional().nullable(),
  depthBase: z.number().optional().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().optional().nullable(),
  numBlowsRequired: z.number().int().optional().nullable(),
  sampleContainer: z.string().optional().nullable(),
  samplePreparation: z.string().optional().nullable(),
  sampleDiameter: z.number().optional().nullable(),
  depthToWaterBelowGroundSurface: z.number().optional().nullable(),
  percentageSampleRecovered: z.number().optional().nullable(),
  samplingTechnique: z.string().optional().nullable(),
  sampleMatrix: z.string().optional().nullable(),
  sampleQAType: z.string().optional().nullable(),
  samplerInitials: z.string().optional().nullable(),
  reasonForSampling: z.string().optional().nullable(),
  sampleRemarks: z.string().optional().nullable(),
  sampleDescription: z.string().optional().nullable(),
  dateSampleDescribed: z.coerce.date().optional().nullable(),
  personResponsibleForDescription: z.string().optional().nullable(),
  sampleCondition: z.string().optional().nullable(),
  sampleClassification: z.string().optional().nullable(),
  barometricPressure: z.number().optional().nullable(),
  sampleTemperature: z.number().optional().nullable(),
  gasPressureAboveBarometric: z.number().optional().nullable(),
  gasFlowRate: z.number().optional().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().optional().nullable(),
  samplingDuration: z.string().optional().nullable(),
  captionUsedToDescribeSample: z.string().optional().nullable(),
  sampleRecordLink: z.string().optional().nullable(),
  stratumReference: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  lengthSampleRecovered: z.number().optional().nullable()
}).strict();

export const SampleUpdateManyMutationInputSchema: z.ZodType<Prisma.SampleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SampleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ColumnDefinitionCreateInputSchema: z.ZodType<Prisma.ColumnDefinitionCreateInput> = z.object({
  id: z.string().uuid().optional(),
  columnId: z.string(),
  tableId: z.string(),
  label: z.string(),
  dataType: z.lazy(() => DataTypeSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutColumnDefinitionsInputSchema)
}).strict();

export const ColumnDefinitionUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  columnId: z.string(),
  tableId: z.string(),
  projectId: z.string(),
  label: z.string(),
  dataType: z.lazy(() => DataTypeSchema)
}).strict();

export const ColumnDefinitionUpdateInputSchema: z.ZodType<Prisma.ColumnDefinitionUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutColumnDefinitionsNestedInputSchema).optional()
}).strict();

export const ColumnDefinitionUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnDefinitionCreateManyInputSchema: z.ZodType<Prisma.ColumnDefinitionCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  columnId: z.string(),
  tableId: z.string(),
  projectId: z.string(),
  label: z.string(),
  dataType: z.lazy(() => DataTypeSchema)
}).strict();

export const ColumnDefinitionUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnDefinitionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnDefinitionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgsUploadCreateInputSchema: z.ZodType<Prisma.AgsUploadCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fileUrl: z.string().optional().nullable(),
  parsedRecordsUrl: z.string().optional().nullable(),
  status: z.lazy(() => AgsUploadStatusSchema),
  newRecordsCount: z.number().int().optional().nullable(),
  updatedRecordsCount: z.number().int().optional().nullable(),
  userProject: z.lazy(() => UserProjectCreateNestedOneWithoutAgsUploadsInputSchema)
}).strict();

export const AgsUploadUncheckedCreateInputSchema: z.ZodType<Prisma.AgsUploadUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  projectId: z.string(),
  fileUrl: z.string().optional().nullable(),
  parsedRecordsUrl: z.string().optional().nullable(),
  status: z.lazy(() => AgsUploadStatusSchema),
  newRecordsCount: z.number().int().optional().nullable(),
  updatedRecordsCount: z.number().int().optional().nullable()
}).strict();

export const AgsUploadUpdateInputSchema: z.ZodType<Prisma.AgsUploadUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userProject: z.lazy(() => UserProjectUpdateOneRequiredWithoutAgsUploadsNestedInputSchema).optional()
}).strict();

export const AgsUploadUncheckedUpdateInputSchema: z.ZodType<Prisma.AgsUploadUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgsUploadCreateManyInputSchema: z.ZodType<Prisma.AgsUploadCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  projectId: z.string(),
  fileUrl: z.string().optional().nullable(),
  parsedRecordsUrl: z.string().optional().nullable(),
  status: z.lazy(() => AgsUploadStatusSchema),
  newRecordsCount: z.number().int().optional().nullable(),
  updatedRecordsCount: z.number().int().optional().nullable()
}).strict();

export const AgsUploadUpdateManyMutationInputSchema: z.ZodType<Prisma.AgsUploadUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgsUploadUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AgsUploadUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserProjectListRelationFilterSchema: z.ZodType<Prisma.UserProjectListRelationFilter> = z.object({
  every: z.lazy(() => UserProjectWhereInputSchema).optional(),
  some: z.lazy(() => UserProjectWhereInputSchema).optional(),
  none: z.lazy(() => UserProjectWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserProjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserProjectOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ProjectRelationFilterSchema: z.ZodType<Prisma.ProjectRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional().nullable()
}).strict();

export const AgsUploadListRelationFilterSchema: z.ZodType<Prisma.AgsUploadListRelationFilter> = z.object({
  every: z.lazy(() => AgsUploadWhereInputSchema).optional(),
  some: z.lazy(() => AgsUploadWhereInputSchema).optional(),
  none: z.lazy(() => AgsUploadWhereInputSchema).optional()
}).strict();

export const AgsUploadOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AgsUploadOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProjectUserIdProjectIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserProjectUserIdProjectIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  projectId: z.string()
}).strict();

export const UserProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProjectCountOrderByAggregateInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProjectMaxOrderByAggregateInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProjectMinOrderByAggregateInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const LocationListRelationFilterSchema: z.ZodType<Prisma.LocationListRelationFilter> = z.object({
  every: z.lazy(() => LocationWhereInputSchema).optional(),
  some: z.lazy(() => LocationWhereInputSchema).optional(),
  none: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const ColumnDefinitionListRelationFilterSchema: z.ZodType<Prisma.ColumnDefinitionListRelationFilter> = z.object({
  every: z.lazy(() => ColumnDefinitionWhereInputSchema).optional(),
  some: z.lazy(() => ColumnDefinitionWhereInputSchema).optional(),
  none: z.lazy(() => ColumnDefinitionWhereInputSchema).optional()
}).strict();

export const LocationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnDefinitionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ColumnDefinitionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SampleListRelationFilterSchema: z.ZodType<Prisma.SampleListRelationFilter> = z.object({
  every: z.lazy(() => SampleWhereInputSchema).optional(),
  some: z.lazy(() => SampleWhereInputSchema).optional(),
  none: z.lazy(() => SampleWhereInputSchema).optional()
}).strict();

export const SampleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SampleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  customColumns: z.lazy(() => SortOrderSchema).optional(),
  locationType: z.lazy(() => SortOrderSchema).optional(),
  locationStatus: z.lazy(() => SortOrderSchema).optional(),
  nationalEasting: z.lazy(() => SortOrderSchema).optional(),
  nationalNorthing: z.lazy(() => SortOrderSchema).optional(),
  gridReference: z.lazy(() => SortOrderSchema).optional(),
  groundLevel: z.lazy(() => SortOrderSchema).optional(),
  remarks: z.lazy(() => SortOrderSchema).optional(),
  finalDepth: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  purpose: z.lazy(() => SortOrderSchema).optional(),
  termination: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  gridReferenceLetter: z.lazy(() => SortOrderSchema).optional(),
  localGridX: z.lazy(() => SortOrderSchema).optional(),
  localGridY: z.lazy(() => SortOrderSchema).optional(),
  localDatumLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridSystem: z.lazy(() => SortOrderSchema).optional(),
  localDatumSystem: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseEasting: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseNorthing: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseGroundLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridEasting: z.lazy(() => SortOrderSchema).optional(),
  localGridNorthing: z.lazy(() => SortOrderSchema).optional(),
  localElevation: z.lazy(() => SortOrderSchema).optional(),
  latitudeEnd: z.lazy(() => SortOrderSchema).optional(),
  longitudeEnd: z.lazy(() => SortOrderSchema).optional(),
  projectionFormat: z.lazy(() => SortOrderSchema).optional(),
  locationMethod: z.lazy(() => SortOrderSchema).optional(),
  locationSubdivision: z.lazy(() => SortOrderSchema).optional(),
  phaseGrouping: z.lazy(() => SortOrderSchema).optional(),
  alignmentId: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional(),
  chainage: z.lazy(() => SortOrderSchema).optional(),
  transformDetails: z.lazy(() => SortOrderSchema).optional(),
  associatedFileReference: z.lazy(() => SortOrderSchema).optional(),
  nationalDatum: z.lazy(() => SortOrderSchema).optional(),
  originalHoleId: z.lazy(() => SortOrderSchema).optional(),
  originalJobReference: z.lazy(() => SortOrderSchema).optional(),
  originatingCompany: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  nationalEasting: z.lazy(() => SortOrderSchema).optional(),
  nationalNorthing: z.lazy(() => SortOrderSchema).optional(),
  groundLevel: z.lazy(() => SortOrderSchema).optional(),
  finalDepth: z.lazy(() => SortOrderSchema).optional(),
  localGridX: z.lazy(() => SortOrderSchema).optional(),
  localGridY: z.lazy(() => SortOrderSchema).optional(),
  localDatumLevel: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseEasting: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseNorthing: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseGroundLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridEasting: z.lazy(() => SortOrderSchema).optional(),
  localGridNorthing: z.lazy(() => SortOrderSchema).optional(),
  localElevation: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  locationType: z.lazy(() => SortOrderSchema).optional(),
  locationStatus: z.lazy(() => SortOrderSchema).optional(),
  nationalEasting: z.lazy(() => SortOrderSchema).optional(),
  nationalNorthing: z.lazy(() => SortOrderSchema).optional(),
  gridReference: z.lazy(() => SortOrderSchema).optional(),
  groundLevel: z.lazy(() => SortOrderSchema).optional(),
  remarks: z.lazy(() => SortOrderSchema).optional(),
  finalDepth: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  purpose: z.lazy(() => SortOrderSchema).optional(),
  termination: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  gridReferenceLetter: z.lazy(() => SortOrderSchema).optional(),
  localGridX: z.lazy(() => SortOrderSchema).optional(),
  localGridY: z.lazy(() => SortOrderSchema).optional(),
  localDatumLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridSystem: z.lazy(() => SortOrderSchema).optional(),
  localDatumSystem: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseEasting: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseNorthing: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseGroundLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridEasting: z.lazy(() => SortOrderSchema).optional(),
  localGridNorthing: z.lazy(() => SortOrderSchema).optional(),
  localElevation: z.lazy(() => SortOrderSchema).optional(),
  latitudeEnd: z.lazy(() => SortOrderSchema).optional(),
  longitudeEnd: z.lazy(() => SortOrderSchema).optional(),
  projectionFormat: z.lazy(() => SortOrderSchema).optional(),
  locationMethod: z.lazy(() => SortOrderSchema).optional(),
  locationSubdivision: z.lazy(() => SortOrderSchema).optional(),
  phaseGrouping: z.lazy(() => SortOrderSchema).optional(),
  alignmentId: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional(),
  chainage: z.lazy(() => SortOrderSchema).optional(),
  transformDetails: z.lazy(() => SortOrderSchema).optional(),
  associatedFileReference: z.lazy(() => SortOrderSchema).optional(),
  nationalDatum: z.lazy(() => SortOrderSchema).optional(),
  originalHoleId: z.lazy(() => SortOrderSchema).optional(),
  originalJobReference: z.lazy(() => SortOrderSchema).optional(),
  originatingCompany: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  locationType: z.lazy(() => SortOrderSchema).optional(),
  locationStatus: z.lazy(() => SortOrderSchema).optional(),
  nationalEasting: z.lazy(() => SortOrderSchema).optional(),
  nationalNorthing: z.lazy(() => SortOrderSchema).optional(),
  gridReference: z.lazy(() => SortOrderSchema).optional(),
  groundLevel: z.lazy(() => SortOrderSchema).optional(),
  remarks: z.lazy(() => SortOrderSchema).optional(),
  finalDepth: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  purpose: z.lazy(() => SortOrderSchema).optional(),
  termination: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  gridReferenceLetter: z.lazy(() => SortOrderSchema).optional(),
  localGridX: z.lazy(() => SortOrderSchema).optional(),
  localGridY: z.lazy(() => SortOrderSchema).optional(),
  localDatumLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridSystem: z.lazy(() => SortOrderSchema).optional(),
  localDatumSystem: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseEasting: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseNorthing: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseGroundLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridEasting: z.lazy(() => SortOrderSchema).optional(),
  localGridNorthing: z.lazy(() => SortOrderSchema).optional(),
  localElevation: z.lazy(() => SortOrderSchema).optional(),
  latitudeEnd: z.lazy(() => SortOrderSchema).optional(),
  longitudeEnd: z.lazy(() => SortOrderSchema).optional(),
  projectionFormat: z.lazy(() => SortOrderSchema).optional(),
  locationMethod: z.lazy(() => SortOrderSchema).optional(),
  locationSubdivision: z.lazy(() => SortOrderSchema).optional(),
  phaseGrouping: z.lazy(() => SortOrderSchema).optional(),
  alignmentId: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional(),
  chainage: z.lazy(() => SortOrderSchema).optional(),
  transformDetails: z.lazy(() => SortOrderSchema).optional(),
  associatedFileReference: z.lazy(() => SortOrderSchema).optional(),
  nationalDatum: z.lazy(() => SortOrderSchema).optional(),
  originalHoleId: z.lazy(() => SortOrderSchema).optional(),
  originalJobReference: z.lazy(() => SortOrderSchema).optional(),
  originatingCompany: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  nationalEasting: z.lazy(() => SortOrderSchema).optional(),
  nationalNorthing: z.lazy(() => SortOrderSchema).optional(),
  groundLevel: z.lazy(() => SortOrderSchema).optional(),
  finalDepth: z.lazy(() => SortOrderSchema).optional(),
  localGridX: z.lazy(() => SortOrderSchema).optional(),
  localGridY: z.lazy(() => SortOrderSchema).optional(),
  localDatumLevel: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseEasting: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseNorthing: z.lazy(() => SortOrderSchema).optional(),
  endOfTraverseGroundLevel: z.lazy(() => SortOrderSchema).optional(),
  localGridEasting: z.lazy(() => SortOrderSchema).optional(),
  localGridNorthing: z.lazy(() => SortOrderSchema).optional(),
  localElevation: z.lazy(() => SortOrderSchema).optional(),
  offset: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const LocationRelationFilterSchema: z.ZodType<Prisma.LocationRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable()
}).strict();

export const SampleCountOrderByAggregateInputSchema: z.ZodType<Prisma.SampleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  depthTop: z.lazy(() => SortOrderSchema).optional(),
  sampleReference: z.lazy(() => SortOrderSchema).optional(),
  sampleType: z.lazy(() => SortOrderSchema).optional(),
  sampleUniqueID: z.lazy(() => SortOrderSchema).optional(),
  depthBase: z.lazy(() => SortOrderSchema).optional(),
  dateAndTimeSampleTaken: z.lazy(() => SortOrderSchema).optional(),
  numBlowsRequired: z.lazy(() => SortOrderSchema).optional(),
  sampleContainer: z.lazy(() => SortOrderSchema).optional(),
  samplePreparation: z.lazy(() => SortOrderSchema).optional(),
  sampleDiameter: z.lazy(() => SortOrderSchema).optional(),
  depthToWaterBelowGroundSurface: z.lazy(() => SortOrderSchema).optional(),
  percentageSampleRecovered: z.lazy(() => SortOrderSchema).optional(),
  samplingTechnique: z.lazy(() => SortOrderSchema).optional(),
  sampleMatrix: z.lazy(() => SortOrderSchema).optional(),
  sampleQAType: z.lazy(() => SortOrderSchema).optional(),
  samplerInitials: z.lazy(() => SortOrderSchema).optional(),
  reasonForSampling: z.lazy(() => SortOrderSchema).optional(),
  sampleRemarks: z.lazy(() => SortOrderSchema).optional(),
  sampleDescription: z.lazy(() => SortOrderSchema).optional(),
  dateSampleDescribed: z.lazy(() => SortOrderSchema).optional(),
  personResponsibleForDescription: z.lazy(() => SortOrderSchema).optional(),
  sampleCondition: z.lazy(() => SortOrderSchema).optional(),
  sampleClassification: z.lazy(() => SortOrderSchema).optional(),
  barometricPressure: z.lazy(() => SortOrderSchema).optional(),
  sampleTemperature: z.lazy(() => SortOrderSchema).optional(),
  gasPressureAboveBarometric: z.lazy(() => SortOrderSchema).optional(),
  gasFlowRate: z.lazy(() => SortOrderSchema).optional(),
  dateAndTimeSamplingCompleted: z.lazy(() => SortOrderSchema).optional(),
  samplingDuration: z.lazy(() => SortOrderSchema).optional(),
  captionUsedToDescribeSample: z.lazy(() => SortOrderSchema).optional(),
  sampleRecordLink: z.lazy(() => SortOrderSchema).optional(),
  stratumReference: z.lazy(() => SortOrderSchema).optional(),
  associatedFileReference: z.lazy(() => SortOrderSchema).optional(),
  lengthSampleRecovered: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SampleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SampleAvgOrderByAggregateInput> = z.object({
  depthTop: z.lazy(() => SortOrderSchema).optional(),
  depthBase: z.lazy(() => SortOrderSchema).optional(),
  numBlowsRequired: z.lazy(() => SortOrderSchema).optional(),
  sampleDiameter: z.lazy(() => SortOrderSchema).optional(),
  depthToWaterBelowGroundSurface: z.lazy(() => SortOrderSchema).optional(),
  percentageSampleRecovered: z.lazy(() => SortOrderSchema).optional(),
  barometricPressure: z.lazy(() => SortOrderSchema).optional(),
  sampleTemperature: z.lazy(() => SortOrderSchema).optional(),
  gasPressureAboveBarometric: z.lazy(() => SortOrderSchema).optional(),
  gasFlowRate: z.lazy(() => SortOrderSchema).optional(),
  lengthSampleRecovered: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SampleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SampleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  depthTop: z.lazy(() => SortOrderSchema).optional(),
  sampleReference: z.lazy(() => SortOrderSchema).optional(),
  sampleType: z.lazy(() => SortOrderSchema).optional(),
  sampleUniqueID: z.lazy(() => SortOrderSchema).optional(),
  depthBase: z.lazy(() => SortOrderSchema).optional(),
  dateAndTimeSampleTaken: z.lazy(() => SortOrderSchema).optional(),
  numBlowsRequired: z.lazy(() => SortOrderSchema).optional(),
  sampleContainer: z.lazy(() => SortOrderSchema).optional(),
  samplePreparation: z.lazy(() => SortOrderSchema).optional(),
  sampleDiameter: z.lazy(() => SortOrderSchema).optional(),
  depthToWaterBelowGroundSurface: z.lazy(() => SortOrderSchema).optional(),
  percentageSampleRecovered: z.lazy(() => SortOrderSchema).optional(),
  samplingTechnique: z.lazy(() => SortOrderSchema).optional(),
  sampleMatrix: z.lazy(() => SortOrderSchema).optional(),
  sampleQAType: z.lazy(() => SortOrderSchema).optional(),
  samplerInitials: z.lazy(() => SortOrderSchema).optional(),
  reasonForSampling: z.lazy(() => SortOrderSchema).optional(),
  sampleRemarks: z.lazy(() => SortOrderSchema).optional(),
  sampleDescription: z.lazy(() => SortOrderSchema).optional(),
  dateSampleDescribed: z.lazy(() => SortOrderSchema).optional(),
  personResponsibleForDescription: z.lazy(() => SortOrderSchema).optional(),
  sampleCondition: z.lazy(() => SortOrderSchema).optional(),
  sampleClassification: z.lazy(() => SortOrderSchema).optional(),
  barometricPressure: z.lazy(() => SortOrderSchema).optional(),
  sampleTemperature: z.lazy(() => SortOrderSchema).optional(),
  gasPressureAboveBarometric: z.lazy(() => SortOrderSchema).optional(),
  gasFlowRate: z.lazy(() => SortOrderSchema).optional(),
  dateAndTimeSamplingCompleted: z.lazy(() => SortOrderSchema).optional(),
  samplingDuration: z.lazy(() => SortOrderSchema).optional(),
  captionUsedToDescribeSample: z.lazy(() => SortOrderSchema).optional(),
  sampleRecordLink: z.lazy(() => SortOrderSchema).optional(),
  stratumReference: z.lazy(() => SortOrderSchema).optional(),
  associatedFileReference: z.lazy(() => SortOrderSchema).optional(),
  lengthSampleRecovered: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SampleMinOrderByAggregateInputSchema: z.ZodType<Prisma.SampleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  depthTop: z.lazy(() => SortOrderSchema).optional(),
  sampleReference: z.lazy(() => SortOrderSchema).optional(),
  sampleType: z.lazy(() => SortOrderSchema).optional(),
  sampleUniqueID: z.lazy(() => SortOrderSchema).optional(),
  depthBase: z.lazy(() => SortOrderSchema).optional(),
  dateAndTimeSampleTaken: z.lazy(() => SortOrderSchema).optional(),
  numBlowsRequired: z.lazy(() => SortOrderSchema).optional(),
  sampleContainer: z.lazy(() => SortOrderSchema).optional(),
  samplePreparation: z.lazy(() => SortOrderSchema).optional(),
  sampleDiameter: z.lazy(() => SortOrderSchema).optional(),
  depthToWaterBelowGroundSurface: z.lazy(() => SortOrderSchema).optional(),
  percentageSampleRecovered: z.lazy(() => SortOrderSchema).optional(),
  samplingTechnique: z.lazy(() => SortOrderSchema).optional(),
  sampleMatrix: z.lazy(() => SortOrderSchema).optional(),
  sampleQAType: z.lazy(() => SortOrderSchema).optional(),
  samplerInitials: z.lazy(() => SortOrderSchema).optional(),
  reasonForSampling: z.lazy(() => SortOrderSchema).optional(),
  sampleRemarks: z.lazy(() => SortOrderSchema).optional(),
  sampleDescription: z.lazy(() => SortOrderSchema).optional(),
  dateSampleDescribed: z.lazy(() => SortOrderSchema).optional(),
  personResponsibleForDescription: z.lazy(() => SortOrderSchema).optional(),
  sampleCondition: z.lazy(() => SortOrderSchema).optional(),
  sampleClassification: z.lazy(() => SortOrderSchema).optional(),
  barometricPressure: z.lazy(() => SortOrderSchema).optional(),
  sampleTemperature: z.lazy(() => SortOrderSchema).optional(),
  gasPressureAboveBarometric: z.lazy(() => SortOrderSchema).optional(),
  gasFlowRate: z.lazy(() => SortOrderSchema).optional(),
  dateAndTimeSamplingCompleted: z.lazy(() => SortOrderSchema).optional(),
  samplingDuration: z.lazy(() => SortOrderSchema).optional(),
  captionUsedToDescribeSample: z.lazy(() => SortOrderSchema).optional(),
  sampleRecordLink: z.lazy(() => SortOrderSchema).optional(),
  stratumReference: z.lazy(() => SortOrderSchema).optional(),
  associatedFileReference: z.lazy(() => SortOrderSchema).optional(),
  lengthSampleRecovered: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SampleSumOrderByAggregateInputSchema: z.ZodType<Prisma.SampleSumOrderByAggregateInput> = z.object({
  depthTop: z.lazy(() => SortOrderSchema).optional(),
  depthBase: z.lazy(() => SortOrderSchema).optional(),
  numBlowsRequired: z.lazy(() => SortOrderSchema).optional(),
  sampleDiameter: z.lazy(() => SortOrderSchema).optional(),
  depthToWaterBelowGroundSurface: z.lazy(() => SortOrderSchema).optional(),
  percentageSampleRecovered: z.lazy(() => SortOrderSchema).optional(),
  barometricPressure: z.lazy(() => SortOrderSchema).optional(),
  sampleTemperature: z.lazy(() => SortOrderSchema).optional(),
  gasPressureAboveBarometric: z.lazy(() => SortOrderSchema).optional(),
  gasFlowRate: z.lazy(() => SortOrderSchema).optional(),
  lengthSampleRecovered: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumDataTypeFilterSchema: z.ZodType<Prisma.EnumDataTypeFilter> = z.object({
  equals: z.lazy(() => DataTypeSchema).optional(),
  in: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => NestedEnumDataTypeFilterSchema) ]).optional(),
}).strict();

export const ColumnDefinitionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnDefinitionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  tableId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  dataType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnDefinitionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnDefinitionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  tableId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  dataType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnDefinitionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnDefinitionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  tableId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  dataType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDataTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDataTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DataTypeSchema).optional(),
  in: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => NestedEnumDataTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDataTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDataTypeFilterSchema).optional()
}).strict();

export const EnumAgsUploadStatusFilterSchema: z.ZodType<Prisma.EnumAgsUploadStatusFilter> = z.object({
  equals: z.lazy(() => AgsUploadStatusSchema).optional(),
  in: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => NestedEnumAgsUploadStatusFilterSchema) ]).optional(),
}).strict();

export const UserProjectRelationFilterSchema: z.ZodType<Prisma.UserProjectRelationFilter> = z.object({
  is: z.lazy(() => UserProjectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserProjectWhereInputSchema).optional().nullable()
}).strict();

export const AgsUploadCountOrderByAggregateInputSchema: z.ZodType<Prisma.AgsUploadCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  fileUrl: z.lazy(() => SortOrderSchema).optional(),
  parsedRecordsUrl: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  newRecordsCount: z.lazy(() => SortOrderSchema).optional(),
  updatedRecordsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgsUploadAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AgsUploadAvgOrderByAggregateInput> = z.object({
  newRecordsCount: z.lazy(() => SortOrderSchema).optional(),
  updatedRecordsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgsUploadMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AgsUploadMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  fileUrl: z.lazy(() => SortOrderSchema).optional(),
  parsedRecordsUrl: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  newRecordsCount: z.lazy(() => SortOrderSchema).optional(),
  updatedRecordsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgsUploadMinOrderByAggregateInputSchema: z.ZodType<Prisma.AgsUploadMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  fileUrl: z.lazy(() => SortOrderSchema).optional(),
  parsedRecordsUrl: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  newRecordsCount: z.lazy(() => SortOrderSchema).optional(),
  updatedRecordsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgsUploadSumOrderByAggregateInputSchema: z.ZodType<Prisma.AgsUploadSumOrderByAggregateInput> = z.object({
  newRecordsCount: z.lazy(() => SortOrderSchema).optional(),
  updatedRecordsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAgsUploadStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAgsUploadStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AgsUploadStatusSchema).optional(),
  in: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => NestedEnumAgsUploadStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAgsUploadStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAgsUploadStatusFilterSchema).optional()
}).strict();

export const UserProjectCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProjectCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutUserInputSchema),z.lazy(() => UserProjectCreateWithoutUserInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProjectUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutUserInputSchema),z.lazy(() => UserProjectCreateWithoutUserInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserProjectUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProjectUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutUserInputSchema),z.lazy(() => UserProjectCreateWithoutUserInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProjectScalarWhereInputSchema),z.lazy(() => UserProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProjectUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutUserInputSchema),z.lazy(() => UserProjectCreateWithoutUserInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProjectScalarWhereInputSchema),z.lazy(() => UserProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserProjectsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProjectCreateNestedOneWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutUserProjectsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserProjectsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutUserProjectsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const AgsUploadCreateNestedManyWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadCreateNestedManyWithoutUserProjectInput> = z.object({
  create: z.union([ z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema).array(),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgsUploadCreateManyUserProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgsUploadUncheckedCreateNestedManyWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUncheckedCreateNestedManyWithoutUserProjectInput> = z.object({
  create: z.union([ z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema).array(),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgsUploadCreateManyUserProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUserProjectsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProjectsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutUserProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProjectsInputSchema) ]).optional(),
}).strict();

export const ProjectUpdateOneRequiredWithoutUserProjectsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutUserProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserProjectsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutUserProjectsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutUserProjectsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutUserProjectsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserProjectsInputSchema) ]).optional(),
}).strict();

export const AgsUploadUpdateManyWithoutUserProjectNestedInputSchema: z.ZodType<Prisma.AgsUploadUpdateManyWithoutUserProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema).array(),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgsUploadUpsertWithWhereUniqueWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUpsertWithWhereUniqueWithoutUserProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgsUploadCreateManyUserProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgsUploadUpdateWithWhereUniqueWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUpdateWithWhereUniqueWithoutUserProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgsUploadUpdateManyWithWhereWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUpdateManyWithWhereWithoutUserProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgsUploadScalarWhereInputSchema),z.lazy(() => AgsUploadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgsUploadUncheckedUpdateManyWithoutUserProjectNestedInputSchema: z.ZodType<Prisma.AgsUploadUncheckedUpdateManyWithoutUserProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema).array(),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema),z.lazy(() => AgsUploadCreateOrConnectWithoutUserProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgsUploadUpsertWithWhereUniqueWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUpsertWithWhereUniqueWithoutUserProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgsUploadCreateManyUserProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgsUploadWhereUniqueInputSchema),z.lazy(() => AgsUploadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgsUploadUpdateWithWhereUniqueWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUpdateWithWhereUniqueWithoutUserProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgsUploadUpdateManyWithWhereWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUpdateManyWithWhereWithoutUserProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgsUploadScalarWhereInputSchema),z.lazy(() => AgsUploadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.LocationCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutProjectInputSchema),z.lazy(() => LocationCreateWithoutProjectInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema),z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProjectCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutProjectInputSchema),z.lazy(() => UserProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnDefinitionCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema).array(),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnDefinitionCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutProjectInputSchema),z.lazy(() => LocationCreateWithoutProjectInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema),z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProjectUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutProjectInputSchema),z.lazy(() => UserProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnDefinitionUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema).array(),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnDefinitionCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.LocationUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutProjectInputSchema),z.lazy(() => LocationCreateWithoutProjectInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema),z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProjectUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.UserProjectUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutProjectInputSchema),z.lazy(() => UserProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProjectUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => UserProjectUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProjectScalarWhereInputSchema),z.lazy(() => UserProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnDefinitionUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ColumnDefinitionUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema).array(),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnDefinitionUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnDefinitionCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnDefinitionUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnDefinitionUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnDefinitionScalarWhereInputSchema),z.lazy(() => ColumnDefinitionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutProjectInputSchema),z.lazy(() => LocationCreateWithoutProjectInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema),z.lazy(() => LocationCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProjectUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutProjectInputSchema),z.lazy(() => UserProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => UserProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => UserProjectUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProjectCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProjectWhereUniqueInputSchema),z.lazy(() => UserProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => UserProjectUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProjectUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => UserProjectUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProjectScalarWhereInputSchema),z.lazy(() => UserProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnDefinitionUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema).array(),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnDefinitionUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnDefinitionCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),z.lazy(() => ColumnDefinitionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnDefinitionUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnDefinitionUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnDefinitionScalarWhereInputSchema),z.lazy(() => ColumnDefinitionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutLocationsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutLocationsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const SampleCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.SampleCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => SampleCreateWithoutLocationInputSchema),z.lazy(() => SampleCreateWithoutLocationInputSchema).array(),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema),z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SampleCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SampleUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.SampleUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => SampleCreateWithoutLocationInputSchema),z.lazy(() => SampleCreateWithoutLocationInputSchema).array(),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema),z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SampleCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const ProjectUpdateOneRequiredWithoutLocationsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutLocationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutLocationsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutLocationsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutLocationsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutLocationsInputSchema) ]).optional(),
}).strict();

export const SampleUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.SampleUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => SampleCreateWithoutLocationInputSchema),z.lazy(() => SampleCreateWithoutLocationInputSchema).array(),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema),z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SampleUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => SampleUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SampleCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SampleUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => SampleUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SampleUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => SampleUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SampleScalarWhereInputSchema),z.lazy(() => SampleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SampleUncheckedUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => SampleCreateWithoutLocationInputSchema),z.lazy(() => SampleCreateWithoutLocationInputSchema).array(),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema),z.lazy(() => SampleCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SampleUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => SampleUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SampleCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SampleWhereUniqueInputSchema),z.lazy(() => SampleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SampleUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => SampleUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SampleUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => SampleUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SampleScalarWhereInputSchema),z.lazy(() => SampleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationCreateNestedOneWithoutSamplesInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutSamplesInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutSamplesInputSchema),z.lazy(() => LocationUncheckedCreateWithoutSamplesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutSamplesInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const LocationUpdateOneRequiredWithoutSamplesNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneRequiredWithoutSamplesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutSamplesInputSchema),z.lazy(() => LocationUncheckedCreateWithoutSamplesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutSamplesInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutSamplesInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithoutSamplesInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutSamplesInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutColumnDefinitionsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutColumnDefinitionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutColumnDefinitionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutColumnDefinitionsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumDataTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDataTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DataTypeSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutColumnDefinitionsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutColumnDefinitionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutColumnDefinitionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutColumnDefinitionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutColumnDefinitionsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutColumnDefinitionsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutColumnDefinitionsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutColumnDefinitionsInputSchema) ]).optional(),
}).strict();

export const UserProjectCreateNestedOneWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectCreateNestedOneWithoutAgsUploadsInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutAgsUploadsInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutAgsUploadsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProjectCreateOrConnectWithoutAgsUploadsInputSchema).optional(),
  connect: z.lazy(() => UserProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumAgsUploadStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAgsUploadStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AgsUploadStatusSchema).optional()
}).strict();

export const UserProjectUpdateOneRequiredWithoutAgsUploadsNestedInputSchema: z.ZodType<Prisma.UserProjectUpdateOneRequiredWithoutAgsUploadsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProjectCreateWithoutAgsUploadsInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutAgsUploadsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProjectCreateOrConnectWithoutAgsUploadsInputSchema).optional(),
  upsert: z.lazy(() => UserProjectUpsertWithoutAgsUploadsInputSchema).optional(),
  connect: z.lazy(() => UserProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProjectUpdateWithoutAgsUploadsInputSchema),z.lazy(() => UserProjectUncheckedUpdateWithoutAgsUploadsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => RoleSchema).array(),z.lazy(() => RoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedEnumDataTypeFilterSchema: z.ZodType<Prisma.NestedEnumDataTypeFilter> = z.object({
  equals: z.lazy(() => DataTypeSchema).optional(),
  in: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => NestedEnumDataTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDataTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDataTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DataTypeSchema).optional(),
  in: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => DataTypeSchema).array(),z.lazy(() => DataTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => NestedEnumDataTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDataTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDataTypeFilterSchema).optional()
}).strict();

export const NestedEnumAgsUploadStatusFilterSchema: z.ZodType<Prisma.NestedEnumAgsUploadStatusFilter> = z.object({
  equals: z.lazy(() => AgsUploadStatusSchema).optional(),
  in: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => NestedEnumAgsUploadStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAgsUploadStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAgsUploadStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AgsUploadStatusSchema).optional(),
  in: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AgsUploadStatusSchema).array(),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => NestedEnumAgsUploadStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAgsUploadStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAgsUploadStatusFilterSchema).optional()
}).strict();

export const UserProjectCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProjectCreateWithoutUserInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutUserProjectsInputSchema),
  agsUploads: z.lazy(() => AgsUploadCreateNestedManyWithoutUserProjectInputSchema).optional()
}).strict();

export const UserProjectUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUncheckedCreateWithoutUserInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  projectId: z.string(),
  agsUploads: z.lazy(() => AgsUploadUncheckedCreateNestedManyWithoutUserProjectInputSchema).optional()
}).strict();

export const UserProjectCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProjectCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProjectCreateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProjectCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserProjectCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProjectCreateManyUserInputSchema),z.lazy(() => UserProjectCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserProjectUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProjectUpdateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserProjectCreateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProjectUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProjectUpdateWithoutUserInputSchema),z.lazy(() => UserProjectUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserProjectUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProjectUpdateManyMutationInputSchema),z.lazy(() => UserProjectUncheckedUpdateManyWithoutUserProjectsInputSchema) ]),
}).strict();

export const UserProjectScalarWhereInputSchema: z.ZodType<Prisma.UserProjectScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProjectScalarWhereInputSchema),z.lazy(() => UserProjectScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProjectScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProjectScalarWhereInputSchema),z.lazy(() => UserProjectScalarWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserCreateWithoutUserProjectsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserProjectsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserProjectsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProjectsInputSchema) ]),
}).strict();

export const ProjectCreateWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutUserProjectsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutProjectInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutUserProjectsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutUserProjectsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserProjectsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserProjectsInputSchema) ]),
}).strict();

export const AgsUploadCreateWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadCreateWithoutUserProjectInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fileUrl: z.string().optional().nullable(),
  parsedRecordsUrl: z.string().optional().nullable(),
  status: z.lazy(() => AgsUploadStatusSchema),
  newRecordsCount: z.number().int().optional().nullable(),
  updatedRecordsCount: z.number().int().optional().nullable()
}).strict();

export const AgsUploadUncheckedCreateWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUncheckedCreateWithoutUserProjectInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fileUrl: z.string().optional().nullable(),
  parsedRecordsUrl: z.string().optional().nullable(),
  status: z.lazy(() => AgsUploadStatusSchema),
  newRecordsCount: z.number().int().optional().nullable(),
  updatedRecordsCount: z.number().int().optional().nullable()
}).strict();

export const AgsUploadCreateOrConnectWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadCreateOrConnectWithoutUserProjectInput> = z.object({
  where: z.lazy(() => AgsUploadWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema) ]),
}).strict();

export const AgsUploadCreateManyUserProjectInputEnvelopeSchema: z.ZodType<Prisma.AgsUploadCreateManyUserProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AgsUploadCreateManyUserProjectInputSchema),z.lazy(() => AgsUploadCreateManyUserProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserProjectsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProjectsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserProjectsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserProjectsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUpsertWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutUserProjectsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutUserProjectsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserProjectsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserProjectsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutUserProjectsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutProjectNestedInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutUserProjectsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutUserProjectsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const AgsUploadUpsertWithWhereUniqueWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUpsertWithWhereUniqueWithoutUserProjectInput> = z.object({
  where: z.lazy(() => AgsUploadWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AgsUploadUpdateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedUpdateWithoutUserProjectInputSchema) ]),
  create: z.union([ z.lazy(() => AgsUploadCreateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedCreateWithoutUserProjectInputSchema) ]),
}).strict();

export const AgsUploadUpdateWithWhereUniqueWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUpdateWithWhereUniqueWithoutUserProjectInput> = z.object({
  where: z.lazy(() => AgsUploadWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AgsUploadUpdateWithoutUserProjectInputSchema),z.lazy(() => AgsUploadUncheckedUpdateWithoutUserProjectInputSchema) ]),
}).strict();

export const AgsUploadUpdateManyWithWhereWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUpdateManyWithWhereWithoutUserProjectInput> = z.object({
  where: z.lazy(() => AgsUploadScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AgsUploadUpdateManyMutationInputSchema),z.lazy(() => AgsUploadUncheckedUpdateManyWithoutAgsUploadsInputSchema) ]),
}).strict();

export const AgsUploadScalarWhereInputSchema: z.ZodType<Prisma.AgsUploadScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgsUploadScalarWhereInputSchema),z.lazy(() => AgsUploadScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgsUploadScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgsUploadScalarWhereInputSchema),z.lazy(() => AgsUploadScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAgsUploadStatusFilterSchema),z.lazy(() => AgsUploadStatusSchema) ]).optional(),
  newRecordsCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const LocationCreateWithoutProjectInputSchema: z.ZodType<Prisma.LocationCreateWithoutProjectInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable(),
  samples: z.lazy(() => SampleCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable(),
  samples: z.lazy(() => SampleUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const LocationCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyProjectInputSchema),z.lazy(() => LocationCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserProjectCreateWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectCreateWithoutProjectInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProjectsInputSchema),
  agsUploads: z.lazy(() => AgsUploadCreateNestedManyWithoutUserProjectInputSchema).optional()
}).strict();

export const UserProjectUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUncheckedCreateWithoutProjectInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  agsUploads: z.lazy(() => AgsUploadUncheckedCreateNestedManyWithoutUserProjectInputSchema).optional()
}).strict();

export const UserProjectCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProjectCreateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const UserProjectCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.UserProjectCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProjectCreateManyProjectInputSchema),z.lazy(() => UserProjectCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ColumnDefinitionCreateWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionCreateWithoutProjectInput> = z.object({
  id: z.string().uuid().optional(),
  columnId: z.string(),
  tableId: z.string(),
  label: z.string(),
  dataType: z.lazy(() => DataTypeSchema)
}).strict();

export const ColumnDefinitionUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().uuid().optional(),
  columnId: z.string(),
  tableId: z.string(),
  label: z.string(),
  dataType: z.lazy(() => DataTypeSchema)
}).strict();

export const ColumnDefinitionCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ColumnDefinitionCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ColumnDefinitionCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ColumnDefinitionCreateManyProjectInputSchema),z.lazy(() => ColumnDefinitionCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationUpdateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const LocationUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateWithoutProjectInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const LocationUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => LocationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateManyMutationInputSchema),z.lazy(() => LocationUncheckedUpdateManyWithoutLocationsInputSchema) ]),
}).strict();

export const LocationScalarWhereInputSchema: z.ZodType<Prisma.LocationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  customColumns: z.lazy(() => JsonNullableFilterSchema).optional(),
  locationType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  locationStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nationalEasting: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  nationalNorthing: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gridReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  groundLevel: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  remarks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalDepth: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  purpose: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  termination: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  localGridX: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridY: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localDatumLevel: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridSystem: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  localDatumSystem: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridEasting: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localGridNorthing: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  localElevation: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  latitudeEnd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  longitudeEnd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectionFormat: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  locationMethod: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  locationSubdivision: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phaseGrouping: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alignmentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  offset: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  chainage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  transformDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  associatedFileReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nationalDatum: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  originalHoleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  originalJobReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  originatingCompany: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserProjectUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProjectUpdateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => UserProjectCreateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const UserProjectUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProjectUpdateWithoutProjectInputSchema),z.lazy(() => UserProjectUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const UserProjectUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => UserProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProjectUpdateManyMutationInputSchema),z.lazy(() => UserProjectUncheckedUpdateManyWithoutUserProjectsInputSchema) ]),
}).strict();

export const ColumnDefinitionUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ColumnDefinitionUpdateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnDefinitionCreateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ColumnDefinitionUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ColumnDefinitionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ColumnDefinitionUpdateWithoutProjectInputSchema),z.lazy(() => ColumnDefinitionUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ColumnDefinitionUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ColumnDefinitionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ColumnDefinitionUpdateManyMutationInputSchema),z.lazy(() => ColumnDefinitionUncheckedUpdateManyWithoutColumnDefinitionsInputSchema) ]),
}).strict();

export const ColumnDefinitionScalarWhereInputSchema: z.ZodType<Prisma.ColumnDefinitionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnDefinitionScalarWhereInputSchema),z.lazy(() => ColumnDefinitionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnDefinitionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnDefinitionScalarWhereInputSchema),z.lazy(() => ColumnDefinitionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tableId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataType: z.union([ z.lazy(() => EnumDataTypeFilterSchema),z.lazy(() => DataTypeSchema) ]).optional(),
}).strict();

export const ProjectCreateWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutLocationsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userProjects: z.lazy(() => UserProjectCreateNestedManyWithoutProjectInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutLocationsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userProjects: z.lazy(() => UserProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutLocationsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutLocationsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutLocationsInputSchema) ]),
}).strict();

export const SampleCreateWithoutLocationInputSchema: z.ZodType<Prisma.SampleCreateWithoutLocationInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  depthTop: z.number().optional().nullable(),
  sampleReference: z.string().optional().nullable(),
  sampleType: z.string().optional().nullable(),
  sampleUniqueID: z.string().optional().nullable(),
  depthBase: z.number().optional().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().optional().nullable(),
  numBlowsRequired: z.number().int().optional().nullable(),
  sampleContainer: z.string().optional().nullable(),
  samplePreparation: z.string().optional().nullable(),
  sampleDiameter: z.number().optional().nullable(),
  depthToWaterBelowGroundSurface: z.number().optional().nullable(),
  percentageSampleRecovered: z.number().optional().nullable(),
  samplingTechnique: z.string().optional().nullable(),
  sampleMatrix: z.string().optional().nullable(),
  sampleQAType: z.string().optional().nullable(),
  samplerInitials: z.string().optional().nullable(),
  reasonForSampling: z.string().optional().nullable(),
  sampleRemarks: z.string().optional().nullable(),
  sampleDescription: z.string().optional().nullable(),
  dateSampleDescribed: z.coerce.date().optional().nullable(),
  personResponsibleForDescription: z.string().optional().nullable(),
  sampleCondition: z.string().optional().nullable(),
  sampleClassification: z.string().optional().nullable(),
  barometricPressure: z.number().optional().nullable(),
  sampleTemperature: z.number().optional().nullable(),
  gasPressureAboveBarometric: z.number().optional().nullable(),
  gasFlowRate: z.number().optional().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().optional().nullable(),
  samplingDuration: z.string().optional().nullable(),
  captionUsedToDescribeSample: z.string().optional().nullable(),
  sampleRecordLink: z.string().optional().nullable(),
  stratumReference: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  lengthSampleRecovered: z.number().optional().nullable()
}).strict();

export const SampleUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.SampleUncheckedCreateWithoutLocationInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  depthTop: z.number().optional().nullable(),
  sampleReference: z.string().optional().nullable(),
  sampleType: z.string().optional().nullable(),
  sampleUniqueID: z.string().optional().nullable(),
  depthBase: z.number().optional().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().optional().nullable(),
  numBlowsRequired: z.number().int().optional().nullable(),
  sampleContainer: z.string().optional().nullable(),
  samplePreparation: z.string().optional().nullable(),
  sampleDiameter: z.number().optional().nullable(),
  depthToWaterBelowGroundSurface: z.number().optional().nullable(),
  percentageSampleRecovered: z.number().optional().nullable(),
  samplingTechnique: z.string().optional().nullable(),
  sampleMatrix: z.string().optional().nullable(),
  sampleQAType: z.string().optional().nullable(),
  samplerInitials: z.string().optional().nullable(),
  reasonForSampling: z.string().optional().nullable(),
  sampleRemarks: z.string().optional().nullable(),
  sampleDescription: z.string().optional().nullable(),
  dateSampleDescribed: z.coerce.date().optional().nullable(),
  personResponsibleForDescription: z.string().optional().nullable(),
  sampleCondition: z.string().optional().nullable(),
  sampleClassification: z.string().optional().nullable(),
  barometricPressure: z.number().optional().nullable(),
  sampleTemperature: z.number().optional().nullable(),
  gasPressureAboveBarometric: z.number().optional().nullable(),
  gasFlowRate: z.number().optional().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().optional().nullable(),
  samplingDuration: z.string().optional().nullable(),
  captionUsedToDescribeSample: z.string().optional().nullable(),
  sampleRecordLink: z.string().optional().nullable(),
  stratumReference: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  lengthSampleRecovered: z.number().optional().nullable()
}).strict();

export const SampleCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.SampleCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => SampleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SampleCreateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const SampleCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.SampleCreateManyLocationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SampleCreateManyLocationInputSchema),z.lazy(() => SampleCreateManyLocationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectUpsertWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutLocationsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutLocationsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutLocationsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutLocationsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutLocationsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userProjects: z.lazy(() => UserProjectUpdateManyWithoutProjectNestedInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userProjects: z.lazy(() => UserProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  columnDefinitions: z.lazy(() => ColumnDefinitionUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const SampleUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.SampleUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => SampleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SampleUpdateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => SampleCreateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const SampleUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.SampleUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => SampleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SampleUpdateWithoutLocationInputSchema),z.lazy(() => SampleUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const SampleUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.SampleUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => SampleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SampleUpdateManyMutationInputSchema),z.lazy(() => SampleUncheckedUpdateManyWithoutSamplesInputSchema) ]),
}).strict();

export const SampleScalarWhereInputSchema: z.ZodType<Prisma.SampleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SampleScalarWhereInputSchema),z.lazy(() => SampleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SampleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SampleScalarWhereInputSchema),z.lazy(() => SampleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  depthTop: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  sampleReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleUniqueID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  depthBase: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  numBlowsRequired: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  sampleContainer: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  samplePreparation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleDiameter: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  samplingTechnique: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleMatrix: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleQAType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  samplerInitials: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reasonForSampling: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleRemarks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleCondition: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleClassification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  barometricPressure: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  sampleTemperature: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gasFlowRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  samplingDuration: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sampleRecordLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stratumReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  associatedFileReference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const LocationCreateWithoutSamplesInputSchema: z.ZodType<Prisma.LocationCreateWithoutSamplesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutLocationsInputSchema)
}).strict();

export const LocationUncheckedCreateWithoutSamplesInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutSamplesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  projectId: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable()
}).strict();

export const LocationCreateOrConnectWithoutSamplesInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutSamplesInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutSamplesInputSchema),z.lazy(() => LocationUncheckedCreateWithoutSamplesInputSchema) ]),
}).strict();

export const LocationUpsertWithoutSamplesInputSchema: z.ZodType<Prisma.LocationUpsertWithoutSamplesInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutSamplesInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutSamplesInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutSamplesInputSchema),z.lazy(() => LocationUncheckedCreateWithoutSamplesInputSchema) ]),
}).strict();

export const LocationUpdateWithoutSamplesInputSchema: z.ZodType<Prisma.LocationUpdateWithoutSamplesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutLocationsNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutSamplesInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutSamplesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectCreateWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutColumnDefinitionsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutProjectInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutColumnDefinitionsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutColumnDefinitionsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutColumnDefinitionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutColumnDefinitionsInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutColumnDefinitionsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutColumnDefinitionsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutColumnDefinitionsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutColumnDefinitionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutColumnDefinitionsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutColumnDefinitionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutProjectNestedInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutColumnDefinitionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  userProjects: z.lazy(() => UserProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const UserProjectCreateWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectCreateWithoutAgsUploadsInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProjectsInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutUserProjectsInputSchema)
}).strict();

export const UserProjectUncheckedCreateWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectUncheckedCreateWithoutAgsUploadsInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  projectId: z.string()
}).strict();

export const UserProjectCreateOrConnectWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectCreateOrConnectWithoutAgsUploadsInput> = z.object({
  where: z.lazy(() => UserProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProjectCreateWithoutAgsUploadsInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutAgsUploadsInputSchema) ]),
}).strict();

export const UserProjectUpsertWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectUpsertWithoutAgsUploadsInput> = z.object({
  update: z.union([ z.lazy(() => UserProjectUpdateWithoutAgsUploadsInputSchema),z.lazy(() => UserProjectUncheckedUpdateWithoutAgsUploadsInputSchema) ]),
  create: z.union([ z.lazy(() => UserProjectCreateWithoutAgsUploadsInputSchema),z.lazy(() => UserProjectUncheckedCreateWithoutAgsUploadsInputSchema) ]),
}).strict();

export const UserProjectUpdateWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectUpdateWithoutAgsUploadsInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProjectsNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutUserProjectsNestedInputSchema).optional()
}).strict();

export const UserProjectUncheckedUpdateWithoutAgsUploadsInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateWithoutAgsUploadsInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProjectCreateManyUserInputSchema: z.ZodType<Prisma.UserProjectCreateManyUserInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  projectId: z.string()
}).strict();

export const UserProjectUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUpdateWithoutUserInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutUserProjectsNestedInputSchema).optional(),
  agsUploads: z.lazy(() => AgsUploadUpdateManyWithoutUserProjectNestedInputSchema).optional()
}).strict();

export const UserProjectUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateWithoutUserInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agsUploads: z.lazy(() => AgsUploadUncheckedUpdateManyWithoutUserProjectNestedInputSchema).optional()
}).strict();

export const UserProjectUncheckedUpdateManyWithoutUserProjectsInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateManyWithoutUserProjectsInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgsUploadCreateManyUserProjectInputSchema: z.ZodType<Prisma.AgsUploadCreateManyUserProjectInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fileUrl: z.string().optional().nullable(),
  parsedRecordsUrl: z.string().optional().nullable(),
  status: z.lazy(() => AgsUploadStatusSchema),
  newRecordsCount: z.number().int().optional().nullable(),
  updatedRecordsCount: z.number().int().optional().nullable()
}).strict();

export const AgsUploadUpdateWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUpdateWithoutUserProjectInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgsUploadUncheckedUpdateWithoutUserProjectInputSchema: z.ZodType<Prisma.AgsUploadUncheckedUpdateWithoutUserProjectInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgsUploadUncheckedUpdateManyWithoutAgsUploadsInputSchema: z.ZodType<Prisma.AgsUploadUncheckedUpdateManyWithoutAgsUploadsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parsedRecordsUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AgsUploadStatusSchema),z.lazy(() => EnumAgsUploadStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedRecordsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationCreateManyProjectInputSchema: z.ZodType<Prisma.LocationCreateManyProjectInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.string().optional().nullable(),
  locationStatus: z.string().optional().nullable(),
  nationalEasting: z.number().optional().nullable(),
  nationalNorthing: z.number().optional().nullable(),
  gridReference: z.string().optional().nullable(),
  groundLevel: z.number().optional().nullable(),
  remarks: z.string().optional().nullable(),
  finalDepth: z.number().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  purpose: z.string().optional().nullable(),
  termination: z.string().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  gridReferenceLetter: z.string().optional().nullable(),
  localGridX: z.number().optional().nullable(),
  localGridY: z.number().optional().nullable(),
  localDatumLevel: z.number().optional().nullable(),
  localGridSystem: z.string().optional().nullable(),
  localDatumSystem: z.string().optional().nullable(),
  endOfTraverseEasting: z.number().optional().nullable(),
  endOfTraverseNorthing: z.number().optional().nullable(),
  endOfTraverseGroundLevel: z.number().optional().nullable(),
  localGridEasting: z.number().optional().nullable(),
  localGridNorthing: z.number().optional().nullable(),
  localElevation: z.number().optional().nullable(),
  latitudeEnd: z.string().optional().nullable(),
  longitudeEnd: z.string().optional().nullable(),
  projectionFormat: z.string().optional().nullable(),
  locationMethod: z.string().optional().nullable(),
  locationSubdivision: z.string().optional().nullable(),
  phaseGrouping: z.string().optional().nullable(),
  alignmentId: z.string().optional().nullable(),
  offset: z.number().optional().nullable(),
  chainage: z.string().optional().nullable(),
  transformDetails: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  nationalDatum: z.string().optional().nullable(),
  originalHoleId: z.string().optional().nullable(),
  originalJobReference: z.string().optional().nullable(),
  originatingCompany: z.string().optional().nullable()
}).strict();

export const UserProjectCreateManyProjectInputSchema: z.ZodType<Prisma.UserProjectCreateManyProjectInput> = z.object({
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const ColumnDefinitionCreateManyProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionCreateManyProjectInput> = z.object({
  id: z.string().uuid().optional(),
  columnId: z.string(),
  tableId: z.string(),
  label: z.string(),
  dataType: z.lazy(() => DataTypeSchema)
}).strict();

export const LocationUpdateWithoutProjectInputSchema: z.ZodType<Prisma.LocationUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samples: z.lazy(() => SampleUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samples: z.lazy(() => SampleUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateManyWithoutLocationsInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutLocationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customColumns: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  locationType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  groundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalDepth: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  purpose: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  termination: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gridReferenceLetter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridX: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridY: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localDatumSystem: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endOfTraverseGroundLevel: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridEasting: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localGridNorthing: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localElevation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitudeEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectionFormat: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationMethod: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationSubdivision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phaseGrouping: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alignmentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offset: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chainage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transformDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationalDatum: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalHoleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originalJobReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  originatingCompany: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserProjectUpdateWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUpdateWithoutProjectInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProjectsNestedInputSchema).optional(),
  agsUploads: z.lazy(() => AgsUploadUpdateManyWithoutUserProjectNestedInputSchema).optional()
}).strict();

export const UserProjectUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.UserProjectUncheckedUpdateWithoutProjectInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agsUploads: z.lazy(() => AgsUploadUncheckedUpdateManyWithoutUserProjectNestedInputSchema).optional()
}).strict();

export const ColumnDefinitionUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnDefinitionUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnDefinitionUncheckedUpdateManyWithoutColumnDefinitionsInputSchema: z.ZodType<Prisma.ColumnDefinitionUncheckedUpdateManyWithoutColumnDefinitionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataType: z.union([ z.lazy(() => DataTypeSchema),z.lazy(() => EnumDataTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SampleCreateManyLocationInputSchema: z.ZodType<Prisma.SampleCreateManyLocationInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  depthTop: z.number().optional().nullable(),
  sampleReference: z.string().optional().nullable(),
  sampleType: z.string().optional().nullable(),
  sampleUniqueID: z.string().optional().nullable(),
  depthBase: z.number().optional().nullable(),
  dateAndTimeSampleTaken: z.coerce.date().optional().nullable(),
  numBlowsRequired: z.number().int().optional().nullable(),
  sampleContainer: z.string().optional().nullable(),
  samplePreparation: z.string().optional().nullable(),
  sampleDiameter: z.number().optional().nullable(),
  depthToWaterBelowGroundSurface: z.number().optional().nullable(),
  percentageSampleRecovered: z.number().optional().nullable(),
  samplingTechnique: z.string().optional().nullable(),
  sampleMatrix: z.string().optional().nullable(),
  sampleQAType: z.string().optional().nullable(),
  samplerInitials: z.string().optional().nullable(),
  reasonForSampling: z.string().optional().nullable(),
  sampleRemarks: z.string().optional().nullable(),
  sampleDescription: z.string().optional().nullable(),
  dateSampleDescribed: z.coerce.date().optional().nullable(),
  personResponsibleForDescription: z.string().optional().nullable(),
  sampleCondition: z.string().optional().nullable(),
  sampleClassification: z.string().optional().nullable(),
  barometricPressure: z.number().optional().nullable(),
  sampleTemperature: z.number().optional().nullable(),
  gasPressureAboveBarometric: z.number().optional().nullable(),
  gasFlowRate: z.number().optional().nullable(),
  dateAndTimeSamplingCompleted: z.coerce.date().optional().nullable(),
  samplingDuration: z.string().optional().nullable(),
  captionUsedToDescribeSample: z.string().optional().nullable(),
  sampleRecordLink: z.string().optional().nullable(),
  stratumReference: z.string().optional().nullable(),
  associatedFileReference: z.string().optional().nullable(),
  lengthSampleRecovered: z.number().optional().nullable()
}).strict();

export const SampleUpdateWithoutLocationInputSchema: z.ZodType<Prisma.SampleUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SampleUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SampleUncheckedUpdateManyWithoutSamplesInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateManyWithoutSamplesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  depthTop: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleUniqueID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthBase: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSampleTaken: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numBlowsRequired: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleContainer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplePreparation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDiameter: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  depthToWaterBelowGroundSurface: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  percentageSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingTechnique: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleMatrix: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleQAType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplerInitials: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reasonForSampling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRemarks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateSampleDescribed: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  personResponsibleForDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleCondition: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleClassification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  barometricPressure: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleTemperature: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasPressureAboveBarometric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gasFlowRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAndTimeSamplingCompleted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  samplingDuration: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  captionUsedToDescribeSample: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sampleRecordLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stratumReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  associatedFileReference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lengthSampleRecovered: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserProjectFindFirstArgsSchema: z.ZodType<Prisma.UserProjectFindFirstArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereInputSchema.optional(),
  orderBy: z.union([ UserProjectOrderByWithRelationInputSchema.array(),UserProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProjectScalarFieldEnumSchema,UserProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProjectFindFirstOrThrowArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereInputSchema.optional(),
  orderBy: z.union([ UserProjectOrderByWithRelationInputSchema.array(),UserProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProjectScalarFieldEnumSchema,UserProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserProjectFindManyArgsSchema: z.ZodType<Prisma.UserProjectFindManyArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereInputSchema.optional(),
  orderBy: z.union([ UserProjectOrderByWithRelationInputSchema.array(),UserProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProjectScalarFieldEnumSchema,UserProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserProjectAggregateArgsSchema: z.ZodType<Prisma.UserProjectAggregateArgs> = z.object({
  where: UserProjectWhereInputSchema.optional(),
  orderBy: z.union([ UserProjectOrderByWithRelationInputSchema.array(),UserProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserProjectGroupByArgsSchema: z.ZodType<Prisma.UserProjectGroupByArgs> = z.object({
  where: UserProjectWhereInputSchema.optional(),
  orderBy: z.union([ UserProjectOrderByWithAggregationInputSchema.array(),UserProjectOrderByWithAggregationInputSchema ]).optional(),
  by: UserProjectScalarFieldEnumSchema.array(),
  having: UserProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserProjectFindUniqueArgsSchema: z.ZodType<Prisma.UserProjectFindUniqueArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereUniqueInputSchema,
}).strict()

export const UserProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserProjectFindUniqueOrThrowArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereUniqueInputSchema,
}).strict()

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const SampleFindFirstArgsSchema: z.ZodType<Prisma.SampleFindFirstArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereInputSchema.optional(),
  orderBy: z.union([ SampleOrderByWithRelationInputSchema.array(),SampleOrderByWithRelationInputSchema ]).optional(),
  cursor: SampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SampleScalarFieldEnumSchema,SampleScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SampleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SampleFindFirstOrThrowArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereInputSchema.optional(),
  orderBy: z.union([ SampleOrderByWithRelationInputSchema.array(),SampleOrderByWithRelationInputSchema ]).optional(),
  cursor: SampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SampleScalarFieldEnumSchema,SampleScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SampleFindManyArgsSchema: z.ZodType<Prisma.SampleFindManyArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereInputSchema.optional(),
  orderBy: z.union([ SampleOrderByWithRelationInputSchema.array(),SampleOrderByWithRelationInputSchema ]).optional(),
  cursor: SampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SampleScalarFieldEnumSchema,SampleScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SampleAggregateArgsSchema: z.ZodType<Prisma.SampleAggregateArgs> = z.object({
  where: SampleWhereInputSchema.optional(),
  orderBy: z.union([ SampleOrderByWithRelationInputSchema.array(),SampleOrderByWithRelationInputSchema ]).optional(),
  cursor: SampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SampleGroupByArgsSchema: z.ZodType<Prisma.SampleGroupByArgs> = z.object({
  where: SampleWhereInputSchema.optional(),
  orderBy: z.union([ SampleOrderByWithAggregationInputSchema.array(),SampleOrderByWithAggregationInputSchema ]).optional(),
  by: SampleScalarFieldEnumSchema.array(),
  having: SampleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SampleFindUniqueArgsSchema: z.ZodType<Prisma.SampleFindUniqueArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereUniqueInputSchema,
}).strict()

export const SampleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SampleFindUniqueOrThrowArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereUniqueInputSchema,
}).strict()

export const ColumnDefinitionFindFirstArgsSchema: z.ZodType<Prisma.ColumnDefinitionFindFirstArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereInputSchema.optional(),
  orderBy: z.union([ ColumnDefinitionOrderByWithRelationInputSchema.array(),ColumnDefinitionOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnDefinitionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnDefinitionScalarFieldEnumSchema,ColumnDefinitionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnDefinitionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnDefinitionFindFirstOrThrowArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereInputSchema.optional(),
  orderBy: z.union([ ColumnDefinitionOrderByWithRelationInputSchema.array(),ColumnDefinitionOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnDefinitionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnDefinitionScalarFieldEnumSchema,ColumnDefinitionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnDefinitionFindManyArgsSchema: z.ZodType<Prisma.ColumnDefinitionFindManyArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereInputSchema.optional(),
  orderBy: z.union([ ColumnDefinitionOrderByWithRelationInputSchema.array(),ColumnDefinitionOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnDefinitionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnDefinitionScalarFieldEnumSchema,ColumnDefinitionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnDefinitionAggregateArgsSchema: z.ZodType<Prisma.ColumnDefinitionAggregateArgs> = z.object({
  where: ColumnDefinitionWhereInputSchema.optional(),
  orderBy: z.union([ ColumnDefinitionOrderByWithRelationInputSchema.array(),ColumnDefinitionOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnDefinitionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnDefinitionGroupByArgsSchema: z.ZodType<Prisma.ColumnDefinitionGroupByArgs> = z.object({
  where: ColumnDefinitionWhereInputSchema.optional(),
  orderBy: z.union([ ColumnDefinitionOrderByWithAggregationInputSchema.array(),ColumnDefinitionOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnDefinitionScalarFieldEnumSchema.array(),
  having: ColumnDefinitionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnDefinitionFindUniqueArgsSchema: z.ZodType<Prisma.ColumnDefinitionFindUniqueArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereUniqueInputSchema,
}).strict()

export const ColumnDefinitionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnDefinitionFindUniqueOrThrowArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereUniqueInputSchema,
}).strict()

export const AgsUploadFindFirstArgsSchema: z.ZodType<Prisma.AgsUploadFindFirstArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereInputSchema.optional(),
  orderBy: z.union([ AgsUploadOrderByWithRelationInputSchema.array(),AgsUploadOrderByWithRelationInputSchema ]).optional(),
  cursor: AgsUploadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgsUploadScalarFieldEnumSchema,AgsUploadScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AgsUploadFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AgsUploadFindFirstOrThrowArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereInputSchema.optional(),
  orderBy: z.union([ AgsUploadOrderByWithRelationInputSchema.array(),AgsUploadOrderByWithRelationInputSchema ]).optional(),
  cursor: AgsUploadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgsUploadScalarFieldEnumSchema,AgsUploadScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AgsUploadFindManyArgsSchema: z.ZodType<Prisma.AgsUploadFindManyArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereInputSchema.optional(),
  orderBy: z.union([ AgsUploadOrderByWithRelationInputSchema.array(),AgsUploadOrderByWithRelationInputSchema ]).optional(),
  cursor: AgsUploadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgsUploadScalarFieldEnumSchema,AgsUploadScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AgsUploadAggregateArgsSchema: z.ZodType<Prisma.AgsUploadAggregateArgs> = z.object({
  where: AgsUploadWhereInputSchema.optional(),
  orderBy: z.union([ AgsUploadOrderByWithRelationInputSchema.array(),AgsUploadOrderByWithRelationInputSchema ]).optional(),
  cursor: AgsUploadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AgsUploadGroupByArgsSchema: z.ZodType<Prisma.AgsUploadGroupByArgs> = z.object({
  where: AgsUploadWhereInputSchema.optional(),
  orderBy: z.union([ AgsUploadOrderByWithAggregationInputSchema.array(),AgsUploadOrderByWithAggregationInputSchema ]).optional(),
  by: AgsUploadScalarFieldEnumSchema.array(),
  having: AgsUploadScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AgsUploadFindUniqueArgsSchema: z.ZodType<Prisma.AgsUploadFindUniqueArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereUniqueInputSchema,
}).strict()

export const AgsUploadFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AgsUploadFindUniqueOrThrowArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserProjectCreateArgsSchema: z.ZodType<Prisma.UserProjectCreateArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  data: z.union([ UserProjectCreateInputSchema,UserProjectUncheckedCreateInputSchema ]),
}).strict()

export const UserProjectUpsertArgsSchema: z.ZodType<Prisma.UserProjectUpsertArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereUniqueInputSchema,
  create: z.union([ UserProjectCreateInputSchema,UserProjectUncheckedCreateInputSchema ]),
  update: z.union([ UserProjectUpdateInputSchema,UserProjectUncheckedUpdateInputSchema ]),
}).strict()

export const UserProjectCreateManyArgsSchema: z.ZodType<Prisma.UserProjectCreateManyArgs> = z.object({
  data: z.union([ UserProjectCreateManyInputSchema,UserProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserProjectDeleteArgsSchema: z.ZodType<Prisma.UserProjectDeleteArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  where: UserProjectWhereUniqueInputSchema,
}).strict()

export const UserProjectUpdateArgsSchema: z.ZodType<Prisma.UserProjectUpdateArgs> = z.object({
  select: UserProjectSelectSchema.optional(),
  include: UserProjectIncludeSchema.optional(),
  data: z.union([ UserProjectUpdateInputSchema,UserProjectUncheckedUpdateInputSchema ]),
  where: UserProjectWhereUniqueInputSchema,
}).strict()

export const UserProjectUpdateManyArgsSchema: z.ZodType<Prisma.UserProjectUpdateManyArgs> = z.object({
  data: z.union([ UserProjectUpdateManyMutationInputSchema,UserProjectUncheckedUpdateManyInputSchema ]),
  where: UserProjectWhereInputSchema.optional(),
}).strict()

export const UserProjectDeleteManyArgsSchema: z.ZodType<Prisma.UserProjectDeleteManyArgs> = z.object({
  where: UserProjectWhereInputSchema.optional(),
}).strict()

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict()

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict()

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
}).strict()

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
}).strict()

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict()

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict()

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict()

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict()

export const SampleCreateArgsSchema: z.ZodType<Prisma.SampleCreateArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  data: z.union([ SampleCreateInputSchema,SampleUncheckedCreateInputSchema ]),
}).strict()

export const SampleUpsertArgsSchema: z.ZodType<Prisma.SampleUpsertArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereUniqueInputSchema,
  create: z.union([ SampleCreateInputSchema,SampleUncheckedCreateInputSchema ]),
  update: z.union([ SampleUpdateInputSchema,SampleUncheckedUpdateInputSchema ]),
}).strict()

export const SampleCreateManyArgsSchema: z.ZodType<Prisma.SampleCreateManyArgs> = z.object({
  data: z.union([ SampleCreateManyInputSchema,SampleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SampleDeleteArgsSchema: z.ZodType<Prisma.SampleDeleteArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  where: SampleWhereUniqueInputSchema,
}).strict()

export const SampleUpdateArgsSchema: z.ZodType<Prisma.SampleUpdateArgs> = z.object({
  select: SampleSelectSchema.optional(),
  include: SampleIncludeSchema.optional(),
  data: z.union([ SampleUpdateInputSchema,SampleUncheckedUpdateInputSchema ]),
  where: SampleWhereUniqueInputSchema,
}).strict()

export const SampleUpdateManyArgsSchema: z.ZodType<Prisma.SampleUpdateManyArgs> = z.object({
  data: z.union([ SampleUpdateManyMutationInputSchema,SampleUncheckedUpdateManyInputSchema ]),
  where: SampleWhereInputSchema.optional(),
}).strict()

export const SampleDeleteManyArgsSchema: z.ZodType<Prisma.SampleDeleteManyArgs> = z.object({
  where: SampleWhereInputSchema.optional(),
}).strict()

export const ColumnDefinitionCreateArgsSchema: z.ZodType<Prisma.ColumnDefinitionCreateArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  data: z.union([ ColumnDefinitionCreateInputSchema,ColumnDefinitionUncheckedCreateInputSchema ]),
}).strict()

export const ColumnDefinitionUpsertArgsSchema: z.ZodType<Prisma.ColumnDefinitionUpsertArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereUniqueInputSchema,
  create: z.union([ ColumnDefinitionCreateInputSchema,ColumnDefinitionUncheckedCreateInputSchema ]),
  update: z.union([ ColumnDefinitionUpdateInputSchema,ColumnDefinitionUncheckedUpdateInputSchema ]),
}).strict()

export const ColumnDefinitionCreateManyArgsSchema: z.ZodType<Prisma.ColumnDefinitionCreateManyArgs> = z.object({
  data: z.union([ ColumnDefinitionCreateManyInputSchema,ColumnDefinitionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ColumnDefinitionDeleteArgsSchema: z.ZodType<Prisma.ColumnDefinitionDeleteArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  where: ColumnDefinitionWhereUniqueInputSchema,
}).strict()

export const ColumnDefinitionUpdateArgsSchema: z.ZodType<Prisma.ColumnDefinitionUpdateArgs> = z.object({
  select: ColumnDefinitionSelectSchema.optional(),
  include: ColumnDefinitionIncludeSchema.optional(),
  data: z.union([ ColumnDefinitionUpdateInputSchema,ColumnDefinitionUncheckedUpdateInputSchema ]),
  where: ColumnDefinitionWhereUniqueInputSchema,
}).strict()

export const ColumnDefinitionUpdateManyArgsSchema: z.ZodType<Prisma.ColumnDefinitionUpdateManyArgs> = z.object({
  data: z.union([ ColumnDefinitionUpdateManyMutationInputSchema,ColumnDefinitionUncheckedUpdateManyInputSchema ]),
  where: ColumnDefinitionWhereInputSchema.optional(),
}).strict()

export const ColumnDefinitionDeleteManyArgsSchema: z.ZodType<Prisma.ColumnDefinitionDeleteManyArgs> = z.object({
  where: ColumnDefinitionWhereInputSchema.optional(),
}).strict()

export const AgsUploadCreateArgsSchema: z.ZodType<Prisma.AgsUploadCreateArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  data: z.union([ AgsUploadCreateInputSchema,AgsUploadUncheckedCreateInputSchema ]),
}).strict()

export const AgsUploadUpsertArgsSchema: z.ZodType<Prisma.AgsUploadUpsertArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereUniqueInputSchema,
  create: z.union([ AgsUploadCreateInputSchema,AgsUploadUncheckedCreateInputSchema ]),
  update: z.union([ AgsUploadUpdateInputSchema,AgsUploadUncheckedUpdateInputSchema ]),
}).strict()

export const AgsUploadCreateManyArgsSchema: z.ZodType<Prisma.AgsUploadCreateManyArgs> = z.object({
  data: z.union([ AgsUploadCreateManyInputSchema,AgsUploadCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AgsUploadDeleteArgsSchema: z.ZodType<Prisma.AgsUploadDeleteArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  where: AgsUploadWhereUniqueInputSchema,
}).strict()

export const AgsUploadUpdateArgsSchema: z.ZodType<Prisma.AgsUploadUpdateArgs> = z.object({
  select: AgsUploadSelectSchema.optional(),
  include: AgsUploadIncludeSchema.optional(),
  data: z.union([ AgsUploadUpdateInputSchema,AgsUploadUncheckedUpdateInputSchema ]),
  where: AgsUploadWhereUniqueInputSchema,
}).strict()

export const AgsUploadUpdateManyArgsSchema: z.ZodType<Prisma.AgsUploadUpdateManyArgs> = z.object({
  data: z.union([ AgsUploadUpdateManyMutationInputSchema,AgsUploadUncheckedUpdateManyInputSchema ]),
  where: AgsUploadWhereInputSchema.optional(),
}).strict()

export const AgsUploadDeleteManyArgsSchema: z.ZodType<Prisma.AgsUploadDeleteManyArgs> = z.object({
  where: AgsUploadWhereInputSchema.optional(),
}).strict()