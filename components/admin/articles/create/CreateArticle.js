import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import TextField from "../../../../ui/formUi/text/TextField";
import SelectField from "../../../../ui/formUi/select/SelectField";
import { Field } from "formik";
import Yup from "../../../../framework/yup/Yup";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";

const CreateArticle = React.memo((props) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    categoryID: Yup.number().required("*").moreThan(0, "*"),
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
    categoryID: 0,
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

    await CrudRepository.create("articles/create", body)
      .then((response) => {
        if (response.data.value.success === true) {
          CrudRepository.getAll("articles").then((results) => {
            alert(`${response.data.value.message}`);
            dispatch(removeFromItemsReducer());
            dispatch(addToItemsReducer(results.data.value));
          });
        } else {
          alert(
            `${response.data.value.message} : ${response.data.value.errors}`
          );
        }
      })

  };

  const createArticleHandler = (values) => {
    createArticle(values);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={6} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={createArticleHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="post"
          >
            <SelectField name="categoryID" label="انتخاب دسته بندی">
              {props.categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </SelectField>

            <TextField name="title" label="عنوان" />

            <TextField name="text" label="متن" />

            <TextField name="description" label="توضیحات" />

            <TextField name="videoUrl" label="ویدئو" />

            <TextField name="videoDescription" label="جایگزین ویدئو" />

            <TextField name="audioUrl" label="فایل صوتی" />

            <TextField name="audioDescription" label="جایگزین فایل صوتی" />

            <TextField name="rate" label="امتیاز" />

            <FormButton variant="btn btn-success" type="submit">
              ثبت
            </FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
});

export default CreateArticle;
