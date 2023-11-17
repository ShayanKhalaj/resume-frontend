import React from "react";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import Yup from "../../../../framework/yup/Yup";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import { Field } from "formik";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";
import { Col, Container, Row } from "react-bootstrap";

const EditCategory = (props) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    description: Yup.string(),
    categoryName: Yup.string().required("*"),
    imageUrl: Yup.string(),
    imageAlter: Yup.string(),
  });

  const formFields = {
    id: props.data.id,
    description: props.data.description,
    categoryName: props.data.categoryName,
    imageUrl: props.data.imageUrl,
    imageAlter: props.data.imageAlter,
  };

  const editCategory = async (body) => {
    await CrudRepository.edit("categories/edit", body).then((response) => {
      if (response.data.success === true) {
        alert(`${response.data.message}`);
        CrudRepository.getAll("categories").then((results) => {
          dispatch(removeFromItemsReducer());
          dispatch(addToItemsReducer(results.data.value));
        });
      } else {
        alert(`${response.data.message} : ${response.data.errors}`);
      }
      console.log(response);
    });
  };

  const editCategoryHandler = (values) => {
    editCategory(values);
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xxl={4} xl={4} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={editCategoryHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="put"
          >
            <Field type="hidden" name="id" />
            <TextField name="categoryName" label="نام دسته بندی" />
            <TextField name="description" label="توضیحات" />
            <TextField name="imageUrl" label="عکس" />
            <TextField name="imageAlter" label="جایگزین عکس" />

            <FormButton variant="warning">ویرایش</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCategory;
