import React, { useMemo, useState } from "react";
import FormContainer from "../../../../ui/formUi/container/FormContainer";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import CheckBoxField from "../../../../ui/formUi/checkbox/CheckBoxField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch, useSelector } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";
import TextField from "../../../../ui/formUi/text/TextField";
import CreateKeyword from "../create/CreateKeyword";
import CustomModal from "../../../../ui/modalUi/CustomModal";

const KeywordSearchModel = () => {
  const dispatch = useDispatch();

  const keywordsListSelector = useSelector((state) => state.admin.items);

  const [inflateArticlesDropDown, setInflateArticlesDropDown] = useState([]);
  const [inflateKeywordsDropDown, setInflateKeywordsDropDown] = useState([]);
  const [showKeywordDropDown, setShowKeywordDropDown] = useState(false);

  const formFields = {
    id: 0,
    name: "",
    text: "",
    description: "",
    articleID: 0,
  };

  const getKeywords = async () => {
    await CrudRepository.getAll("keywords").then((response) => {
      if (response.data.length > 0) {
        dispatch(removeFromItemsReducer());
        setInflateKeywordsDropDown(response.data);
        setShowKeywordDropDown(true);
        dispatch(addToItemsReducer(response.data));
      } else {
        setShowKeywordDropDown(false);
      }
    });
  };

  const getArticles = async () => {
    await CrudRepository.getAll("articles").then((response) => {
      setInflateArticlesDropDown(response.data.value);
    });
  };

  useMemo(() => {
    getKeywords();
    getArticles();
  }, []);

  const searchKeyword = async (body) => {
    await CrudRepository.getAll("keywords").then((response) => {
      response.data.filter((item) => {
        if (
          (parseInt(body.articleID) === item.articleID && parseInt(body.articleID)>0)||
          (parseInt(body.id) === item.id && parseInt(body.id)>0) ||
          body.name === item.name ||
          body.text === item.text ||
          body.description === item.description
        ) {
          dispatch(removeFromItemsReducer());
          dispatch(addToItemsReducer([item]));
        }
      });
    });
  };

  const searchKeywordsHandler = (values) => {
    searchKeyword(values);
  };

  return (
    <FormContainer justify={true}>
      <CustomForm
        submit={searchKeywordsHandler}
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

        {showKeywordDropDown === true ? (
          <SelectField name="id" label="انتخاب کلیدواژه">
            {inflateKeywordsDropDown.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.text}
                </option>
              );
            })}
          </SelectField>
        ) : null}

        <TextField name="name" label="نام کلید واژه" type="text" />
        <TextField name="text" label="متن کلیدواژه" type="text" />
        <TextField name="description" label="توضیحات" type="text" />

        <div className="flex form-group top left right bottom">
          <FormButton>جستجو</FormButton>
          <CustomModal className="btn btn-success" title="ثبت کلیدواژه جدید">
            <CreateKeyword data={inflateArticlesDropDown} />
          </CustomModal>
        </div>
      </CustomForm>
    </FormContainer>
  );
};

export default KeywordSearchModel;
