import React from "react";
import { Button } from "react-bootstrap";

const FormButton = (props) => {
  return (
    <Button
    className="right left"
      type={props.type ? props.type : "submit"}
      variant={props.variant ? props.variant : "primary"}
    >
      {props.children}
    </Button>
  );
};

export default FormButton;
