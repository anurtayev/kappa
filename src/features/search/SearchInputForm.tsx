import { Attributes } from "features/attributes";
import { ElemBox, ExistingItemsContainer } from "features/meta/styles";
import { Tags } from "features/tags";
import { Field, FieldArray, Formik } from "formik";
import {
  AttributeSortTerm,
  AttributeValueInput,
  Characters,
  FormBrick,
  InputType,
  MetaDataInput,
  Scalars,
  SearchInput,
  SmallButton,
  SortOrder,
  useGetAllTagsAndAttributesQuery,
} from "lib";
import { array, mixed, object, string, ValidationError } from "yup";
import { ButtonContainer, FlexForm, SubmitButton } from "./styles";

const tagSchema = string().trim().required();

const attributeSchema = object({
  attribute: object({
    name: string().trim().required(),
    type: mixed().oneOf([InputType.String, InputType.Number]),
  }),
  value: string(),
});

const sorterSchema = object({
  attribute: string().trim().required(),
  sortOrder: mixed().oneOf([SortOrder.Asc, SortOrder.Desc]),
});

const validationSchema = object({
  filter: object({
    attributes: array().of(attributeSchema),
    tags: array().of(tagSchema),
  }),
  sorter: array().of(sorterSchema),
}).test(
  "global-test",
  "",
  ({ filter: { attributes, tags } }) =>
    !!attributes?.length ||
    !!tags?.length ||
    new ValidationError("at least one filter must be present", "", "filter")
);

type SearchInputFormType = {
  filter: {
    attributes: Array<AttributeValueInput>;
    tags: Array<Scalars["String"]>;
  };
  sorter: Array<AttributeSortTerm>;
  tagInput: string;
  attributeInput: AttributeValueInput;
  sortInput: AttributeSortTerm;
};

type SearchInputFormParams = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInput>>;
  searchInput: SearchInput;
};

const attributeInputInitValue: AttributeValueInput = {
  attribute: { name: "", type: InputType.String },
  value: "",
};

const sortInputInitValue: AttributeSortTerm = {
  attribute: "",
  sortOrder: SortOrder.Asc,
};

