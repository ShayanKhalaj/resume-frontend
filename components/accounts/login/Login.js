import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {useRouter} from 'next/router'
import styles from './Login.module.css'
import { setCookie } from "../../../redux/features/accounts/users/UserSlice";
import { POST } from "../../../api/axios/AxiosRepository";

const Login = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("*"),
    password: Yup.string().required("*"),
  });

  const formFields = {
    username: "",
    password: "",
  };

  const dispatch = useDispatch()
  const router = useRouter()

  const login=(request)=>{
    POST('account/login',{
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

  const loginHandler = (values)=>{
    login(values)
  }

  return (
    <Container className={`${styles.outerContainer}`}>
      <Row className="justify-content-center">
        <Col xxl={4} xl={6} lg={8} sm={12} xs={12}>
          <Formik
            onSubmit={loginHandler}
            validationSchema={validationSchema}
            initialValues={formFields}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username" className='form-label'>نام کاربری</label>
                <Field className={`form-control`} name="username" type="text" id="username" />
                <ErrorMessage name="username" />
              </div>

              <div className="form-group">
                <label htmlFor="password" className='form-label'>رمز عبور</label>
                <Field className={`form-control`} name="password" type="text" id="password" />
                <ErrorMessage name="password" />
              </div>

              <div className="form-group">
                <button type="submit" className={`btn btn-primary ${styles.loginButton}`}>
                  ورود
                </button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
