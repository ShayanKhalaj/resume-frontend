import React from "react";
import CustomGrid from "../../../../ui/gridUi/CustomGrid";
import { useSelector } from "react-redux";
import { FormCheck } from "react-bootstrap";
import {
  FaCheck,
  FaCheckCircle,
  FaCross,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import EditArticle from "../edit/EditArticle";
import CustomModal from "../../../../ui/modalUi/CustomModal";
import DeleteArticle from "../delete/DeleteArticle";

const ArticlesListItems = (props) => {
  const articlesListSelector = useSelector((state) => state.admin.items);

  return (
    <CustomGrid
      ths={
        <tr>
          <th>شناسه</th>
          <th>عنوان</th>
          <th>متن</th>
          <th>امتیاز</th>
          <th>دسته بندی</th>
          <th>توضیحات</th>
          <th>ویدیو</th>
          <th>فایل صوتی</th>
          <th></th>
          <th></th>
        </tr>
      }
      tds={articlesListSelector.map((item) => {
        return (
          <tr key={item.id}>
            <th>{item.id}</th>
            <th>{item.title}</th>
            <th>{item.text}</th>
            <th>{item.rate}</th>
            <th>{item.categoryID}</th>
            <th>{item.description}</th>
            <th>
              {item.videoUrl !== "" ? (
                <FaCheckCircle className="text-success h4" />
              ) : (
                <FaTimesCircle className="text-danger h4" />
              )}
            </th>
            <th>
              {item.audioUrl !== "" ? (
                <FaCheckCircle className="text-success h4" />
              ) : (
                <FaTimesCircle className="text-danger h4" />
              )}
            </th>
            <th>
              <CustomModal title='ویرایش مقاله' className='btn btn-warning'>
              <EditArticle data={item}/>
              </CustomModal>
            </th>
            <th>
              <DeleteArticle id={item.id}/>
            </th>
          </tr>
        );
      })}
    />
  );
}

export default ArticlesListItems;
