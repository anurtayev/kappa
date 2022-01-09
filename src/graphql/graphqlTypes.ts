import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Entry = {
  __typename?: 'Entry';
  attributes?: Maybe<Array<Array<Scalars['String']>>>;
  id: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type EntryConnection = {
  __typename?: 'EntryConnection';
  items: Array<Entry>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  listFolder?: Maybe<EntryConnection>;
};


export type QueryListFolderArgs = {
  id?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
};

export type SlidesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type SlidesQuery = { __typename?: 'Query', listFolder?: { __typename?: 'EntryConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Entry', attributes?: Array<Array<string>> | null | undefined, id: string, tags?: Array<string> | null | undefined }> } | null | undefined };


export const SlidesDocument = gql`
    query Slides($id: String) {
  listFolder(id: $id) {
    items {
      attributes
      id
      tags
    }
    nextToken
  }
}
    `;

/**
 * __useSlidesQuery__
 *
 * To run a query within a React component, call `useSlidesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlidesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlidesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSlidesQuery(baseOptions?: Apollo.QueryHookOptions<SlidesQuery, SlidesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlidesQuery, SlidesQueryVariables>(SlidesDocument, options);
      }
export function useSlidesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlidesQuery, SlidesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlidesQuery, SlidesQueryVariables>(SlidesDocument, options);
        }
export type SlidesQueryHookResult = ReturnType<typeof useSlidesQuery>;
export type SlidesLazyQueryHookResult = ReturnType<typeof useSlidesLazyQuery>;
export type SlidesQueryResult = Apollo.QueryResult<SlidesQuery, SlidesQueryVariables>;