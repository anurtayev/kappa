export enum EntryType {
  folder = "Folder",
  file = "File",
}

export enum EntryAction {
  navigate = "Navigate",
  meta = "Meta",
}

export enum appRoutes {
  browse = "browse",
  search = "search",
  image = "image",
  meta = "meta",
  slides = "slides",
}

export enum systemAttributes {
  favorite = "favorite",
  hidden = "hidden",
}

export enum Characters {
  check = "\u{2713}",
  delete = "\u{232b}",
  file = "\u{1F5BC}",
  folder = "\u{1F4C1}",
  plus = "\u{002b}",
  multiply = "\u{00d7}",
  home = "\u{1F3E0}",
  arrowUp = "\u{21e7}",
  arrowLeft = "\u{21e6}",
  arrowRight = "\u{21e8}",
  label = "\u{1f3f7}",
  magnifyingGlass = "\u{1F50D}",
  refresh = "\u{27F3}",
  ellipsis = "\u{2026}",
}

export type NavItem = {
  navFn: () => void;
  icon: Characters;
  title: string;
};

export type NavItems = Array<NavItem>;

export const isFolder = (id: string): boolean => id.slice(-1) === "/";

export const getMediaName = (key: string): string =>
  key.split("/").slice(-1)[0];

export const getPageSizeFromURLSearchParams = (
  searchParams: URLSearchParams
): number =>
  Number(
    searchParams.get(PARAM_PAGE_SIZE) || process.env.REACT_APP_PAGE_SIZE || "20"
  );

export const PARAM_SEARCH_INPUT = "searchinput";
export const PARAM_PAGE_SIZE = "pagesize";
export const PARAM_NEXT_TOKEN = "nexttoken";
