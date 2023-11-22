import React from 'react'
import AdminIndex from "../../../ui/wireframeUi/admin/AdminIndex";
import KeywordSearchModel from '../../../components/admin/keywords/search/KeywordSearchModel';
import KeywordsListItems from '../../../components/admin/keywords/search/KeywordsListItems';


const index = () => {
  return (
    <AdminIndex
    searchModel={<KeywordSearchModel/>}
      listItems={<KeywordsListItems/>}
      title="مدیریت کلیدواژگان"
    />
  )
}

export default index