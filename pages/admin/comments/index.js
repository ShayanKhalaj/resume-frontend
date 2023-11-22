import React from 'react'
import AdminIndex from "../../../ui/wireframeUi/admin/AdminIndex";
import CommentSearchModel from '../../../components/admin/comments/search/CommentSearchModel';
import CommentsListItems from '../../../components/admin/comments/search/CommentsListItems';

const index = () => {
  return (
    <AdminIndex
    searchModel={<CommentSearchModel />}
      listItems={<CommentsListItems/>}
      title="مدیریت نظرات"
    />
  )
}

export default index