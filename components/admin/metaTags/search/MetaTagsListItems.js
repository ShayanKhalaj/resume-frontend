import React from 'react'
import CustomGrid from '../../../../ui/gridUi/CustomGrid';
import CustomModal from '../../../../ui/modalUi/CustomModal';
import { useSelector } from 'react-redux';
import EditMetaTag from '../edit/EditMetaTag';
import DeleteMetaTag from '../delete/DeleteMetaTag';

const MetaTagsListItems = () => {

    const tagsListSelector = useSelector((state)=>state.admin.items)

  return (
    <CustomGrid
    ths={
      <tr>
        <th>شناسه</th>
        <th>نام</th>
        <th>تگ</th>
        <th>توضیحات</th>
        <th>مقاله</th>
        <th></th>
        <th></th>
      </tr>
    }
    tds={tagsListSelector.map((item) => {
      return (
        <tr key={item.id}>
          <th>{item.id}</th>
          <th>{item.tagName}</th>
          <th>{item.tag}</th>
          <th>{item.description}</th>
          <th>{item.articleID}</th>
          <th>
            <CustomModal title="ویرایش متا تگ" className="btn btn-warning">
              <EditMetaTag data={item}/>
            </CustomModal>
          </th>
          <th>
            <DeleteMetaTag id={item.id}/>
          </th>
        </tr>
      );
    })}
  />
  )
}

export default React.memo(MetaTagsListItems)