import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ArticleSearchModel from "../../../components/admin/articles/search/ArticleSearchModel";

const index = () => {
  return (
    <>
      <Container className="top">
        <Row className="justify-content-center">
          <Col xxl={8} xl={8} lg={8} md={10} sm={12} xs={12}>
            <h1 className="top right left bottom">مدیریت مقالات</h1>
          </Col>
        </Row>
      </Container>
      <ArticleSearchModel/>
    </>
  );
};

export default index;
