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
import CheckBoxField from "../../../../ui/formUi/checkbox/CheckBoxField";

const CommentSearchModel = () => {

    const commentsListSelector = useSelector((state)=>state.admin.items)

    const dispatch=useDispatch()

    const [inflateArticlesDropDown, setInflateArticlesDropDown] = useState([])

  const formFields = {
    isAccepted: false,
    hasSeen: false,
    isAnswered: false,
    likedCount: 0,
    dislikedCount: 0,
    articleID: 0,
  };

  const getArticles = async()=>{
    await CrudRepository.getAll('articles')
    .then(response=>{
        setInflateArticlesDropDown(response.data.value)
    })
  }

  const getComments = async()=>{
    await CrudRepository.getAll('comments')
    .then(response=>{
        dispatch(removeFromItemsReducer())
        dispatch(addToItemsReducer(response.data.value))
    })
  }

  useMemo(()=>{
    getArticles()
    getComments()
  },[])

  const searchComments = async(body)=>{
    await CrudRepository.search('comments/search',body)
    .then(response=>{
        dispatch(removeFromItemsReducer())
        dispatch(addToItemsReducer(response.data.value))
    })
  }

  const searchCommentsHandler = (values)=>{
searchComments(values)
  }

  return (
    <FormContainer justify={true}>
      <CustomForm
        submit={searchCommentsHandler}
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

        <CheckBoxField name='isAccepted' label='نظرات تایید شده'/>
        <CheckBoxField name='hasSeen' label='نظرات دیده شده'/>
        <CheckBoxField name='isAnswered' label='نظرات پاسخ داده شده'/>

        <TextField name='likedCount' label='تعداد دوست داشتم' type='number'/>
        <TextField name='disLikedCount' label='تعداد دوست نداشتم' type='number'/>

        <div className="flex form-group top left right bottom">
          <FormButton>جستجو</FormButton>
        </div>
      </CustomForm>
    </FormContainer>
  );
};

export default CommentSearchModel;
