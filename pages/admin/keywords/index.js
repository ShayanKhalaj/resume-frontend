import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchKeyword from "../../../components/admin/keywords/search/SearchKeyword";

const index = () => {
  return (
    <>
      <Container className="justify-content-center">
        <Row>
          <Col>
            <h1 className="top">مدیریت کلیدواژگان</h1>
          </Col>
        </Row>
      </Container>
        <SearchKeyword />
    </>
  );
};

export default index;
