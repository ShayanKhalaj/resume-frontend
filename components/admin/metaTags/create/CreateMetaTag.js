import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import Yup from "../../../../framework/yup/Yup";
import { useDispatch } from "react-redux";
import { addToItemsReducer, removeFromItemsReducer } from "../../../../redux/features/admin/AdminSlice";

const CreateMetaTag = (props) => {

    const dispatch  = useDispatch()

    const validationSchema = Yup.object({
        description: Yup.string(),
        tag: Yup.string().required('*'),
        tagName: Yup.string().required('*'),
        articleID: Yup.number().required('*')
    })

  const formFields = {
    description: "",
    tag: "",
    tagName: "",
    articleID: 0,
  };

  const createTag = async(body)=>{
    await CrudRepository.create('tags/create',body)
    .then(response=>{
        if(response.data.value.success===true){
            CrudRepository.getAll('tags')
            .then(results=>{
                dispatch(removeFromItemsReducer())
                dispatch(addToItemsReducer(results.data.value))
            })
        }
        else{
            alert(`${response.data.value.message} : ${response.data.value.errors}`)
        }
    })
  }

  const createMetaTagHandler = (values) => {
    createTag(values)
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={6} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={createMetaTagHandler}
            change={false}
            blur={false}
            schema={validationSchema}
            fields={formFields}
            method="post"
          >
            <SelectField name="articleID" label="انتخاب مقاله">
              {props.data.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </SelectField>

            <TextField name="tagName" label="نام" />

            <TextField name="tag" label="تگ" />

            <TextField name="description" label="توضیحات" />

            <FormButton variant="btn btn-success" type="submit">
              ثبت
            </FormButton>
          </CustomForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMetaTag;
