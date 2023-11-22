import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import TextField from "../../../../ui/formUi/text/TextField";
import Yup from "../../../../framework/yup/Yup";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import { addToItemsReducer, removeFromItemsReducer } from "../../../../redux/features/admin/AdminSlice";
import SelectField from "../../../../ui/formUi/select/SelectField";
import FormButton from "../../../../ui/formUi/button/FormButton";

const CreateKeyword = (props) => {

    const dispatch=useDispatch()

    const validationSchema=Yup.object({
        name:Yup.string().required('*'),
        text:Yup.string().required('*'),
        description:Yup.string(),
        articleID:Yup.number().required('*')
    })

    const formFields = {
        name:'',
        text:'',
        description:'',
        articleID:0
    }

    const createKeyword=async(body)=>{
        await CrudRepository.create('keywords/create',body)
        .then(response=>{
            if(response.data.success){
                alert(response.data.message)
                CrudRepository.getAll('keywords')
                .then(results=>{
                  dispatch(removeFromItemsReducer())
                  dispatch(addToItemsReducer(results.data.value))
                })
            }
            else{
                alert(`${response.data.message} : ${response.data.errors}`)
            }
        })
    }

    const createKeywordHandler = (values)=>{
        createKeyword(values)
    }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xxl={4} xl={6} lg={6} md={8} sm={10} xs={12}>
          <CustomForm
            submit={createKeywordHandler}
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

            <TextField name="name" label="نام" />

            <TextField name="text" label="متن" />

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

export default CreateKeyword;
