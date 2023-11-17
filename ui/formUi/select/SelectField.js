import React from 'react'
import { ErrorMessage, Field } from 'formik'
import FieldErrorMessage from '../error/FieldErrorMessage'

const SelectField = (props) => {
  return (
    <div className="form-group text-dark">
    <label htmlFor={props.name} className="form-label">
      {props.label}
    </label>
    <Field
      as="select"
      type="number"
      name={props.name}
      id={props.name}
      className="form-select"
    >
        <option value={-1}>{props.index?props.index:<p>...انتخاب کنید...</p>}</option>
        {props.children}
    </Field>
    <ErrorMessage name={props.name} component={FieldErrorMessage} />
  </div>
  )
}

export default SelectField