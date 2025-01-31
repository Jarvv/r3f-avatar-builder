/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Assets = "Assets",
  Categories = "Categories",
  ColorPalettes = "ColorPalettes",
  Authorigins = "_authOrigins",
  Externalauths = "_externalAuths",
  Mfas = "_mfas",
  Otps = "_otps",
  Superusers = "_superusers",
  Position = "position",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AssetsRecord = {
  category?: RecordIdString;
  created?: IsoDateString;
  id: string;
  name: string;
  thumbnail: string;
  updated?: IsoDateString;
  url: string;
};

export type CategoriesRecord = {
  colorPalette?: RecordIdString;
  created?: IsoDateString;
  defaultAsset?: RecordIdString;
  id: string;
  name: string;
  position?: number;
  updated?: IsoDateString;
};

export type ColorPalettesRecord<Tcolors = any> = {
  colors?: null | Tcolors;
  created?: IsoDateString;
  id: string;
  name?: string;
  updated?: IsoDateString;
};

export type AuthoriginsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  fingerprint: string;
  id: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type ExternalauthsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type MfasRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  method: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type OtpsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
  updated?: IsoDateString;
};

export type SuperusersRecord = {
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export type PositionRecord = {
  created?: IsoDateString;
  id: string;
  name?: string;
  updated?: IsoDateString;
  value?: number;
};

export type UsersRecord = {
  avatar?: string;
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  name?: string;
  password: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AssetsResponse<Texpand = any> = Required<AssetsRecord> &
  BaseSystemFields<Texpand>;
export type CategoriesResponse<Texpand = any> = Required<CategoriesRecord> &
  BaseSystemFields<Texpand>;
export type ColorPalettesResponse<Tcolors = any, Texpand = any> = Required<
  ColorPalettesRecord<Tcolors>
> &
  BaseSystemFields<Texpand>;
export type AuthoriginsResponse<Texpand = any> = Required<AuthoriginsRecord> &
  BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = any> =
  Required<ExternalauthsRecord> & BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = any> = Required<MfasRecord> &
  BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = any> = Required<OtpsRecord> &
  BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = any> = Required<SuperusersRecord> &
  AuthSystemFields<Texpand>;
export type PositionResponse<Texpand = any> = Required<PositionRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = any> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  Assets: AssetsRecord;
  Categories: CategoriesRecord;
  ColorPalettes: ColorPalettesRecord;
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  position: PositionRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  Assets: AssetsResponse;
  Categories: CategoriesResponse;
  ColorPalettes: ColorPalettesResponse;
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  position: PositionResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "Assets"): RecordService<AssetsResponse>;
  collection(idOrName: "Categories"): RecordService<CategoriesResponse>;
  collection(idOrName: "ColorPalettes"): RecordService<ColorPalettesResponse>;
  collection(idOrName: "_authOrigins"): RecordService<AuthoriginsResponse>;
  collection(idOrName: "_externalAuths"): RecordService<ExternalauthsResponse>;
  collection(idOrName: "_mfas"): RecordService<MfasResponse>;
  collection(idOrName: "_otps"): RecordService<OtpsResponse>;
  collection(idOrName: "_superusers"): RecordService<SuperusersResponse>;
  collection(idOrName: "position"): RecordService<PositionResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
};
