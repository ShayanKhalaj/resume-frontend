import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import { Field } from "formik";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import Yup from "../../../../framework/yup/Yup";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";

const EditMetaTag = (props) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    id: Yup.number().required("*"),
    description: Yup.string(),
    tag: Yup.string().required("*"),
    tagName: Yup.string().required("*"),
  });

  const formFields = {
    id: props.data.id,
    description: props.data.description,
    tag: props.data.tag,
    tagName: props.data.tagName,
  };

  const editTag = async (body) => {
    await CrudRepository.edit("tags/edit", body).then((response) => {
      if (response.data.value.success === true) {
        alert(`${response.data.value.message}`);
        CrudRepository.getAll("tags").then((results) => {
          dispatch(removeFromItemsReducer());
          dispatch(addToItemsReducer(results.data.value));
        });
      } else {
        alert(`${response.data.value.message} : ${response.data.value.errors}`);
      }
    });
  };

  const editTagHandler = (values) => {
    editTag(values);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={4} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={editTagHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="put"
          >
            <Field type="hidden" name="id" />

            <TextField name="tagName" label="نام" />
            <TextField name="tag" label="تگ" />
            <TextField name="description" label="توضیحات" />

            <FormButton variant="warning">ویرایش</FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditMetaTag;
