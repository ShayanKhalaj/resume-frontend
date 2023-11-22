import { ErrorMessage, Field } from 'formik'
import React from 'react'
import FieldErrorMessage from '../error/FieldErrorMessage'

const CheckBoxField = (props) => {
  return (
    <div className="form-group text-dark">
    <label htmlFor={props.name} className="form-label">
      {props.label}
    </label>
    <Field
      type="checkbox"
      name={props.name}
      id={props.name}
      className="form-checkbox"

    />
    <ErrorMessage name={props.name} component={FieldErrorMessage} />
  </div>
  )
}

export default CheckBoxField