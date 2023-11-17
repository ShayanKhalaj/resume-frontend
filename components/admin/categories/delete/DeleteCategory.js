import React from "react";
import CustomButton from "../../../../ui/customUi/button/CustomButton";
import CrudRepository from "../../../../repositories/cruds/CrudRepository";
import { useDispatch } from "react-redux";
import {
  addToItemsReducer,
  removeFromItemsReducer,
} from "../../../../redux/features/admin/AdminSlice";

const DeleteCategory = (props) => {
  const dispatch = useDispatch();

  const deleteCategory = async () => {
    await CrudRepository.delete(`categories/delete/${props.id}`).then(
      (response) => {
        if (response.data.success === true) {
          CrudRepository.getAll("categories").then((results) => {
            alert(response.data.message);
            dispatch(removeFromItemsReducer());
            dispatch(addToItemsReducer(results.data.value));
          });
        } else {
          alert(`${response.data.message} : ${response.data.errors}`);
        }
      }
    );
  };

  return (
    <CustomButton click={deleteCategory} variant="danger">
      حذف
    </CustomButton>
  );
};

export default DeleteCategory;
