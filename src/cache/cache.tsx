import { InMemoryCache, makeVar } from "@apollo/client";
import { createRef } from "react";
import * as H from "history";

import { SearchInput } from "lib";

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
