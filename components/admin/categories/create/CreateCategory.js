import { formToJSON } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { GET, POST } from "../../../../api/axios/AxiosRepository";
import { useDispatch } from "react-redux";
import {
  addModelToItemsListReducer,
  removeModelsFromItemsListReducer,
  showCreateModalReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";

const CreateCategory = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    description: Yup.string().max(500, "500"),
    categoryName: Yup.string().required("*"),
    imageUrl: Yup.string().max(2000, "2000"),
    imageAlter: Yup.string(),
  });

  const formFields = {
    description: "",
    categoryName: "",
    imageUrl: "",
    imageAlter: "",
  };

  const createCategoryHandler = async (values) => {
    await POST("categories/create", values).then((response) => {
      if (response.data.value.success === true) {
        dispatch(showCreateModalReducer(false));
      } else {
        alert(`${response.data.value.message}`);
      }
    });
  };

  return (
    <div className="top">
      <Formik
        onSubmit={createCategoryHandler}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={formFields}
        validationSchema={validationSchema}
      >
        <Form method="post">
          <div className="form-group top">
            <label htmlFor="categoryName" className="form-label top">
              نام دسته بندی
            </label>
            <Field
              type="text"
              className="form-control top"
              name="categoryName"
              id="categoryName"
            />
            <ErrorMessage name="categoryName" />
          </div>
          <div className="form-group top">
            <label htmlFor="description" className="form-label top">
              توضیحات
            </label>
            <Field
              type="text"
              className="form-control top"
              name="description"
              id="description"
            />
            <ErrorMessage name="description" />
          </div>
          <div className="form-group top">
            <label htmlFor="imageUrl" className="form-label top">
              عکس
            </label>
            <Field
              type="text"
              className="form-control top"
              name="imageUrl"
              id="imageUrl"
            />
            <ErrorMessage name="imageUrl" />
          </div>
          <div className="form-group top">
            <label htmlFor="imageAlter" className="form-label top">
              متن جایگزین عکس
            </label>
            <Field
              type="text"
              className="form-control top"
              name="imageAlter"
              id="imageAlter"
            />
            <ErrorMessage name="imageAlter" />
          </div>
          <div className="form-group top">
            <button type="submit" className="btn btn-success top">
              ثبت
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCategory;
