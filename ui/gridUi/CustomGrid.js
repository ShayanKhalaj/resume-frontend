import React, { useState } from "react";
import { Table } from "react-bootstrap";

const CustomGrid = (props) => {
  return (
    <Table
      variant="light"
      bordered
      hover
      striped
      size="sm"
      className="top border shadow"
    >
      <thead>{props.ths}</thead>
      <tbody>{props.tds}</tbody>
    </Table>
  );
};

export default CustomGrid;
