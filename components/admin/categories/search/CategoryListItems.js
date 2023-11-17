import React from "react";
import CustomGrid from "../../../../ui/gridUi/CustomGrid";
import EditCategory from "../edit/EditCategory";
import DeleteCategory from "../delete/DeleteCategory";
import { useSelector } from "react-redux";
import CustomModal from "../../../../ui/modalUi/CustomModal";

const CategoryListItems = () => {
  const catgoriesListSelector = useSelector((state) => state.admin.items);

  return (
    <CustomGrid
      ths={
        <tr>
          <th>شناسه</th>
          <th>نام دسته بندی</th>
          <th>توضیحات</th>
          <th>عکس</th>
          <th>جایگزین عکس</th>
          <th></th>
          <th></th>
        </tr>
      }
      tds={catgoriesListSelector.map((item) => {
        return (
          <>
            <tr key={item.id}>
              <td>{item.categoryName}</td>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.imageUrl}</td>
              <td>{item.imageAlter}</td>
              <td>
                <CustomModal buttonTitle='ویرایش' title='ویرایش دسته بندی' className='btn btn-warning'>
                  <EditCategory data={item}/>
                </CustomModal>
              </td>
              <td>
                <DeleteCategory id={item.id}/>
              </td>
            </tr>
          </>
        );
      })}
    />
  );
};

export default CategoryListItems;
