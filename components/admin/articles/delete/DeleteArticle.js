import React from "react";
import { DELETE, GET } from "../../../../api/axios/AxiosRepository";
import { useDispatch } from "react-redux";
import {
  addModelToItemsListReducer,
  removeModelsFromItemsListReducer,
} from "../../../../redux/features/admin/CRUD_OperationsSlice";

const DeleteArticle = (props) => {
  const dispatch = useDispatch();

  const deleteArticleHandler = async () => {
   
      await DELETE(`articles/delete/${props.id}`)
        .then((response) => {
          if (response.data.value.success === true) {
            dispatch(removeModelsFromItemsListReducer());
            GET("articles")
              .then((result) => {
                dispatch(addModelToItemsListReducer(result.data.value));
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log(response.data.value.message);
          }
        })
        .catch((error) => {
          console.log(error);
        }); 

  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={deleteArticleHandler}
    >
      حذف
    </button>
  );
};

export default DeleteArticle;
