/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Slides
// ====================================================

export interface Slides_entries_Folder_metaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface Slides_entries_Folder {
  __typename: "Folder";
  id: string;
  metaData: Slides_entries_Folder_metaData | null;
}

export interface Slides_entries_File_metaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface Slides_entries_File {
  __typename: "File";
  id: string;
  metaData: Slides_entries_File_metaData | null;
  contentType: string;
  thumbImageUrl: string;
  imageUrl: string;
  prev: string | null;
  next: string | null;
}

export type Slides_entries = Slides_entries_Folder | Slides_entries_File;

export interface Slides {
  entries: Slides_entries[];
}

export interface SlidesVariables {
  id?: string | null;
  metaDataInput?: MetaDataInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetMetaData
// ====================================================

export interface SetMetaData_setMetaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface SetMetaData {
  setMetaData: SetMetaData_setMetaData | null;
}

export interface SetMetaDataVariables {
  id: string;
  metaDataInput: MetaDataInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMetaData
// ====================================================

export interface GetMetaData_entry_metaData {
  __typename: "MetaData";
  tags: string[] | null;
  attributes: string[][] | null;
}

export interface GetMetaData_entry {
  __typename: "Folder" | "File";
  id: string;
  metaData: GetMetaData_entry_metaData | null;
}

export interface GetMetaData {
  entry: GetMetaData_entry | null;
  /**
   * returns list of all tags used in repository
   */
  tags: string[];
  /**
   * returns list of all attributes used in repository
   */
  attributes: string[];
}

export interface GetMetaDataVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRepoMetaData
// ====================================================

export interface GetRepoMetaData {
  /**
   * returns list of all tags used in repository
   */
  tags: string[];
  /**
   * returns list of all attributes used in repository
   */
  attributes: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface MetaDataInput {
  tags?: string[] | null;
  attributes?: string[][] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
