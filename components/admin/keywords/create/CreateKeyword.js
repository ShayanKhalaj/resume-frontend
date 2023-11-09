import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addModelToItemsListReducer,
  showCreateModalReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";
import { Button } from "react-bootstrap";
import * as Yup from "Yup";
import { GET, POST } from "../../../../api/axios/AxiosRepository";

const CreateKeyword = (props) => {
  const showModalSelector = useSelector((state) => state.crud.createModal);
  const dispatch = useDispatch();

  const [show, setShow] = useState(showModalSelector);

  const validationSchema = Yup.object({
    articleId: Yup.number().required("*"),
    name: Yup.string().required("*"),
    text: Yup.string().required("*"),
    description: Yup.string(),
  });

  const formFields = {
    articleID: 0,
    name: "",
    text: "",
    description: "",
  };

  const handleShow = () => {
    setShow(true);
    dispatch(showCreateModalReducer(true));
  };
  const handleClose = () => {
    setShow(false);
    dispatch(showCreateModalReducer(false));
  };

  useMemo(() => {
    setShow(false);
  }, [showModalSelector]);

  const createKeywordHandler = async (values) => {
    await POST("keywords/create", values).then((response) => {
      if (response.data.errors === null) {
        GET("keywords")
          .then((result) => {
            dispatch(addModelToItemsListReducer(result.data.value));
            dispatch(showCreateModalReducer(false));
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else{
        alert(`${response.data.message} : ${response.date.errors}`)
      }
    });
  };

  return (
    <div>
      <Button
        className="top right left bottom"
        variant="success"
        onClick={handleShow}
        type="button"
      >
        ثبت کلیدواژه جدید
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>ثبت کلیدواژه جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={createKeywordHandler}
            validationSchema={validationSchema}
            initialValues={formFields}
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form method="post">
              <div className="form-group top">
                <label className="form-label" htmlFor="articleID">
                  انتخاب مقاله
                </label>
                <Field
                  as="select"
                  type="number"
                  className="form-select"
                  name="articleID"
                  id="articleID"
                >
                  <option></option>
                  {props.articles.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="articleID" />
              </div>

              <div className="form-group top">
                <label className="form-label" htmlFor="name">
                  نام کلیدواژه
                </label>
                <Field
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                />
                <ErrorMessage name="name" />
              </div>

              <div className="form-group top">
                <label className="form-label" htmlFor="text">
                  کلیدواژه
                </label>
                <Field
                  type="text"
                  className="form-control"
                  name="text"
                  id="text"
                />
                <ErrorMessage name="text" />
              </div>

              <div className="form-group top">
                <label className="form-label" htmlFor="description">
                  توضیحات
                </label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                />
                <ErrorMessage name="description" />
              </div>

              <div className="form-group top">
                <Button type="submit" variant="success">
                  ثبت کلیدواژه
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateKeyword;
