import React, { useMemo, useState } from "react";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import CustomForm from "../../../../ui/formUi/form/CustomForm";
import SelectField from "../../../../ui/formUi/select/SelectField";
import TextField from "../../../../ui/formUi/text/TextField";
import FormButton from "../../../../ui/formUi/button/FormButton";
import FormContainer from "../../../../ui/formUi/container/FormContainer";
import CreateCategory from "../create/CreateCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";
import CustomModal from "../../../../ui/modalUi/CustomModal";

const CategorySearchModel = (props) => {
  const dispatch = useDispatch();
  const categoriesListSelector = useSelector((state)=>state.admin.items)

  const [inflateCategoriesDropDown, setInflateCategoriesDropDown] = useState(
    []
  );

  const formFields = {
    id: 0,
    categoryName: "",
  };

  useMemo(async () => {
    await CrudRepository.getAll("categories").then((response) => {
      dispatch(removeFromItemsReducer());
      dispatch(addToItemsReducer(response.data.value));
      setInflateCategoriesDropDown(response.data.value);
    });
  }, [categoriesListSelector]);

  const searchCategory = async (body) => {
    await CrudRepository.search("categories/search", body).then((response) => {
      dispatch(removeFromItemsReducer());
      dispatch(addToItemsReducer(response.data.value.results));
    });
  };

  const searchCategoriesHandler = (values) => {
    searchCategory(values);
  };

  return (
    <FormContainer justify={true}>
      <CustomForm
        submit={searchCategoriesHandler}
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

        <TextField name="categoryName" label="نام دسته بندی" />

        <div className="flex form-group top left right bottom">
          <FormButton>جستجو</FormButton>
          <CustomModal title='ثبت دسته بندی جدید' className='btn btn-success'>
            <CreateCategory />
          </CustomModal>
        </div>
      </CustomForm>
    </FormContainer>
  );
};

export default CategorySearchModel;
