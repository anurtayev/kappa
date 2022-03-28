import { InMemoryCache, makeVar } from "@apollo/client";
import { createRef } from "react";
import * as H from "history";

import { SearchInput } from "lib";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        folderPathname: {
          read() {
            return folderPathnameVar();
          },
        },
        search: {
          read() {
            return searchVar();
          },
        },
      },
    },
  },
});

export type NavigationHistory = Array<string>;
export type BrowseEntry = { id: string; pageSize: number; nextToken: string };
export type SearchEntry = { id: string; pageSize: number; nextToken: string };

export const folderPathnameVar = makeVar<string>("");
export const searchVar = makeVar<string>("");
export const imagePathnameVar = makeVar<string>("");

export const imagesDivRef = createRef<HTMLDivElement>();
export const imagesDivRefVar = makeVar(imagesDivRef);

export const navRef = createRef<HTMLDivElement>();
export const navRefVar = makeVar(navRef);

type SavedScrollTops = Map<string, number>;
type SaveScrollTopFn = (params: H.Location) => SavedScrollTops;
type RestoreScrollTopFn = (params: H.Location) => null | void;

const savedScrollTops = new Map<string, number>();
const saveScrollTopFn: SaveScrollTopFn = ({ pathname, search }) =>
  savedScrollTops.set(
    pathname + search,
    imagesDivRef.current?.scrollTop as number
  );
export const saveScrollTopFnVar = makeVar(saveScrollTopFn);

const restoreScrollTopFn: RestoreScrollTopFn = ({ pathname, search }) =>
  imagesDivRef.current &&
  imagesDivRef.current.scrollTo(0, savedScrollTops.get(pathname + search) || 0);
export const restoreScrollTopFnVar = makeVar(restoreScrollTopFn);
