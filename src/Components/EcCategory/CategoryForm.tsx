import React, { useState } from "react";
import PlainTextInput from "../common/Inputs/PlainTextInput";
import categoryStyle from "../../Style/common.module.scss";
import ImageUpload from "../common/ImageUpload";
import { CategoryType, ErrorType, initialCategoryData } from "./Category";

type CategoryFormType = {
  category: CategoryType;
  handleSubmit: (category: CategoryType) => void;
  subCategories: CategoryType[];
  allSubCategories: CategoryType[];
  type: "mainCategory";
  setModal: (modal: boolean) => void;
};

function CategoryFormDetails(props: CategoryFormType, ref: any) {
  const {
    category: cat,
    handleSubmit,
    subCategories,
    type,
    setModal,
    allSubCategories,
  } = props;
  const [category, setCategory] = useState<CategoryType>(cat);
  const [uploading, setUploading] = React.useState(false);

  const [categoryError, setCategoryError] = useState({
    ...initialCategoryData,
    priority: "",
  });

  /* --------------------------------- Methods -------------------------------- */

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCategoryError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateFields = ["name", "description"];

  const isValid = () => {
    const error: ErrorType = {};
    let isValid = true;
    Object.keys(category)
      .filter((key) => validateFields.includes(key))
      .forEach((key) => {
        if (!category[key as keyof typeof category]) {
          error[key] = `Required`;
          isValid = false;
        }
        if (key === "priority" && category[key] <= 0) {
          error[key] = `Number should not less then 0`;
          isValid = false;
        }
      });
    setCategoryError((prev) => ({
      ...prev,
      ...error,
    }));
    return isValid;
  };

  const onSubmit = () => {
    if (uploading) return;
    if (isValid()) {
      if (type === "mainCategory") {
        if (!category.image) {
          setCategoryError((prev) => ({
            ...prev,
            image: "画像フィールドが必要です",
          }));
          return;
        }
        handleSubmit({ ...category });
        setCategory(initialCategoryData);
        setModal(false);
      } else {
        handleSubmit(category);
        setCategory(initialCategoryData);
        setModal(false);
      }
    }
  };

  /* ------------------------------- UseEffects ------------------------------- */

  return (
    <>
      <div className={categoryStyle.inputContainer}>
        <div className={categoryStyle.formData}>
          <PlainTextInput
            label="Category"
            name="name"
            placeholder=""
            type="text"
            onChange={handleInputChange}
            error={categoryError.name}
            value={category.name}
            required
          />
        </div>

        <div className={categoryStyle.formData}>
          <PlainTextInput
            label="Description"
            name="description"
            placeholder=""
            type="textarea"
            onChange={handleInputChange}
            error={categoryError.description}
            value={category.description}
          />
        </div>

        <div className={categoryStyle.formData}>
          <PlainTextInput
            label="Priority"
            name="priority"
            placeholder=""
            type="number"
            onChange={handleInputChange}
            error={categoryError.priority}
            value={category.priority || ""}
            required
            readonly
          />
        </div>

        {type === "mainCategory" && (
          <div className={categoryStyle.formData}>
            <div className={categoryStyle.inputContent}>
              {/* <ImageUpload
                uploadType="single"
                crop={true}
                error={categoryError.image}
                resetError={() => {
                  setCategoryError((prev) => ({
                    ...prev,
                    image: "",
                  }));
                }}
                getImage={(images) => {
                  setCategory((prev) => ({
                    ...prev,
                    image: images[0]?.path,
                  }));
                }}
                getUploadStatus={(isUploading) => {
                  setUploading(isUploading);
                }}
                dir="categoreis"
                images={
                  category.image ? [{ path: category.image, main: false }] : []
                }
                ratio={2 / 1}
                required
              /> */}
            </div>
          </div>
        )}

        <div className={categoryStyle.buttonContainer}>
          <button
            data-test-id="save-category-btn"
            disabled={uploading ? true : false}
            onClick={onSubmit}
            className={categoryStyle.submitButton}
          >
            {cat.name ? "Edit" : "Create"}
          </button>
        </div>
      </div>
    </>
  );
}

const CategoryForm = React.forwardRef(CategoryFormDetails);
export default CategoryForm;
