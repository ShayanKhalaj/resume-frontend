import { ErrorMessage, Field } from "formik";
import React from "react";
import FieldErrorMessage from "../error/FieldErrorMessage";

const TextField = (props) => {
  return (
    
    <div className="form-group">
      <label htmlFor={props.name} className="form-label text-dark">
        {props.label}
      </label>
      <Field label={props.label}
        type={props.type?props.type:'text'}
        name={props.name}
        id={props.name}
        className="form-control"
      />
      <ErrorMessage name={props.name} component={FieldErrorMessage} />
    </div>
  );
};

export default TextField;
