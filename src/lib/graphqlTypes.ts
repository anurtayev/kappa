import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Attribute = {
  __typename?: 'Attribute';
  name: Scalars['String'];
  type: InputType;
};

export type AttributeInput = {
  name: Scalars['String'];
  type: InputType;
};

export type AttributeSortTerm = {
  attribute: Scalars['String'];
  sortOrder: SortOrder;
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  attribute: Attribute;
  value: Scalars['String'];
};

export type AttributeValueInput = {
  attribute: AttributeInput;
  value: Scalars['String'];
};

export type FolderConnection = {
  __typename?: 'FolderConnection';
  items?: Maybe<Array<MetaData>>;
  nextToken?: Maybe<Scalars['String']>;
  scrollTop: Scalars['Int'];
};


export type FolderConnectionScrollTopArgs = {
  locationKey: Scalars['String'];
};

export enum InputType {
  Number = 'NUMBER',
  String = 'STRING'
}

export type MetaData = {
  __typename?: 'MetaData';
  attributes?: Maybe<Array<AttributeValue>>;
  id: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type MetaDataInput = {
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateMetaData?: Maybe<MetaData>;
};


export type MutationUpdateMetaDataArgs = {
  id: Scalars['String'];
  metaDataInput?: InputMaybe<MetaDataInput>;
};

export type Query = {
  __typename?: 'Query';
  getAttributes?: Maybe<Array<Attribute>>;
  getTags?: Maybe<Array<Scalars['String']>>;
  listFolder?: Maybe<FolderConnection>;
  search?: Maybe<FolderConnection>;
};


export type QueryListFolderArgs = {
  id?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  pageSize: Scalars['Int'];
};


export type QuerySearchArgs = {
  nextToken?: InputMaybe<Scalars['String']>;
  pageSize: Scalars['Int'];
  searchInput: SearchInput;
};

export type SearchInput = {
  filter?: InputMaybe<MetaDataInput>;
  sorter?: InputMaybe<Array<AttributeSortTerm>>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SlidesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  pageSize: Scalars['Int'];
  nextToken?: InputMaybe<Scalars['String']>;
  locationKey: Scalars['String'];
}>;


export type SlidesQuery = { __typename?: 'Query', listFolder?: { __typename?: 'FolderConnection', nextToken?: string | null, scrollTop: number, items?: Array<{ __typename?: 'MetaData', id: string, tags?: Array<string> | null, attributes?: Array<{ __typename?: 'AttributeValue', value: string, attribute: { __typename?: 'Attribute', name: string, type: InputType } }> | null }> | null } | null };

export type UpdateMetaDataMutationVariables = Exact<{
  id: Scalars['String'];
  metaDataInput?: InputMaybe<MetaDataInput>;
}>;


export type UpdateMetaDataMutation = { __typename?: 'Mutation', updateMetaData?: { __typename?: 'MetaData', tags?: Array<string> | null, attributes?: Array<{ __typename?: 'AttributeValue', value: string, attribute: { __typename?: 'Attribute', name: string, type: InputType } }> | null } | null };

export type GetAllTagsAndAttributesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsAndAttributesQuery = { __typename?: 'Query', getTags?: Array<string> | null, getAttributes?: Array<{ __typename?: 'Attribute', name: string, type: InputType }> | null };

export type SearchQueryVariables = Exact<{
  searchInput: SearchInput;
  pageSize: Scalars['Int'];
  nextToken?: InputMaybe<Scalars['String']>;
}>;


export type SearchQuery = { __typename?: 'Query', search?: { __typename?: 'FolderConnection', nextToken?: string | null, items?: Array<{ __typename?: 'MetaData', id: string, tags?: Array<string> | null, attributes?: Array<{ __typename?: 'AttributeValue', value: string, attribute: { __typename?: 'Attribute', name: string, type: InputType } }> | null }> | null } | null };


export const SlidesDocument = gql`
    query Slides($id: String, $pageSize: Int!, $nextToken: String, $locationKey: String!) {
  listFolder(id: $id, nextToken: $nextToken, pageSize: $pageSize) {
    items {
      id
      attributes {
        attribute {
          name
          type
        }
        value
      }
      tags
    }
    nextToken
    scrollTop(locationKey: $locationKey) @client
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
 *      pageSize: // value for 'pageSize'
 *      nextToken: // value for 'nextToken'
 *      locationKey: // value for 'locationKey'
 *   },
 * });
 */
export function useSlidesQuery(baseOptions: Apollo.QueryHookOptions<SlidesQuery, SlidesQueryVariables>) {
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
export const UpdateMetaDataDocument = gql`
    mutation UpdateMetaData($id: String!, $metaDataInput: MetaDataInput) {
  updateMetaData(id: $id, metaDataInput: $metaDataInput) {
    tags
    attributes {
      attribute {
        name
        type
      }
      value
    }
  }
}
    `;
export type UpdateMetaDataMutationFn = Apollo.MutationFunction<UpdateMetaDataMutation, UpdateMetaDataMutationVariables>;

/**
 * __useUpdateMetaDataMutation__
 *
 * To run a mutation, you first call `useUpdateMetaDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetaDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMetaDataMutation, { data, loading, error }] = useUpdateMetaDataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      metaDataInput: // value for 'metaDataInput'
 *   },
 * });
 */
export function useUpdateMetaDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMetaDataMutation, UpdateMetaDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMetaDataMutation, UpdateMetaDataMutationVariables>(UpdateMetaDataDocument, options);
      }
export type UpdateMetaDataMutationHookResult = ReturnType<typeof useUpdateMetaDataMutation>;
export type UpdateMetaDataMutationResult = Apollo.MutationResult<UpdateMetaDataMutation>;
export type UpdateMetaDataMutationOptions = Apollo.BaseMutationOptions<UpdateMetaDataMutation, UpdateMetaDataMutationVariables>;
export const GetAllTagsAndAttributesDocument = gql`
    query GetAllTagsAndAttributes {
  getAttributes {
    name
    type
  }
  getTags
}
    `;

/**
 * __useGetAllTagsAndAttributesQuery__
 *
 * To run a query within a React component, call `useGetAllTagsAndAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsAndAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsAndAttributesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagsAndAttributesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTagsAndAttributesQuery, GetAllTagsAndAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTagsAndAttributesQuery, GetAllTagsAndAttributesQueryVariables>(GetAllTagsAndAttributesDocument, options);
      }
export function useGetAllTagsAndAttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagsAndAttributesQuery, GetAllTagsAndAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTagsAndAttributesQuery, GetAllTagsAndAttributesQueryVariables>(GetAllTagsAndAttributesDocument, options);
        }
export type GetAllTagsAndAttributesQueryHookResult = ReturnType<typeof useGetAllTagsAndAttributesQuery>;
export type GetAllTagsAndAttributesLazyQueryHookResult = ReturnType<typeof useGetAllTagsAndAttributesLazyQuery>;
export type GetAllTagsAndAttributesQueryResult = Apollo.QueryResult<GetAllTagsAndAttributesQuery, GetAllTagsAndAttributesQueryVariables>;
export const SearchDocument = gql`
    query Search($searchInput: SearchInput!, $pageSize: Int!, $nextToken: String) {
  search(searchInput: $searchInput, pageSize: $pageSize, nextToken: $nextToken) {
    items {
      attributes {
        attribute {
          name
          type
        }
        value
      }
      id
      tags
    }
    nextToken
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *      pageSize: // value for 'pageSize'
 *      nextToken: // value for 'nextToken'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;