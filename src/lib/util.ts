import { MetaDataInput, SlidesVariables } from "./graphqlTypes";

export enum entryType {
  folder = "Folder",
  file = "File",
}

export enum appRoutes {
  folder = "/folder",
  image = "/image",
  meta = "/meta",
  search = "/search",
}

export const pathPrefixesRegExp = new RegExp(
  `^(${appRoutes.folder}|${appRoutes.image}|${appRoutes.meta})`
);

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
}

export type MetaDataForm = MetaDataInput & {
  newTag: string;
  newKey: string;
  newValue: string;
};

export const getFolderPathname = (repoVariables: SlidesVariables) => {
  const { id, metaDataInput } = repoVariables;

  if (id) return `/${appRoutes.folder}/${id}`;

  if (metaDataInput) {
    const { tags, attributes } = metaDataInput;
    let queryString = "";

    const tagsPart =
      tags && tags.length > 0
        ? tags.map((tag: string) => "tags=" + tag).join("&")
        : "";

    const attributesPart =
      attributes && attributes.length > 0
        ? attributes
            .map((attribute) => "attributes=" + attribute.join(","))
            .join("&")
        : "";

    queryString =
      tagsPart || attributesPart
        ? "?" +
          (tagsPart ? "&" + tagsPart : "") +
          (attributesPart ? "&" + attributesPart : "")
        : "";

    return appRoutes.folder + queryString;
  }

  throw new Error("context error");
};

const parseQueryString = (queryString: string): MetaDataInput | undefined => {
  const params = new URLSearchParams(queryString);
  const tags = params.getAll("tags");
  const attributes = params.getAll("attributes").map((elem) => elem.split(","));

  return tags.length || attributes.length
    ? {
        tags: params.getAll("tags"),
        attributes: params.getAll("attributes").map((elem) => elem.split(",")),
      }
    : undefined;
};

export const getId = (pathname: string) =>
  pathname.replace(pathPrefixesRegExp, "");

export const getParent = (folderName: string) => {
  const parts = folderName.split("/");

  return parts.length === 2 ? "/" : parts.slice(0, -1).join("/");
};

export const getVariables = ({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}): SlidesVariables => {
  return {
    id: getId(pathname),
    metaDataInput: parseQueryString(search),
  };
};
