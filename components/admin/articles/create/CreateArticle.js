import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import * as Yup from "yup";
import { GET, POST } from "../../../../api/axios/AxiosRepository";
import { useDispatch, useSelector } from "react-redux";
import {
  addModelToItemsListReducer,
  removeModelFromItemReducer,
  removeModelsFromItemsListReducer,
  showCreateModalReducer,
  showModalReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";
import { useRouter } from "next/router";

const CreateArticle = (props) => {
  const dispatch = useDispatch();
  const router = useRouter()

  const validationSchema = Yup.object({
    categoryID: Yup.number().required("*"),
    title: Yup.string().required("*"),
    text: Yup.string().required("*"),
    description: Yup.string(),
    videoUrl: Yup.string(),
    videoDescription: Yup.string(),
    audioUrl: Yup.string(),
    audioDescription: Yup.string(),
    rate: Yup.number(),
  });

  const formFields = {
    categoryID: -1,
    title: "",
    text: "",
    description: "",
    videoUrl: "",
    videoDescription: "",
    audioUrl: "",
    audioDescription: "",
    rate: 1,
  };


  const createArticle = async (body) => {
    await POST("articles/create", body).then((response) => {
      if (response.data.value.success === true) {
        GET("articles").then((response) => {
          dispatch(removeModelsFromItemsListReducer())
          dispatch(addModelToItemsListReducer(response.data.value));
          router.push('/admin/articles')
        });
        dispatch(showCreateModalReducer(false));
        alert(response.data.value.message);
      } else {
        alert(`${response.data.value.message} : ${response.data.value.errors}`);
      }
    });
  };


  const createArticleHanlder = (values) => {
    createArticle(values);
  };

  return (
    <div>
      <Formik
        onSubmit={createArticleHanlder}
        validationSchema={validationSchema}
        initialValues={formFields}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form method="post">
          <div className="form-group top">
            <label htmlFor="categoryID" className="form-label">
              دسته بندی
            </label>
            <Field
              as="select"
              type="number"
              className="form-select"
              name="categoryID"
              id="categoryID"
            >
              <option value={-1}></option>
              {props.categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage name="categoryID" />
          </div>

          <div className="from-group">
            <label htmlFor="title" className="form-label">
              عنوان
            </label>
            <Field
              type="text"
              className="form-control"
              id="title"
              name="title"
            />
            <ErrorMessage name="title" />
          </div>

          <div className="from-group">
            <label htmlFor="text" className="form-label">
              متن
            </label>
            <Field
              as="textArea"
              type="text"
              className="form-control"
              id="text"
              name="text"
            />
            <ErrorMessage name="text" />
          </div>

          <div className="from-group">
            <label htmlFor="description" className="form-label">
              توضیحات
            </label>
            <Field
              as="textArea"
              type="text"
              className="form-control"
              id="description"
              name="description"
            />
            <ErrorMessage name="description" />
          </div>

          <div className="from-group">
            <label htmlFor="videoUrl" className="form-label">
              آدرس ویدئو
            </label>
            <Field
              type="text"
              className="form-control"
              id="videoUrl"
              name="videoUrl"
            />
            <ErrorMessage name="videoUrl" />
          </div>

          <div className="from-group">
            <label htmlFor="videoDescription" className="form-label">
              توضیحات ویدئو
            </label>
            <Field
              as="textArea"
              type="text"
              className="form-control"
              id="videoDescription"
              name="videoDescription"
            />
            <ErrorMessage name="videoDescription" />
          </div>

          <div className="from-group">
            <label htmlFor="audioUrl" className="form-label">
              آدرس فایل صوتی
            </label>
            <Field
              type="text"
              className="form-control"
              id="audioUrl"
              name="audioUrl"
            />
            <ErrorMessage name="audioUrl" />
          </div>

          <div className="from-group">
            <label htmlFor="audioDescription" className="form-label">
              توضیحات فایل صوتی
            </label>
            <Field
              as="textArea"
              type="text"
              className="form-control"
              id="audioDescription"
              name="audioDescription"
            />
            <ErrorMessage name="audioDescription" />
          </div>

          <div className="form-gruop">
            <label htmlFor="rate" className="form-label">
              امتیاز
            </label>
            <Field
              as="select"
              type="number"
              className="form-select"
              id="rate"
              name="rate"
            >
              <option value={1}></option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Field>
            <ErrorMessage name="rate" />
          </div>

          <div className="form-group top">
            <button type="submit" className="btn btn-success">
              ثبت
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateArticle;
