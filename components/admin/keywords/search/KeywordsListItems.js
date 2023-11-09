import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const KeywordsListItems = React.memo((props) => {

    const selector = useSelector(state=>state.crud.items)

  return (
    <Table hover borderd striped size="sm" className="top">
      <thead>
        <tr>
          <th>شناسه</th>
          <th>نام</th>
          <th>کلیدواژه</th>
          <th>توضیحات</th>
        </tr>
      </thead>
      <tbody>
        {selector.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.text}</td>
              <td>{item.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});

export default KeywordsListItems;
