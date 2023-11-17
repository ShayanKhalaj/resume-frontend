import React from "react";
import { Col, Container, Row } from "react-bootstrap";


const AdminIndex = (props) => {
  return (
    <>
    
    <br/>
      <Container>
        <Row>
          <Col>
            <h1 className="top right left bottom block full-padding">
              {props.title}
            </h1>
            <hr/>
            <br/>
            {props.searchModel}
          </Col>
        </Row>
      </Container>
      <br/>
      {props.listItems}
    </>
  );
};

export default AdminIndex;