export const SearchInputForm = ({
  searchInput,
  setSearchInput,
}: SearchInputFormParams) => {
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
          attributes: searchInput.filter.attributes || [],
          tags: searchInput.filter.tags || [],
        },
        sorter: searchInput.sorter || [],
        tagInput: "",
        attributeInput: {
          attribute: { name: "", type: InputType.String },
          value: "",
        },
        sortInput: { attribute: "", sortOrder: SortOrder.Asc },
      }}
      onSubmit={(
        { filter: { attributes, tags }, sorter },
        { setSubmitting }
      ) => {
        setSearchInput({
          filter: {
            ...(attributes.length ? { attributes } : {}),
            ...(tags.length ? { tags } : {}),
          },
          ...(sorter.length ? { sorter } : {}),
        });
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({
        values: {
          filter: { attributes, tags },
          sorter,
          attributeInput,
          tagInput,
          sortInput,
        },
        isSubmitting,
        setFieldValue,
        errors,
      }) => {
        return (
          <FlexForm>
            <div>
              {errors.filter &&
                typeof errors.filter === "string" &&
                errors.filter}

              <p>filter</p>

              <p>tags</p>
              {errors.filter?.tags && JSON.stringify(errors.filter?.tags)}
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

                    <Field name="tagInput" autoComplete="off" />
                    <button
                      type="button"
                      onClick={() => setFieldValue("tagInput", "")}
                    >
                      {Characters.multiply}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (await tagSchema.isValid(tagInput)) {
                          push(tagInput);
                          setFieldValue("tagInput", "");
                        }
                      }}
                    >
                      {Characters.check}
                    </button>

                    <Tags
                      tags={availableTags
                        ?.filter(
                          (availableTag) =>
                            !tags.includes(availableTag) &&
                            availableTag.startsWith(tagInput) &&
                            availableTag !== tagInput
                        )
                        .sort()}
                      onClick={(tag) => push(tag)}
                    />
                  </>
                )}
              />

              <p>attributes</p>
              {JSON.stringify(errors.filter?.attributes)}
              <FieldArray
                name="filter.attributes"
                render={({ remove, push }) => (
                  <>
                    <ExistingItemsContainer>
                      {attributes.map((attributeValueInput, index) => (
                        <FormBrick key={index}>
                          <ElemBox>
                            {attributeValueInput.attribute.name}
                          </ElemBox>
                          <ElemBox>{attributeValueInput.value}</ElemBox>
                          <SmallButton onClick={() => remove(index)}>
                            {Characters.multiply}
                          </SmallButton>
                        </FormBrick>
                      ))}
                    </ExistingItemsContainer>

                    <Field name="attributeInput.attribute.name" />
                    <Field name="attributeInput.attribute.type" as="select">
                      <option value={InputType.String}>
                        {InputType.String}
                      </option>
                      <option value={InputType.Number}>
                        {InputType.Number}
                      </option>
                    </Field>
                    <Field name="attributeInput.value" />
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("attributeInput", attributeInputInitValue)
                      }
                    >
                      {Characters.multiply}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (await attributeSchema.isValid(attributeInput)) {
                          push(attributeInput);
                          setFieldValue(
                            "attributeInput",
                            attributeInputInitValue
                          );
                        }
                      }}
                    >
                      {Characters.check}
                    </button>

                    <Attributes
                      attributes={availableAttributes
                        ?.filter(
                          (availableAttribute) =>
                            !attributes.find(
                              (attributeValueInput: AttributeValueInput) =>
                                attributeValueInput.attribute.name ===
                                availableAttribute.name
                            ) &&
                            availableAttribute.name.includes(
                              attributeInput.attribute.name
                            ) &&
                            availableAttribute.name !==
                              attributeInput.attribute.name
                        )
                        .sort()}
                      onClick={(attribute) =>
                        setFieldValue("attributeInput", {
                          attribute,
                          value: "",
                        })
                      }
                    />
                  </>
                )}
              />

              <p>sorter</p>
              {JSON.stringify(errors.sorter)}
              <FieldArray
                name="sorter"
                render={({ remove, push }) => (
                  <>
                    <ExistingItemsContainer>
                      {sorter.map((attributeSortTerm, index) => (
                        <FormBrick key={index}>
                          <ElemBox>{attributeSortTerm.attribute}</ElemBox>
                          <ElemBox>{attributeSortTerm.sortOrder}</ElemBox>
                          <SmallButton onClick={() => remove(index)}>
                            {Characters.multiply}
                          </SmallButton>
                        </FormBrick>
                      ))}
                    </ExistingItemsContainer>

                    <Field name="sortInput.attribute" />
                    <Field name="sortInput.sortOrder" as="select">
                      <option value={SortOrder.Asc}>{SortOrder.Asc}</option>
                      <option value={SortOrder.Desc}>{SortOrder.Desc}</option>
                    </Field>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("sortInput", sortInputInitValue)
                      }
                    >
                      {Characters.multiply}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (await sorterSchema.isValid(sortInput)) {
                          push(sortInput);
                          setFieldValue("sortInput", sortInputInitValue);
                        }
                      }}
                    >
                      {Characters.check}
                    </button>

                    <Attributes
                      attributes={availableAttributes
                        ?.filter(
                          (availableAttribute) =>
                            !sorter.find(
                              (existingAttributeSortTerm) =>
                                existingAttributeSortTerm.attribute ===
                                availableAttribute.name
                            )
                        )
                        .sort()}
                      onClick={(attribute) =>
                        setFieldValue("sortInput", {
                          attribute: attribute.name,
                          sortOrder: sortInput.sortOrder,
                        })
                      }
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
        );
      }}
    </Formik>
  );
};
