import React from 'react'
import { useSelector } from 'react-redux';
import CustomModal from '../../../../ui/modalUi/CustomModal';
import CustomGrid from '../../../../ui/gridUi/CustomGrid';
import EditComment from '../edit/EditComment';
import DeleteComment from '../delete/DeleteComment';

const CommentsListItems = () => {

    const commentsListSelector = useSelector((state)=>state.admin.items)

  return (
    <CustomGrid
    ths={
      <tr>
        <th>شناسه</th>
        <th>نام</th>
        <th>متن</th>
        <th>پاسخ داده شده</th>
        <th>دیده شده</th>
        <th>تایید شده</th>
        <th></th>
        <th></th>
      </tr>
    }
    tds={commentsListSelector.map(item=>{
      return (
        <tr key={item.id}>
          <th>{item.id}</th>
          <th>{item.name}</th>
          <th>{item.text}</th>
          <th>{item.isAnswered}</th>
          <th>{item.hasSeen}</th>
          <th>{item.isAccepted}</th>
          <th>
            <CustomModal title='ثبت پاسخ' className='btn btn-info'>
            <EditComment data={item}/>
            </CustomModal>
          </th>
          <th>
            <DeleteComment id={item.id}/>
          </th>
        </tr>
      );
    })}
  />
  )
}

export default CommentsListItems