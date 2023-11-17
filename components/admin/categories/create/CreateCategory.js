import React from "react";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import Yup from "../../../../framework/yup/Yup";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";
import { Col, Container, Row } from "react-bootstrap";

const CreateCategory = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    categoryName: Yup.string().required("*"),
    description: Yup.string(),
    imageUrl: Yup.string(),
    imageAlter: Yup.string(),
  });

  const formFields = {
    categoryName: "",
    description: "",
    imageUrl: "",
    imageAlter: "",
  };

  const createCategory = async (body) => {
    await CrudRepository.create("categories/create", body).then((response) => {
      if (response.data.value.success === true) {
        alert(`${response.data.value.message}`);
        CrudRepository.getAll("categories").then((results) => {
          dispatch(removeFromItemsReducer());
          dispatch(addToItemsReducer(results.data.value));
        });
      } else {
        response.data.value.errors.map((item) => {
          alert(`${item}`);
        });
      }
    });
  };

  const createCategoryHandler = (values) => {
    createCategory(values);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={6} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={createCategoryHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="post"
          >
            <TextField name="categoryName" label="نام دسته بندی" />

            <TextField name="description" label="توضیحات" />

            <TextField name="imageUrl" label="آدرس عکس" />

            <TextField name="imageAlter" label="جایگزین عکس" />

            <FormButton variant="btn btn-success">ثبت</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCategory;
