import React, { useMemo } from "react";
import CategorySearchModel from "../../../components/admin/categories/search/CategorySearchModel";
import CrudRepository from "../../../repositories/cruds/CrudRepository";
import CategoryListItems from "../../../components/admin/categories/search/CategoryListItems";
import { Col, Container, Row } from "react-bootstrap";
import NavMenu from "../../../ui/wireframeUi/nav/NavMenu";
import AdminIndex from "../../../ui/wireframeUi/admin/AdminIndex";

const index = () => {
  return (
    <AdminIndex
    searchModel={<CategorySearchModel />}
      listItems={<CategoryListItems />}
      title="مدیریت دسته بندی ها"
    />
  );
};

export default index;
