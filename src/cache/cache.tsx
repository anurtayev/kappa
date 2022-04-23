import Apollo, { InMemoryCache, makeVar, gql } from "@apollo/client";
import { SlidesDocument, SlidesQueryVariables, Maybe, MetaData } from "lib";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    FolderConnection: {
      fields: {
        scrollTop: {
          read(_, { variables, args }) {
            return 0;
          },
        },
      },
    },
    Query: {
      fields: {
        slideId: {
          read(_, { variables, args }) {
            console.log();
          },
        },
      },
    },
  },
});

export const setCurrentSlides = makeVar<Maybe<Array<MetaData>> | undefined>(
  undefined
);
