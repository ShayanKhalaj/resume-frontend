import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import { Field } from "formik";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import Yup from "../../../../framework/yup/Yup";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";

const EditComment = (props) => {
  const validationSchema = Yup.object({
    answer: Yup.string().required("***"),
  });

  const formFields = {
    id: props.data.id,
    answer: props.data.answer,
  };


  const editComment = async(body)=>{
    await CrudRepository.edit('comments/edit',body)
    .then(response=>{
        if(response.data.value.success===true){
            alert(response.data.value.message)
        }
        else{
            alert(response.data.value.errors)
        }
    })
  }

  const editCommentHandler = (values) => {
    editComment(values)
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={4} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={editCommentHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="put"
          >
            <Field type="hidden" name="id" />
            <TextField name="answer" label="پاسخ" />

            <FormButton variant="info">ثبت پاسخ</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditComment;
