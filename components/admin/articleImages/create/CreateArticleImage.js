import React from "react";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import Yup from "../../../../framework/yup/Yup";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import SelectField from "../../../../ui/formUi/select/SelectField";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";

const CreateArticleImage = (props) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    description: Yup.string(),
    imageUrl: Yup.string().required("*"),
    alter: Yup.string(),
    articleID: Yup.number().required("*"),
  });

  const formFields = {
    description: "",
    imageUrl: "",
    alter: "",
    articleID: 0,
  };
  const createArticleImage = async (body) => {
    await CrudRepository.create("articleImages/create", body).then(
      (response) => {
        if (response.data.success === true) {
          CrudRepository.getAll("articleImages").then((results) => {
            dispatch(removeFromItemsReducer());
            dispatch(addToItemsReducer(results.data.value));
          });
        }
      }
    );
  };

  const createArticleImagesHandler = (values) => {
    createArticleImage(values);
  };

  return (
    <CustomForm
      submit={createArticleImagesHandler}
      change={false}
      blur={false}
      schema={validationSchema}
      fields={formFields}
      method="post"
    >
      <SelectField name="articleID" id="articleID" label="انتخاب مقاله">
        {props.articles.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          );
        })}
      </SelectField>

      <TextField name="description" label="توضیحات" />

      <TextField name="imageUrl" label="آدرس عکس" />

      <TextField name="imageAlter" label="جایگزین عکس" />

      <FormButton variant="btn btn-success">ثبت</FormButton>
    </CustomForm>
  );
};

export default CreateArticleImage;
