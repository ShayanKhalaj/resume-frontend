import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import { ErrorMessage, Field } from "formik";
import TextField from "../../../../ui/formUi/text/TextField";
import FieldErrorMessage from "../../../../ui/formUi/error/FieldErrorMessage";
import Yup from '../../../../framework/yup/Yup'
import FormButton from "../../../../ui/formUi/button/FormButton";
import SelectField from "../../../../ui/formUi/select/SelectField";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";

const EditArticle = (props) => {

    // let [infalteCategoriesDropDown, setInfalteCategoriesDropDown] = useState([])

    const validationSchema = Yup.object({
        id: Yup.number(),
        categoryID: Yup.number().required("*").moreThan(0, "*"),
        title: Yup.string().required("*"),
        text: Yup.string().required("*"),
        description: Yup.string(),
        videoUrl: Yup.string(),
        videoDescription: Yup.string(),
        audioUrl: Yup.string(),
        audioDescription: Yup.string(),
        rate: Yup.number(),
    })

  const formFields = {
    id: props.data.id,
    description: props.data.description,
    title: props.data.title,
    text: props.data.text,
    videoUrl: props.data.videoUrl,
    videoDescription: props.data.videoDescription,
    audioUrl: props.data.audioUrl,
    audioDescription: props.data.audioDescription,
    rate: props.data.rate,
    categoryID: props.data.categoryID,
  };


  const editArticle=async(body)=>{
    await CrudRepository.edit("articles/edit", body).then((response) => {
        if (response.data.success === true) {
          alert(`${response.data.message}`);
          CrudRepository.getAll("articles").then((results) => {
            dispatch(removeFromItemsReducer());
            dispatch(addToItemsReducer(results.data.value));
          });
        } else {
          alert(`${response.data.message} : ${response.data.errors}`);
        }
      });
  }

  const editArticleHandler=(values)=>{
    editArticle(values)
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={4} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={editArticleHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="put"
          >
            <Field type="hidden" name="id" />
            {/* <SelectField name='categoryID' label='انتخاب دسته بندی'>
                {infalteCategoriesDropDown.map(item=>{
                    return <option key={item.id} value={item.id}>{item.title}</option>
                })}
            </SelectField> */}
            <TextField name="title" label="عنوان" />
            <TextField name="description" label="توضیحات" />
            <TextField name="videoUrl" label="ویدئو" />
            <TextField name="videoDescription" label="توضیحات ویدئو" />
            <TextField name="audioUrl" label="فایل صوتی" />
            <TextField name="audioDescription" label="توضیحات فایل صوتی" />

            <FormButton variant="warning">ویرایش</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArticle;
