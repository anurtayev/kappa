import { InMemoryCache, makeVar } from "@apollo/client";
import { Maybe, MetaData } from "lib";
import { createRef } from "react";

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
          read(_, { args }) {
            const slidesArray = slides();
            return args &&
              args.index >= 0 &&
              slidesArray &&
              args.index <= slidesArray?.length - 1
              ? slidesArray[args.index].id
              : null;
          },
        },
        numberOfSlides: {
          read() {
            const slidesArray = slides();
            return slidesArray?.length;
          },
        },
      },
    },
  },
});

export const slides = makeVar<Maybe<Array<MetaData>> | undefined>(undefined);
