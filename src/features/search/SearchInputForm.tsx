import {
  ElemBox,
  ExistingItemsContainer,
  StyledField,
} from "features/metaContainer/metaDataForm/styles";
import { Tags } from "features/tags";
import { Attributes } from "features/attributes";
import { AttributeSortTerms } from "./AttributeSortTerms";
import { Field, FieldArray, Formik } from "formik";
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
  attributeSortTerm: AttributeSortTerm;
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
        attributeNameFilter: "",
        sorter: [],
        attributeSortTerm: { attribute: "", sortOrder: SortOrder.Asc },
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
          attributeSortTerm,
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
                    {tags.map((tag, index) => (
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
                    tags={availableTags
                      ?.filter(
                        (availableTag) =>
                          !tags.includes(availableTag) &&
                          availableTag.startsWith(tagNameFilter) &&
                          availableTag !== tagNameFilter
                      )
                      .sort()}
                    push={push}
                  />
                </>
              )}
            />

            <p>attributes</p>
            <FieldArray
              name="filter.attributes"
              render={({ remove, push }) => (
                <>
                  <ExistingItemsContainer>
                    {attributes.map((attributeValueInput, index) => (
                      <FormBrick key={index}>
                        <ElemBox>{attributeValueInput.attribute.name}</ElemBox>
                        <SmallButton onClick={() => remove(index)}>
                          {Characters.multiply}
                        </SmallButton>
                      </FormBrick>
                    ))}
                  </ExistingItemsContainer>

                  <StyledField name="attributeNameFilter" autoComplete="off" />
                  <Attributes
                    attributes={availableAttributes
                      ?.filter(
                        (availableAttribute) =>
                          !attributes.find(
                            (attribute) =>
                              attribute.attribute.name !==
                              availableAttribute.name
                          ) &&
                          availableAttribute.name.includes(
                            attributeNameFilter
                          ) &&
                          availableAttribute.name !== attributeNameFilter
                      )
                      .sort()}
                    push={push}
                  />
                </>
              )}
            />

            <p>sorter</p>
            <FieldArray
              name="sorter"
              render={({ remove, push }) => (
                <>
                  <ExistingItemsContainer>
                    {sorter.map((attributeSortTerm, index) => (
                      <FormBrick key={index}>
                        <ElemBox>{attributeSortTerm.attribute}</ElemBox>
                        <SmallButton onClick={() => remove(index)}>
                          {Characters.multiply}
                        </SmallButton>
                      </FormBrick>
                    ))}
                  </ExistingItemsContainer>

                  <Field name="attributeSortTerm" />
                  <AttributeSortTerms
                    attributes={availableAttributes
                      ?.filter(
                        (availableAttribute) =>
                          !sorter.find(
                            (existingAttributeSortTerm) =>
                              existingAttributeSortTerm.attribute !==
                              availableAttribute.name
                          )
                      )
                      .sort()}
                    push={push}
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
