import {
  ElemBox,
  ExistingItemsContainer,
  StyledField,
} from "features/metaContainer/metaDataForm/styles";
import { Tags } from "features/tags";
import { FieldArray, Formik } from "formik";
import {
  AttributeSortTerm,
  AttributeValueInput,
  Characters,
  FormBrick,
  Scalars,
  SearchInput,
  SmallButton,
  SortOrder,
  useGetAllTagsAndAttributesQuery,
} from "lib";
import { ButtonContainer, FlexForm, SubmitButton } from "./styles";

type SearchInputFormType = {
  filter: {
    attributes: Array<AttributeValueInput>;
    tags: Array<Scalars["String"]>;
  };
  searchAttributeValueStr: "";
  tagNameFilter: "";

  sorter: Array<AttributeSortTerm>;
  searchSortOrder: SortOrder;
  attributeNameFilter: "";
};

type SearchInputFormParams = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInput>>;
};

export const SearchInputForm = ({ setSearchInput }: SearchInputFormParams) => {
  const { data, loading, error } = useGetAllTagsAndAttributesQuery({
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error}</p>;

  const availableTags = data?.tags;
  const availableAttributes = data?.attributes;

  return (
    <Formik<SearchInputFormType>
      initialValues={{
        filter: {
          attributes: [],
          tags: [],
        },
        searchAttributeValueStr: "",
        tagNameFilter: "",
        sorter: [],
        searchSortOrder: SortOrder.Asc,
        attributeNameFilter: "",
      }}
      onSubmit={({ filter, sorter }, helpers) => {
        setSearchInput({ filter, sorter });
      }}
    >
      {({
        values: {
          filter: { attributes, tags },
          searchAttributeValueStr,
          tagNameFilter,
          sorter,
          searchSortOrder,
          attributeNameFilter,
        },
        isSubmitting,
        setFieldValue,
      }) => (
        <FlexForm>
          <div>
            <p>sorter</p>
            <p>tags</p>
            <FieldArray
              name="filter.tags"
              render={({ remove, push }) => (
                <>
                  <ExistingItemsContainer>
                    {tags &&
                      tags.map((tag: string, index: number) => (
                        <FormBrick key={index}>
                          <ElemBox>{tag}</ElemBox>
                          <SmallButton onClick={() => remove(index)}>
                            {Characters.multiply}
                          </SmallButton>
                        </FormBrick>
                      ))}
                  </ExistingItemsContainer>

                  <StyledField name="tagNameFilter" autoComplete="off" />
                  <Tags
                    currentValue={tagNameFilter}
                    selectedTags={tags}
                    availableTags={availableTags}
                    setNewValue={(selectedValue: string) => push(selectedValue)}
                  />
                </>
              )}
            />
          </div>

          <ButtonContainer>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Search
            </SubmitButton>
          </ButtonContainer>
        </FlexForm>
      )}
    </Formik>
  );
};
