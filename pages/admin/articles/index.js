import React from 'react'
import ArticleSearchModel from '../../../components/admin/articles/search/ArticleSearchModel'
import AdminIndex from '../../../ui/wireframeUi/admin/AdminIndex'
import ArticlesListItems from '../../../components/admin/articles/search/ArticlesListItems'

const index = () => {
  return (
    <AdminIndex
      searchModel={<ArticleSearchModel />}
      listItems={<ArticlesListItems/>}
      title="مدیریت مقالات"
    />
  )
}

export default index