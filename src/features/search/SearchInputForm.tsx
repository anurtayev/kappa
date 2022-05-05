import {
  ElemBox,
  ExistingItemsContainer,
  StyledField,
} from "features/meta/styles";
import { Tags } from "features/tags";
import { Attributes } from "features/attributes";
import { AttributeSortTerms } from "./AttributeSortTerms";
import {
  Field,
  FieldArray,
  FieldInputProps,
  FieldMetaProps,
  Formik,
  FormikProps,
} from "formik";
import {
  AttributeInput,
  AttributeSortTerm,
  AttributeValueInput,
  Characters,
  FormBrick,
  InputType,
  Scalars,
  SearchInput,
  SmallButton,
  SortOrder,
  useGetAllTagsAndAttributesQuery,
} from "lib";
import { ButtonContainer, FlexForm, SubmitButton } from "./styles";
import { object, string, array, mixed } from "yup";

const SearchInputFormSchema = object({
  filter: object({
    attributes: array().of(
      object({
        attribute: object({
          name: string().trim().required(),
          type: mixed().oneOf([InputType.String, InputType.Number]),
        }),
        value: string(),
      })
    ),
    tags: array().of(string().trim().required()),
  }),
  sorter: array().of(
    object({
      attribute: string().trim().required(),
      sortOrder: mixed().oneOf([SortOrder.Asc, SortOrder.Desc]),
    })
  ),
});

type FieldRenderFnProps<Value> = {
  field: FieldInputProps<Value>;
  meta: FieldMetaProps<Value>;
  form: FormikProps<SearchInputFormType>;
};

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
};

const attributeInputInitValue: AttributeValueInput = {
  attribute: { name: "", type: InputType.String },
  value: "",
};

const sortInputInitValue: AttributeSortTerm = {
  attribute: "",
  sortOrder: SortOrder.Asc,
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
        sorter: [],

        attributeInput: {
          value: "",
          attribute: { name: "", type: InputType.String },
        },

        tagInput: "",

        sortInput: { attribute: "", sortOrder: SortOrder.Asc },
      }}
      onSubmit={({ filter, sorter }, {}) => {
        console.log("==> ", filter.tags, filter.attributes, sorter);

        setSearchInput({ filter, sorter });
      }}
      validationSchema={SearchInputFormSchema}
    >
      {({
        values: {
          filter: { attributes, tags },
          attributeInput,
          tagInput,
          sorter,
          sortInput,
        },
        isSubmitting,
        setFieldValue,
        errors,
      }) => (
        <FlexForm>
          <div>
            <p>sorter</p>

            <p>tags</p>
            {errors.filter?.tags}
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
                    onClick={() => {
                      push(tagInput);
                      setFieldValue("tagInput", "");
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
            <FieldArray
              name="filter.attributes"
              render={({ remove, push }) => (
                <>
                  <ExistingItemsContainer>
                    {attributes.map((attributeValueInput, index) => (
                      <FormBrick key={index}>
                        <ElemBox>{attributeValueInput.attribute.name}</ElemBox>
                        <ElemBox>{attributeValueInput.value}</ElemBox>
                        <SmallButton onClick={() => remove(index)}>
                          {Characters.multiply}
                        </SmallButton>
                      </FormBrick>
                    ))}
                  </ExistingItemsContainer>

                  <Field name="attributeInput.attribute.name" />
                  <Field name="attributeInput.attribute.type" as="select">
                    <option value={InputType.String}>{InputType.String}</option>
                    <option value={InputType.Number}>{InputType.Number}</option>
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
                    onClick={() => {
                      push(attributeInput);
                      setFieldValue("attributeInput", attributeInputInitValue);
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
                      setFieldValue("attributeInput", { attribute, value: "" })
                    }
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
                    onClick={() => {
                      push(sortInput);
                      setFieldValue("sortInput", sortInputInitValue);
                    }}
                  >
                    {Characters.check}
                  </button>

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
