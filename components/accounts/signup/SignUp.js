import React from "react";
import styles from "./SignUp.module.css";
import { Col, Container, Row} from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import * as AxiosRepository from '../../../repositories/axios/AxiosRepository'
import { setCookie } from "../../../redux/features/accounts/users/UserSlice";
import { useDispatch } from "react-redux";
import {useRouter} from 'next/router'


const SignUp = () => {

  const validationSchema = Yup.object({
    firstname: Yup.string().max(50, "حداکثر 50 کاراکتر").required("*"),
    lastname: Yup.string().max(50, "حداکثر 50 کاراکتر").required("*"),
    username: Yup.string().max(50, "حداکثر 100 کاراکتر").required("*"),
    password: Yup.string().max(50, "حداکثر 50 کاراکتر").required("*"),
    repassword: Yup.string().max(50, "حداکثر 50 کاراکتر").required("*"),
    email: Yup.string()
      .max(50, "حداکثر 200 کاراکتر"),
    mobile: Yup.string().max(50, "حداکثر 20 کاراکتر").required("*"),
  });

  const formFileds = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    repassword: "",
    email: "",
    mobile: "",
    roleId:2
  };

  const dispatch = useDispatch()
  const router = useRouter()

  const login = (request)=>{
    AxiosRepository.POST('account/login',{
        username:request.username,
        password:request.password
    })
    .then(response=>{
        dispatch(setCookie(response.data.value.token))
        if(response.data.value.returnUrl!==""){
            router.push(response.data.value.returnUrl)
        }
        else{
            router.push('/')
        }
    })
    .catch(error=>{
        console.log(error)
    })
  }

  const signUp=(values)=>{
    AxiosRepository.POST_ASYNC('​/account​/register',values)
    .then(response=>{
        login(response.data.value)
    })
    .catch(error=>{
        console.log(error)
    })
  }


  const signUpHandler = (values)=>{
     signUp(values)
  }

  return (
      <Container className={`${styles.outerContainer}`}>
      <Row className="justify-content-center">
        <Col xxl={4} xl={4} lg={8} md={8} sm={12} xs={12}>
          <Formik
            onSubmit={signUpHandler}
            initialValues={formFileds}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form>
              <div className={`form-group`}>
                <label className="form-label" htmlFor="firstname">
                  نام
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="firstname"
                />
                <ErrorMessage name="firstname" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <label className="form-label" htmlFor="lastname">
                  نام خانوادگی
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="lastname"
                />
                <ErrorMessage name="lastname" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <label className="form-label" htmlFor="username">
                  نام کاربری
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="username"
                />
                <ErrorMessage name="username" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <label className="form-label" htmlFor="password">
                  رمز عبور
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="password"
                />
                <ErrorMessage name="password" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <label className="form-label" htmlFor="repassword">
                  تکرار رمز عبور
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="repassword"
                />
                <ErrorMessage
                  name="repassword"
                  component={<h1>error ...</h1>}
                />
              </div>

              <div className={`form-group`}>
                <label className="form-label" htmlFor="email">
                  ایمیل
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="email"
                />
                <ErrorMessage name="email" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <label className="form-label" htmlFor="mobile">
                  تلفن همراه
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="mobile"
                />
                <ErrorMessage name="moblie" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <Field
                  className="form-control"
                  type="hidden"
                  name="roleId"
                />
                <ErrorMessage name="roleId" component={<h1>error ...</h1>} />
              </div>

              <div className={`form-group`}>
                <button className={`${styles.signUpButton} btn btn-primary`} type="submit">
                  ثبت نام
                </button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
