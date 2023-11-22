import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import { Field } from "formik";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import Yup from "../../../../framework/yup/Yup";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import { addToItemsReducer, removeFromItemsReducer } from "../../../../redux/features/admin/AdminSlice";

const EditKeyword = (props) => {

    const dispatch = useDispatch()

  const validationSchema = Yup.object({
    name: Yup.string().required("*"),
    text: Yup.string().required("*"),
    description: Yup.string(),
  });

  const formFields = {
    id:props.data.id,
    name: props.data.name,
    text: props.data.text,
    description: props.data.description,
  };

  const editKeyword = async (body) => {
    await CrudRepository.edit("keywords/edit", body).then((response) => {
      if (response.data.success === true) {
        dispatch(removeFromItemsReducer())
        CrudRepository.getAll('keywords')
        .then(response=>{
            dispatch(addToItemsReducer(response.data))
        })
      } else {
        alert(`${response.data.errors} : ${response.data.errors}`);
      }
    });
  };

  const editKeywordHandler = (values) => {
    editKeyword(values);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={4} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={editKeywordHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="put"
          >
            <Field type="hidden" name="id" />

            <TextField name="name" label="نام" />
            <TextField name="text" label="متن" />
            <TextField name="description" label="توضیحات" />

            <FormButton variant="warning">ویرایش</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditKeyword;
