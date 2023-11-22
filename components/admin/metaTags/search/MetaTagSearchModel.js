import React, { useMemo, useState } from "react";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import FormContainer from "../../../../ui/formUi/container/FormContainer";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CustomModal from "../../../../ui/modalUi/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";
import CreateMetaTag from "../create/CreateMetaTag";

const MetaTagsSearchModel = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.admin.items);

  const [inflateTagsDropDown, setInflateTagsDropDown] = useState([]);
  const [inflateArticlesDropDown, setInflateArticlesDropDown] = useState([]);

  const formFields = {
    id: 0,
    tag: "",
    tagName: "",
    description: "",
    articleID: 0,
  };

  const getTags = async () => {
    await CrudRepository.getAll("tags").then((response) => {
      setInflateTagsDropDown(response.data.value);
      dispatch(removeFromItemsReducer());
      dispatch(addToItemsReducer(response.data.value));
    });
  };

  const getArticles = async () => {
    await CrudRepository.getAll("articles").then((response) => {
      setInflateArticlesDropDown(response.data.value);
    });
  };

  useMemo(() => {
    getArticles();
    getTags();
  }, []);

  const searchTags = async (body) => {
    await CrudRepository.search("tags/search", body).then((response) => {
      dispatch(removeFromItemsReducer());
      dispatch(addToItemsReducer(response.data.value.results));
    });
  };

  const searchTagsHandler = (values) => {
    searchTags(values);
  };

  return (
    <FormContainer justify={true}>
      <CustomForm
        submit={searchTagsHandler}
        fields={formFields}
        validation={null}
        blur={false}
        change={false}
      >
        <SelectField name="articleID" label="انتخاب مقاله">
          {inflateArticlesDropDown.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            );
          })}
        </SelectField>

        <SelectField name="id" label="انتخاب تگ">
          {inflateTagsDropDown.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.tagName}
              </option>
            );
          })}
        </SelectField>

        <TextField name="tag" label="تگ" type="text" />
        <TextField name="tagName" label="نام تگ" type="text" />
        <TextField name="description" label="توضیحات" type="text" />

        <div className="flex form-group top left right bottom">
          <FormButton>جستجو</FormButton>
          <CustomModal className="btn btn-success" title="ثبت متا تگ جدید">
            <CreateMetaTag data={inflateArticlesDropDown} />
          </CustomModal>
        </div>
      </CustomForm>
    </FormContainer>
  );
};

export default MetaTagsSearchModel;
