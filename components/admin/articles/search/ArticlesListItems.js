import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import DeleteArticle from "../delete/DeleteArticle";
import EditModal from "../../../framework/admin/modal/EditModal";
import EditArticle from "../edit/EditArticle";
import { useSelector } from "react-redux";

const ArticlesListItems = (props) => {

  const selector = useSelector((state)=>state.crud.items)
  
  selector.map(item=>{
  })

  return (
    <Table bordered hover striped size="sm" className="top">
      <thead>
        <tr>
          <th>شناسه</th>
          <th>عنوان</th>
          <th>متن</th>
          <th>توضیحات</th>
          <th>نویسنده</th>
          <th>دسته بندی</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {selector.map(item=>{
          return(
            
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.text}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>{item.categoryName}</td>
                <td>
                  <EditArticle data={item}/>
                </td>
                <td>
                  <DeleteArticle id={item.id} />
                </td>
              </tr>
            );
        })}
      </tbody>
    </Table>
  );
};

export default ArticlesListItems;
