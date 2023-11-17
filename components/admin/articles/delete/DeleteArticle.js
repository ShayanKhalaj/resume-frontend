import React from 'react'
import { useDispatch } from 'react-redux';
import CustomButton from '../../../../ui/customUi/button/CustomButton'
import CrudRepository from '../../../../repositories/cruds/CrudRepository';
import { addToItemsReducer, removeFromItemsReducer } from '../../../../redux/features/admin/AdminSlice';

const DeleteArticle = (props) => {

    const dispatch = useDispatch();

    const deleteArticle = async () => {
      await CrudRepository.delete(`articles/delete/${props.id}`).then(
        (response) => {
            console.log(response)
          if (response.data.value.success === true) {
            CrudRepository.getAll("articles").then((results) => {
              alert(response.data.value.message);
              dispatch(removeFromItemsReducer());
              dispatch(addToItemsReducer(results.data.value));
            });
          } else {
            alert(`${response.data.value.message} : ${response.data.value.errors}`);
          }
        }
      );
    };

  return (
    <CustomButton click={deleteArticle} variant="danger">
      حذف
    </CustomButton>
  )
}

export default DeleteArticle