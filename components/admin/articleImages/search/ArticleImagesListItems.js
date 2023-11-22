import React from "react";
import { useSelector } from "react-redux";
import CustomModal from "../../../../ui/modalUi/CustomModal";
import CustomGrid from "../../../../ui/gridUi/CustomGrid";
import EditArticleImages from "../edit/EditArticleImages";
import DeleteArticleImage from "../delete/DeleteArticleImage";

const ArticleImagesListItems = React.memo((props) => {
  const articleImagesSelector = useSelector((state) => state.admin.items);

  return (
    <CustomGrid
      ths={
        <tr>
          <th>شناسه</th>
          <th>آدرس عکس</th>
          <th>متن جایگزین</th>
          <th>توضیحات</th>
          <th>مقاله</th>
          <th></th>
          <th></th>
        </tr>
      }
      tds={articleImagesSelector.map((item) => {
        return (
          <tr key={item.id}>
            <th>{item.id}</th>
            <th>{item.imageUrl}</th>
            <th>{item.imageAlter}</th>
            <th>{item.description}</th>
            <th>{item.articleId}</th>
            <th>
              <CustomModal title="ویرایش عکس" className="btn btn-warning">
                <EditArticleImages data={item} />
              </CustomModal>
            </th>
            <th>
              <DeleteArticleImage id={item.id} />
            </th>
          </tr>
        );
      })}
    />
  );
})

export default ArticleImagesListItems;
