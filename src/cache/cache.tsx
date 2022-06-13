import { InMemoryCache, makeVar } from "@apollo/client";
import { Maybe, MetaData, UserProfile } from "lib";

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
        userProfile: {
          read() {
            return userProfile();
          },
        },
      },
    },
  },
});

export const slides = makeVar<Maybe<Array<MetaData>> | undefined>(undefined);
export const userProfile = makeVar<UserProfile | undefined>(undefined);
