import React, { useMemo, useState } from "react";
import FormContainer from "../../../../ui/formUi/container/FormContainer";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CustomModal from "../../../../ui/modalUi/CustomModal";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch, useSelector } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";
import CreateArticle from "../create/CreateArticle";

const ArticleSearchModel = () => {
  const dispatch = useDispatch();
  const articlesListSelector = useSelector((state) => state.admin.items);

  const [inflateCategoriesDropDown, setInflateCategoriesDropDown] = useState(
    []
  );
  const [inflateArticlesDropDown, setInflateArticlesDropDown] = useState([]);

  const formFields = {
    id: 0,
    title: "",
    text: "",
    description: "",
    rate: 0,
    categoryID: 0,
  };

  const getCategories = async () => {
    await CrudRepository.getAll("categories").then((response) => {
      setInflateCategoriesDropDown(response.data.value);
    });
  };

  const getArticles = async () => {
    await CrudRepository.getAll("articles").then((response) => {
      setInflateArticlesDropDown(response.data.value);
    });
  };

  useMemo(() => {
    getCategories();
    getArticles();
  }, [articlesListSelector]);

  const searchArticle = async (body) => {
    await CrudRepository.search("articles/search", body).then((response) => {
      dispatch(removeFromItemsReducer());
      dispatch(addToItemsReducer(response.data.value.results));
    });
  };

  const searchArticlesHandler = (values) => {
    searchArticle(values);
  };

  return (
    <FormContainer justify={true}>
      <CustomForm
        submit={searchArticlesHandler}
        fields={formFields}
        validation={null}
        blur={false}
        change={false}
      >
        <SelectField name="categoryId" label="انتخاب دسته بندی">
          {inflateCategoriesDropDown.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            );
          })}
        </SelectField>

        <SelectField name="id" label="انتخاب مقاله">
          {inflateArticlesDropDown.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            );
          })}
        </SelectField>

        <TextField name="description" label="توضیحات" />

        <div className="flex form-group top left right bottom">
          <FormButton>جستجو</FormButton>
          <CustomModal  title='ثبت مقاله جدید' className='btn btn-success'>
            <CreateArticle categories={inflateCategoriesDropDown}/>
        </CustomModal>
        </div>
      </CustomForm>
    </FormContainer>
  );
};

export default ArticleSearchModel;
