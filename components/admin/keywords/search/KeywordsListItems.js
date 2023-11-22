import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CustomModal from "../../../../ui/modalUi/CustomModal";
import CustomGrid from "../../../../ui/gridUi/CustomGrid";
import EditKeyword from "../edit/EditKeyword";
import DeleteKeyword from "../delete/DeleteKeyword";

const KeywordsListItems = () => {
  const keywordsListSelector = useSelector((state) => state.admin.items);



  return (
    <CustomGrid
      ths={
        <tr>
          <th>شناسه</th>
          <th>نام</th>
          <th>متن</th>
          <th>توضیحات</th>
          <th>مقاله</th>
          <th></th>
          <th></th>
        </tr>
      }
      tds={keywordsListSelector.map((item) => {
        return (
          <tr key={item.id}>
            <th>{item.id}</th>
            <th>{item.name}</th>
            <th>{item.text}</th>
            <th>{item.description}</th>
            <th>{item.articleID}</th>
            <th>
              <CustomModal title="ویرایش کلیدواژه" className="btn btn-warning">
                <EditKeyword data={item} />
              </CustomModal>
            </th>
            <th>
              <DeleteKeyword id={item.id}/>
            </th>
          </tr>
        );
      })}
    />
  );
};

export default KeywordsListItems;
