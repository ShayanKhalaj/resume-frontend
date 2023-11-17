import React from 'react'
import styles from './FieldErrorMessage.module.css'

const FieldErrorMessage = (props) => {
  return (
    <span className={`${styles.errorMessage}`}>{props.children}</span>
  )
}

export default FieldErrorMessage