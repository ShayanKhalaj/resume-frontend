import React from 'react'
import AdminIndex from '../../../ui/wireframeUi/admin/AdminIndex'
import MetaTagsSearchModel from '../../../components/admin/metaTags/search/MetaTagSearchModel'
import MetaTagsListItems from '../../../components/admin/metaTags/search/MetaTagsListItems'

const index = () => {
  return (
    <AdminIndex
    searchModel={<MetaTagsSearchModel/>}
      listItems={<MetaTagsListItems/>}
      title="مدیریت تگهای متا"
    />
  )
}

export default index