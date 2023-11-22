import React from 'react'
import AdminIndex from '../../../ui/wireframeUi/admin/AdminIndex'
import ArticleImageSearchModel from '../../../components/admin/articleImages/search/ArticleImageSearchModel'
import ArticleImagesListItems from '../../../components/admin/articleImages/search/ArticleImagesListItems'

const index = () => {
  return (
    <AdminIndex
    searchModel={<ArticleImageSearchModel />}
    listItems={<ArticleImagesListItems/>}
    title="مدیریت عکسهای مقالات"
  />
  )
}

export default index