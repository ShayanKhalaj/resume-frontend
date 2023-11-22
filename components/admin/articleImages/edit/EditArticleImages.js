import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import { Field } from "formik";
import TextField from "../../../../ui/formUi/text/TextField";
import SelectField from '../../../../ui/formUi/select/SelectField'
import FormButton from '../../../../ui/formUi/button/FormButton'
import Yup from "../../../../framework/yup/Yup";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { addToItemsReducer, removeFromItemsReducer } from "../../../../redux/features/admin/AdminSlice";
import { useDispatch } from "react-redux";

const EditArticleImages = (props) => {

  const dispatch = useDispatch()

  const [inflateArticlesDropDown, setInflateArticlesDropDown] = useState([]);

  const validationSchema = Yup.object({
    id: Yup.number().required("*"),
    description: Yup.string(),
    imageUrl: Yup.string().required("*"),
    alter: Yup.string(),
    articleID: Yup.string().required("*"),
  });

  const formFields = {
    id: props.data.id,
    description: props.data.description,
    imageUrl: props.data.imageUrl,
    alter: props.data.alter,
    articleID: props.data.articleID,
  };

  async () => {
    await CrudRepository.getAll("articles").then((response) => {
      setInflateArticlesDropDown(response.data.value);
    });
  };

  const editArticleImage = async (body) => {
    await CrudRepository.edit("articleImages/edit", body).then((response) => {
      if(response.data.value.success===true){
        CrudRepository.getAll('articleImages')
        .then(results=>{

          dispatch(removeFromItemsReducer())
          dispatch(addToItemsReducer(results.data.value))
        })
      }
    });
  };

  const editArticleImageHandler = (values) => {
    editArticleImage(values);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={4} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={editArticleImageHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="put"
          >
            <Field type="hidden" name="id" />
            <Field type="hidden" name="articleID" />
            <TextField name="imageUrl" label="آدرس" />
            <TextField name="description" label="توضیحات" />
            <TextField name="alter" label="متن جایگزین" />

            <FormButton variant="warning">ویرایش</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArticleImages;
