import React, { useEffect, useState } from "react";
import AdminModal from "../AdminModal";
import categoryStyle from "../../Style/common.module.scss";
import CategoryForm from "./CategoryForm";
import Loader from "../common/Loader";
import DeletePrompt from "../common/DeletePrompt";
import { useRouter } from "next/router";
import CategoryJson from "../../JSON/dummyCategory.json";
import AdminPagination from "../common/AdminPagination";

export type ErrorType = {
  [key: string]: string;
};

export type CategoryType = {
  catId?: string;
  name: string;
  description: string;
  priority: number;
  image: string;
  createdAt?: Date;
  courses: string[];
};

export interface ICategoryProps {
  type: "mainCategory";
}

export const initialCategoryData: CategoryType = {
  name: "",
  description: "",
  priority: 0,
  image: "",
  courses: [],
};

const Category: React.FC<ICategoryProps> = (props) => {
  const imageRef = React.useRef(null);
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subCategories, setSubCategories] = useState<CategoryType[]>([]);
  const [editItem, setEditItem] = useState<CategoryType>(initialCategoryData);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<CategoryType>(
    {} as CategoryType
  );
  const [limit, _setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const data = categories;
  let pages = Math.ceil(data.length / limit);

  /* --------------------------------- Methods -------------------------------- */

  const handleSubmit = async (category: CategoryType) => {
    console.log();
  };

  const handleDelete = async () => {};

  const handleDown = async (data: CategoryType) => {};

  const handleUp = async (data: CategoryType) => {};

  const handleUpdate = async () => {};

  useEffect(() => {
    setCategories(CategoryJson);
  }, []);

  /* ------------------------------- UseEffects ------------------------------- */

  return (
    <div className={categoryStyle.mainContainer}>
      <div className={categoryStyle.container}>
        <div className={categoryStyle.newAddMobile}>
          <button
            onClick={() => setModal(true)}
            className={categoryStyle.addButton}
          >
            + カテゴリ
          </button>
        </div>
        <div className={categoryStyle.allData}>
          <h3>Category List</h3>

          {loader && (
            <div className={categoryStyle.tableLoader}>
              <Loader size="50px" thickness="3px" />
            </div>
          )}

          {loader === false && (
            <div className={categoryStyle.tableData}>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th className={categoryStyle.action}>Priority</th>
                    <th className={categoryStyle.action}>Action</th>
                    {props.type === "mainCategory" ? (
                      <th className={categoryStyle.action}>Course List</th>
                    ) : (
                      ""
                    )}
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data
                    .slice(page * limit, (page + 1) * limit)
                    .map((category, index) => {
                      return (
                        <tr key={index} style={{borderBottom: '1px solid gray'}}>
                          <td>{category.name}</td>
                          <td>{category.priority}</td>
                          <td className={categoryStyle.bodyData}>
                            <button
                              data-test-id="category-edit"
                              onClick={() => {
                                setModal(true);
                                setEditItem(category);
                              }}
                              className={`${categoryStyle.addButton} ${categoryStyle.edit}`}
                            >
                              Edit
                            </button>
                            <button
                              data-test-id="category-delete"
                              onClick={(_event) => {
                                setDeleteItem(category);
                                setDeleteModal(true);
                              }}
                              className={`${categoryStyle.addButton} ${categoryStyle.delete}`}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => router.push(``)}
                              className={categoryStyle.addButton}
                            >
                              Course List
                            </button>
                          </td>
                          <td>
                            <div className={categoryStyle.arrowContainer}>
                              {index > 0 && (
                                <div
                                  className={categoryStyle.upArrow}
                                  onClick={() => handleUp(category)}
                                >
                                  ↑
                                </div>
                              )}
                              {`    `}
                              {index < categories.length - 1 && (
                                <div
                                  className={categoryStyle.downArrow}
                                  onClick={() => handleDown(category)}
                                >
                                  ↓
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <div className={categoryStyle.pagination}>
                <AdminPagination
                  setPage={setPage}
                  currentPage={page}
                  pages={pages}
                />
              </div>

              <div className={categoryStyle.newItem}>
                <button
                  data-test-id="add-category-btn"
                  onClick={() => setModal(true)}
                  className={categoryStyle.addButton}
                >
                  ＋ Create New
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {modal && (
        <AdminModal
          headerText="Create New Category"
          open={modal}
          onClose={() => {
            setModal(false);
            setEditItem(initialCategoryData as CategoryType);
          }}
        >
          <CategoryForm
            type={props.type}
            subCategories={categories}
            key={editItem.catId}
            category={editItem}
            handleSubmit={handleSubmit}
            ref={imageRef}
            setModal={setModal}
            allSubCategories={subCategories}
          />
        </AdminModal>
      )}
      {deleteModal && (
        <AdminModal
          headerText=""
          open={deleteModal}
          onClose={() => {
            setDeleteModal(false);
          }}
          delete
        >
          <DeletePrompt
            setDeleteModal={setDeleteModal}
            handleDeleteConfirm={handleDelete}
          />
        </AdminModal>
      )}
    </div>
  );
};

export default Category;
