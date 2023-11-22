import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import Yup from "../../../../framework/yup/Yup";
import { Field } from "formik";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import { addToItemsReducer, removeFromItemsReducer } from "../../../../redux/features/admin/AdminSlice";

const CreateComment = (props) => {

    const dispatch = useDispatch()

  const validationSchema = Yup.object({
    email: Yup.string().required("*").email("ایمیل صحیح نیست"),
    name: Yup.string().required("*"),
    text: Yup.string().required("*"),
  });

  const formFields = {
    email: "",
    name: "",
    text: "",
    articleID: 26,
    isAnswered:false,
    isAccepted:false,
    hasSeen:false,
  };

  const createComment = async(body)=>{
    await CrudRepository.create('comments/create',body)
    .then(response=>{
      if(response.data.value.success===true){
        CrudRepository.getAll('comments')
        .then(results=>{
           dispatch(removeFromItemsReducer())
           dispatch(addToItemsReducer(results.data.value))
        })
      }
    })
    .catch(errors=>{
        console.log(errors)
    })
  }

  const createCommentHandler = (values) => {
    createComment(values)
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={6} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={createCommentHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="post"
          >
            <Field type="hidden" name="articleID" value={26}/>

            <TextField name="email" label="ایمیل" />

            <TextField name="name" label="نام" />

            <TextField name="text" label="متن" />

            <FormButton variant="btn btn-success" type="submit">
              ثبت
            </FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateComment;
