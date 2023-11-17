import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const FormContainer = (props) => {
  return (
    <Card>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
};

export default FormContainer;
