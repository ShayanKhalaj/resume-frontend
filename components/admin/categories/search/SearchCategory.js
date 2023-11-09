import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { GET, POST } from "../../../../api/axios/AxiosRepository";
import { useDispatch, useSelector } from "react-redux";
import {addModelToItemsListReducer,removeModelsFromItemsListReducer} from '../../../../redux/features/admin/CRUD_OperationsSlice'
import CategoriesListItems from "./CategoriesListItems";
import CreateModal from "../../../framework/admin/modal/CreateModal";
import CreateCategory from "../create/CreateCategory";


const SearchCategory = () => {
    const dispatch = useDispatch()

    const createModal = useSelector(state=>state.crud.createModal)
    const editModal = useSelector(state=>state.crud.editModal)

    const [categories,setCategories] = useState([])

  const validationShema = Yup.object({
    id: Yup.number(),
    categoryName: Yup.string(),
    description: Yup.string(),
  });

  const formFields = {
    id: 0,
    categoryName: "",
    description: "",
  };

  const inflateCategories=async()=>{
    await GET('categories')
    .then(response=>{
        setCategories(response.data.value)
    })
  }

  useMemo(async()=>{
    inflateCategories()
    await GET('categories')
    .then(response=>{
         dispatch(removeModelsFromItemsListReducer())
         dispatch(addModelToItemsListReducer(response.data.value))
    })
  },[createModal||editModal])

  const searchCategoryHandler = async (values) => {
    await POST('categories/search',values)
    .then(response=>{
        if(response.data.value.errors===null){
            dispatch(removeModelsFromItemsListReducer())
            dispatch(addModelToItemsListReducer(response.data.value.results))
        }
        else{
            alert(response.data.value.errors)
        }
    })
  };
  return (
    <div>
      <Formik
        onSubmit={searchCategoryHandler}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationShema}
        initialValues={formFields}
      >
        <Form method="post">
          <div className="from-group top">
            <label htmlFor="id" className="from-label top">
              انتخاب دسته بندی
            </label>
            <Field
              className="form-select top"
              as="select"
              name="id"
              id="id"
              type="number"
            >
              <option value={-1}></option>
              {categories.map(item=>{
                return(
                    <option value={item.id} key={item.id}>{item.categoryName}</option>
                )
              })}
            </Field>
            <ErrorMessage name="id" />
          </div>
          <div className="from-group top">
            <label htmlFor="categoryName" className="from-label top">
              نام دسته بندی
            </label>
            <Field
              className="form-control top"
              name="categoryName"
              id="categoryName"
              type="text"
            />
            <ErrorMessage name="categoryName" />
          </div>
          <div className="form-group top flex">
            <button
              className="btn btn-primary top left right bottom"
              type="submit"
            >
              جستجو
            </button>
            <CreateModal className='top right left bottom'
            variant='success'
            modalTitle='ثبت دسته بندی جدید'
            modalBody={<CreateCategory/>}
            modalFooter={false}/>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchCategory;
