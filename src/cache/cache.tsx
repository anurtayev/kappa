import { InMemoryCache } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    FolderConnection: {
      fields: {
        scrollTop: {
          read(_, { variables, args }) {
            console.log("==> 1", variables);
            console.log("==> 2", args);

            return 0;
          },
        },
      },
    },
  },
});
