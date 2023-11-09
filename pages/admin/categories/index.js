import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchCategory from "../../../components/admin/categories/search/SearchCategory";
import CategoriesListItems from "../../../components/admin/categories/search/CategoriesListItems";

const CategoryMangement = (props) => {
  return (
    <>
      <Container className="top">
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={10} lg={10} xl={8} xxl={8}>
            <h1>مدیریت دسته بندی ها</h1>
            <SearchCategory />
          </Col>
        </Row>
      </Container>
      <CategoriesListItems />
    </>
  );
};

export default CategoryMangement;
