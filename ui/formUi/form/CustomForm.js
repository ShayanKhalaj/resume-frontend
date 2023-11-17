import { Form, Formik } from "formik";
import React from "react";

const CustomForm = (props) => {
  return (
    <Formik
      onSubmit={props.submit}
      initialValues={props.fields}
      validateOnBlur={props.blur}
      validateOnChange={props.change}
      validationSchema={props.schema}>
      
      <Form method={props.method} className='border-soft'>
        {props.children}
      </Form>
    </Formik>
  );
};

export default CustomForm;
