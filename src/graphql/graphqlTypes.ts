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

export type AttributeSortTerm = {
  attribute: Scalars['String'];
  sortOrder: SortOrder;
};

export type AttributeValueTerm = {
  __typename?: 'AttributeValueTerm';
  attribute: Scalars['String'];
  type: InputType;
  value: Scalars['String'];
};

export type AttributeValueTermInput = {
  attribute: Scalars['String'];
  type: InputType;
  value: Scalars['String'];
};

export type AttributesConnection = {
  __typename?: 'AttributesConnection';
  attributes?: Maybe<Array<Scalars['String']>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type FolderConnection = {
  __typename?: 'FolderConnection';
  items?: Maybe<Array<Scalars['String']>>;
  nextToken?: Maybe<Scalars['String']>;
};

export enum InputType {
  Number = 'NUMBER',
  String = 'STRING'
}

export type MetaData = {
  __typename?: 'MetaData';
  attributes?: Maybe<Array<AttributeValueTerm>>;
  id: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type MetaDataInput = {
  attributes?: InputMaybe<Array<AttributeValueTermInput>>;
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
  getAttributes?: Maybe<AttributesConnection>;
  getMeta?: Maybe<MetaData>;
  getTags?: Maybe<TagsConnection>;
  listFolder?: Maybe<FolderConnection>;
  search?: Maybe<FolderConnection>;
};


export type QueryGetAttributesArgs = {
  nextToken?: InputMaybe<Scalars['String']>;
};


export type QueryGetMetaArgs = {
  id: Scalars['String'];
};


export type QueryGetTagsArgs = {
  nextToken?: InputMaybe<Scalars['String']>;
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

export type TagsConnection = {
  __typename?: 'TagsConnection';
  nextToken?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type SlidesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  pageSize: Scalars['Int'];
  nextToken?: InputMaybe<Scalars['String']>;
}>;


export type SlidesQuery = { __typename?: 'Query', listFolder?: { __typename?: 'FolderConnection', items?: Array<string> | null | undefined, nextToken?: string | null | undefined } | null | undefined };

export type UpdateMetaDataMutationVariables = Exact<{
  id: Scalars['String'];
  metaDataInput?: InputMaybe<MetaDataInput>;
}>;


export type UpdateMetaDataMutation = { __typename?: 'Mutation', updateMetaData?: { __typename?: 'MetaData', tags?: Array<string> | null | undefined, attributes?: Array<{ __typename?: 'AttributeValueTerm', attribute: string, value: string, type: InputType }> | null | undefined } | null | undefined };

export type GetMetaDataQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMetaDataQuery = { __typename?: 'Query', getMeta?: { __typename?: 'MetaData', id: string, tags?: Array<string> | null | undefined, attributes?: Array<{ __typename?: 'AttributeValueTerm', attribute: string, value: string, type: InputType }> | null | undefined } | null | undefined };


export const SlidesDocument = gql`
    query Slides($id: String, $pageSize: Int!, $nextToken: String) {
  listFolder(id: $id, nextToken: $nextToken, pageSize: $pageSize) {
    items
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
 *      pageSize: // value for 'pageSize'
 *      nextToken: // value for 'nextToken'
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
      attribute
      value
      type
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
export const GetMetaDataDocument = gql`
    query GetMetaData($id: String!) {
  getMeta(id: $id) {
    attributes {
      attribute
      value
      type
    }
    id
    tags
  }
}
    `;

/**
 * __useGetMetaDataQuery__
 *
 * To run a query within a React component, call `useGetMetaDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetaDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetaDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMetaDataQuery(baseOptions: Apollo.QueryHookOptions<GetMetaDataQuery, GetMetaDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMetaDataQuery, GetMetaDataQueryVariables>(GetMetaDataDocument, options);
      }
export function useGetMetaDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMetaDataQuery, GetMetaDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMetaDataQuery, GetMetaDataQueryVariables>(GetMetaDataDocument, options);
        }
export type GetMetaDataQueryHookResult = ReturnType<typeof useGetMetaDataQuery>;
export type GetMetaDataLazyQueryHookResult = ReturnType<typeof useGetMetaDataLazyQuery>;
export type GetMetaDataQueryResult = Apollo.QueryResult<GetMetaDataQuery, GetMetaDataQueryVariables>;