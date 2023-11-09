import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { PUT } from "../../../../api/axios/AxiosRepository";
import { showCreateModalReducer, showEditModalReducer } from "../../../../redux/features/admin/CRUD_OperationsSlice";

const EditCategory = (props) => {
  const dispatch = useDispatch();
  console.log(props.data.id)

  const validationSchema = Yup.object({
    id: Yup.number(),
    description: Yup.string().max(500, "500"),
    categoryName: Yup.string().required("*"),
    imageUrl: Yup.string().max(2000, "2000"),
    imageAlter: Yup.string(),
  });

  const formFields = {
    id: props.data.id,
    description: props.data.description,
    categoryName: props.data.categoryName,
    imageUrl: props.data.imageUrl,
    imageAlter: props.data.imageAlter,
  };

  const editCategoryHandler=async(values)=>{
    await PUT('categories/edit',values)
    .then(response=>{
        console.log(response)
        // if(response.data.success===true){
        //     dispatch(showEditModalReducer(false))
        // }
        // else{
        //     alert(response.data.message)
        // }
    })
  }

  return (
    <div className="top">
      <Formik
        onSubmit={editCategoryHandler}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={formFields}
        validationSchema={validationSchema}
      >
        <Form method="post">
          <Field as="hidden" typ="hidden" name="id" />
          <div className="form-group top">
            <label htmlFor="categoryName" className="form-label top">
              نام دسته بندی
            </label>
            <Field
              type="text"
              className="form-control top"
              name="categoryName"
              id="categoryName"
            />
            <ErrorMessage name="categoryName" />
          </div>
          <div className="form-group top">
            <label htmlFor="description" className="form-label top">
              توضیحات
            </label>
            <Field
              type="text"
              className="form-control top"
              name="description"
              id="description"
            />
            <ErrorMessage name="description" />
          </div>
          <div className="form-group top">
            <label htmlFor="imageUrl" className="form-label top">
              عکس
            </label>
            <Field
              type="text"
              className="form-control top"
              name="imageUrl"
              id="imageUrl"
            />
            <ErrorMessage name="imageUrl" />
          </div>
          <div className="form-group top">
            <label htmlFor="imageAlter" className="form-label top">
              متن جایگزین عکس
            </label>
            <Field
              type="text"
              className="form-control top"
              name="imageAlter"
              id="imageAlter"
            />
            <ErrorMessage name="imageAlter" />
          </div>
          <div className="form-group top">
            <button type="submit" className="btn btn-warning top">
              ویرایش
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCategory;
