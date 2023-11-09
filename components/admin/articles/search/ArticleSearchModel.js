import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { GET, POST } from "../../../../api/axios/AxiosRepository";
import ArticlesListItems from "./ArticlesListItems";
import { Col, Container, Row } from "react-bootstrap";
import CreateArticle from "../create/CreateArticle";
import { useDispatch, useSelector } from "react-redux";
import {
  addModelToItemsListReducer,
  removeModelsFromItemsListReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";
import CreateModal from "../../../framework/admin/modal/CreateModal";

const ArticleSearchModel = () => {

  
  const dispatch = useDispatch();
  const articlesSearchResults = useSelector((state) => state.crud.items);
  const createModal = useSelector((state)=>state.crud.createModal)
  const editModal = useSelector((state)=>state.crud.editModal)
  
  const [categoriesDropDown, setCategoriesDropDown] = useState([]);
  const [articlesDropDown, setArticlesDropDown] = useState([]);

  const formFields = {
    categoryID: -1,
    id: -1,
    title: "",
    rate: -1,
  };

  const inflateCategories = async () => {
    await GET("categories").then((response) => {
      setCategoriesDropDown(response.data.value);
    });
  };

  const inflateArticles = async () => {
    await GET("articles").then((response) => {
      setArticlesDropDown(response.data.value);
    });
  };

  useMemo(async () => {
    await GET("articles").then((response) => {
      dispatch(removeModelsFromItemsListReducer());
      dispatch(addModelToItemsListReducer(response.data.value))
      inflateArticles();
      inflateCategories();
    });
  }, [createModal||editModal]);

  const searchArticleHandler = async (values) => {
    await POST("articles/search", values)
      .then((response) => {
        dispatch(removeModelsFromItemsListReducer())
        dispatch(addModelToItemsListReducer(response.data.value.results))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container className="top">
        <Row className="justify-content-center ">
          <Col xxl={4} xl={4} md={8} lg={8} sm={12} sx={12}>
            <Formik onSubmit={searchArticleHandler} initialValues={formFields}>
              <Form>
                <div className="form-group top">
                  <lable className="form-label" htmlFor="categoryID">
                    انتخاب دسته بندی
                  </lable>
                  <Field
                    type="number"
                    name="categoryID"
                    className="form-select top"
                    id="categoryID"
                    as="select"
                  >
                    <option value={-1}></option>
                    {categoriesDropDown.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="categoryID" />
                </div>

                <div className="form-group top">
                  <lable className="form-label" htmlFor="id">
                    انتخاب مقاله
                  </lable>
                  <Field
                    type="number"
                    name="id"
                    className="form-select top"
                    id="id"
                    as="select"
                  >
                    <option value={-1}></option>
                    {articlesDropDown.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="id" />
                </div>

                <div className="form-group top">
                  <lable className="form-label" htmlFor="title">
                    عنوان
                  </lable>
                  <Field
                    type="text"
                    name="title"
                    className="form-control top"
                    id="title"
                  />
                  <ErrorMessage name="title" />
                </div>

                <div className="form-group top">
                  <lable className="form-label" htmlFor="rate">
                    امتیاز
                  </lable>
                  <Field
                    type="number"
                    name="rate"
                    className="form-select top"
                    id="rate"
                    as="select"
                  >
                    <option value={-1}></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Field>
                  <ErrorMessage name="rate" />
                </div>

                <div className="form-gruop top flex">
                  <button
                    type="submit"
                    className="btn btn-primary top left right bottom"
                  >
                    جستجو
                  </button>
                  <CreateModal
                    className="left right top bottom"
                    variant="success"
                    modalBody={
                      <CreateArticle categories={categoriesDropDown} />
                    }
                    modalTitle="ثبت مقاله جدید"
                    modalFooter={false}
                    buttonTitle="ثبت مقاله جدید"
                  />
                </div>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>

        <ArticlesListItems/>
    </div>
  );
};

export default ArticleSearchModel;
