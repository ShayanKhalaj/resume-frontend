import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET, POST } from "../../../../api/axios/AxiosRepository";
import {
  addModelToItemsListReducer,
  removeModelsFromItemsListReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";
import KeywordsListItems from "./KeywordsListItems";
import CreateKeyword from "../create/CreateKeyword";
import { Col, Container, Row } from "react-bootstrap";

const SearchKeyword = () => {
  const dispatch = useDispatch();
  const keywordsSelector = useSelector((state) => state.crud.items);

  const [articles, setArticles] = useState([]);
  const [keywords, setkeywords] = useState([]);

  const formFields = {
    articleID: 0,
    id: 0,
    name: "",
    text: "",
    description: "",
  };

  const infalteArticles = async () => {
    await GET("articles")
      .then((response) => {
        if (response.data.value !== undefined) {
          setArticles(response.data.value);
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

  const infalteKeywords = async () => {
    await GET("keywords")
      .then((response) => {
        setkeywords(response.data);
        dispatch(addModelToItemsListReducer(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useMemo(async () => {
    dispatch(removeModelsFromItemsListReducer());
    dispatch(addModelToItemsListReducer(response.data.value.results));
    infalteKeywords();
    infalteArticles();
  }, []);

  const searchKeywordHandler = async (values) => {
    await POST("keywords/search", values).then((response) => {
      dispatch(removeModelsFromItemsListReducer())
      dispatch(addModelToItemsListReducer(response.data.results));
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Formik
              initialValues={formFields}
              onSubmit={searchKeywordHandler}
              validateOnBlur={false}
              validateOnChange={false}
            >
              <Form>
                <div className="form-group top">
                  <label htmlFor="articleID" className="from-label top">
                    انتخاب مقاله
                  </label>
                  <Field
                    className="form-select top"
                    as="select"
                    type="select"
                    name="articleID"
                    id="articleID"
                  >
                    <option value={-1}></option>
                    {articles.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="articleID" />
                </div>

                <div className="form-group top">
                  <label htmlFor="id" className="from-label top">
                    انتخاب کلیدواژه
                  </label>
                  <Field
                    className="form-select top"
                    as="select"
                    type="select"
                    name="id"
                    id="id"
                  >
                    <option value={-1}></option>
                    {keywords.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="id" />
                </div>

                <div className="form-group top">
                  <label htmlFor="name" className="from-label top">
                    نام کلیدواژه
                  </label>
                  <Field
                    className="form-control top"
                    type="text"
                    name="name"
                    id="name"
                  />
                  <ErrorMessage name="name" />
                </div>

                <div className="form-group top">
                  <label htmlFor="text" className="from-label top">
                    متن کلیدواژه
                  </label>
                  <Field
                    className="form-control top"
                    type="text"
                    name="text"
                    id="text"
                  />
                  <ErrorMessage name="text" />
                </div>

                <div className="form-group top">
                  <label htmlFor="description" className="from-label top">
                    توضیحات
                  </label>
                  <Field
                    className="form-control top"
                    type="text"
                    name="description"
                    id="description"
                  />
                  <ErrorMessage name="description" />
                </div>

                <div className="form-group top flex">
                  <button
                    type="submit"
                    className="btn btn-primary top right left bottom"
                  >
                    جستجو
                  </button>
                  <CreateKeyword articles={articles} />
                </div>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
      <KeywordsListItems />
    </>
  );
};

export default SearchKeyword;
