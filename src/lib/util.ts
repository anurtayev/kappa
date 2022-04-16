import {
  MetaData,
  Scalars,
  Attribute,
  InputType,
  MetaDataInput,
  AttributeValueInput,
} from "@aspan/sigma";

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
}

export type NavItem = {
  navFn: () => void;
  icon: Characters;
  title: string;
};

export type NavItems = Array<NavItem>;

export const isFolder = (id: string): boolean => id.slice(-1) === "/";

export type AvailableMetaData = {
  attributes: Array<Attribute>;
  tags: Array<Scalars["String"]>;
};

export interface FormikMetaData {
  metaDataInput: RequiredMetaData;
  availableMetaData: AvailableMetaData;
  newTag: string;
  newKey: string;
  newValueStr: string;
  newType: InputType;
}

export type RequiredMetaData = {
  attributes: Array<AttributeValueInput>;
  tags: Array<string>;
};

export const convertMetaDataToInput = (
  input: MetaData | null | undefined
): RequiredMetaData => {
  if (input === undefined || input === null)
    return { tags: [], attributes: [] };
  return {
    tags: input.tags || [],
    attributes:
      (input.attributes &&
        input.attributes?.reduce((previousValue, currentValue) => {
          return [
            ...previousValue,
            {
              value: currentValue.value,
              attribute: {
                name: currentValue.attribute.name,
                type: currentValue.attribute.type,
              },
            },
          ];
        }, [] as Array<AttributeValueInput>)) ||
      [],
  };
};

export type MetaDataInputOrUndefined = MetaDataInput | undefined;
export const cleanseMetaDataInput = ({
  tags,
  attributes,
}: RequiredMetaData): MetaDataInputOrUndefined => {
  if (!tags.length && !attributes.length) return undefined;
  else
    return {
      tags: (tags.length && tags) || undefined,
      attributes: (attributes.length && attributes) || undefined,
    };
};
