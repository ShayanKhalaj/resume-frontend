import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { memo, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { GET, PUT } from "../../../../api/axios/AxiosRepository";
import { useDispatch, useSelector } from "react-redux";
import {
  addModelToItemReducer,
  addModelToItemsListReducer,
  removeModelFromItemReducer,
  removeModelsFromItemsListReducer,
  showEditModalReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";
import { Button, Modal } from "react-bootstrap";

const EditArticle = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.crud.editModal);

  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(selector);

  const validationSchema = Yup.object({
    id: Yup.number().required("*"),
    categoryID: Yup.number().required("*"),
    title: Yup.string().required("*"),
    text: Yup.string().required("*"),
    description: Yup.string().nullable(),
    videoUrl: Yup.string().nullable(),
    videoDescription: Yup.string().nullable(),
    audioUrl: Yup.string().nullable(),
    audioDescription: Yup.string().nullable(),
  });

  const formFields = {
    id: props.data.id,
    categoryID: props.data.categoryID,
    title: props.data.title,
    text: props.data.text,
    description: props.data.description,
    videoUrl: props.data.videoUrl,
    videoDescription: props.data.videoDescription,
    audioUrl: props.data.audioUrl,
    audioDescription: props.data.audioDescription,
  };

  const inflateCategories = async () => {
    await GET("categories").then((response) => {
      setCategories(response.data.value);
    });
  };

  useMemo(() => {
    inflateCategories();
  }, []);

  const handleClose = () => {
    dispatch(showEditModalReducer(false));
    setShow(false);
  };

  const handleShow = () => {
    dispatch(showEditModalReducer(true));
    setShow(true);
  };

  const editArticleHandler = async (values) => {
    await PUT(`articles/edit`, values).then((response) => {
      if (response.data.value.success === true) {
        GET("articles").then((result) => {
          dispatch(removeModelsFromItemsListReducer());
          dispatch(addModelToItemsListReducer(result.data.value));
          setShow(false)
          handleClose()
        });
        alert(response.data.value.message);
      } else {
        alert(`${response.data.value.message}:${response.data.value.error}`);
      }
    });
  };

  return (
    <div>
      <Button variant="warning" onClick={handleShow} type="button">
        ویرایش
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>ویرایش مقاله</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={editArticleHandler}
            validationSchema={validationSchema}
            initialValues={formFields}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form method="put">
              <Field type="hidden" as="hidden" name="id" />
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
                  {categories.map((item) => {
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
                  type="text"
                  className="form-control"
                  id="audioDescription"
                  name="audioDescription"
                />
                <ErrorMessage name="audioDescription" />
              </div>

              <div className="form-group top">
                <button type="submit" className="btn btn-warning">
                  ویرایش
                </button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditArticle;
