import React, { useMemo, useState } from "react";
import FormContainer from "../../../../ui/formUi/container/FormContainer";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CustomModal from "../../../../ui/modalUi/CustomModal";
import CreateArticleImage from "../create/CreateArticleImage";
import { useDispatch, useSelector } from "react-redux";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";

const ArticleImageSearchModel = () => {
  const dispatch = useDispatch();
  const articleImagesSelector = useSelector((state) => state.admin.items);

  const [inflateCategoriesDropDown, setInflateCategoriesDropDown] = useState(
    []
  );
  const [inflateArticlesDropDown, setInflateArticleDropDown] = useState([]);

  const formFields = {
    id: 0,
    imageUrl: "",
    articleID: 0,
  };

  const getCategories = async () => {
    CrudRepository.getAll("categories").then((response) => {
      setInflateCategoriesDropDown(response.data.value);
    });
  };

  const getArticles = async () => {
    await CrudRepository.getAll("articles").then((response) => {
      setInflateArticleDropDown(response.data.value);
    });
  };

  useMemo(async () => {
    getCategories();
    getArticles();

    await CrudRepository.getAll("articleImages").then((response) => {
      dispatch(removeFromItemsReducer());
      dispatch(addToItemsReducer(response.data.value));
      console.log(response.data.value)
    });
  }, []);

  const searchArticleImages = async (body) => {
    await CrudRepository.search("articleImages/search", body).then(
      (response) => {
        if (response.data.value.errors === null) {
          dispatch(removeFromItemsReducer());
          dispatch(addToItemsReducer(response.data.value.results));
        }
      }
    );
  };

  const searchArticleImagesHandler = (values) => {
    searchArticleImages(values);
  };

  return (
    <FormContainer justify={true}>
      <CustomForm
        submit={searchArticleImagesHandler}
        fields={formFields}
        validation={null}
        blur={false}
        change={false}
      >
        <SelectField name="id" label="انتخاب دسته بندی">
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

        <TextField name="imageUrl" label="آدرس عکس" />

        <div className="flex form-group top left right bottom">
          <FormButton>جستجو</FormButton>
          <CustomModal title="ثبت عکس جدید" className="btn btn-success">
            <CreateArticleImage articles={inflateArticlesDropDown} />
          </CustomModal>
        </div>
      </CustomForm>
    </FormContainer>
  );
};

export default ArticleImageSearchModel;
