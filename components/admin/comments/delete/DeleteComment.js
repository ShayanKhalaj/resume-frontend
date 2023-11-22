import React from 'react'
import CustomButton from '../../../../ui/customUi/button/CustomButton'
import CrudRepository from '../../../../repositories/cruds/CrudRepository'
import { useDispatch } from 'react-redux'
import { addToItemsReducer, removeFromItemsReducer } from '../../../../redux/features/admin/AdminSlice'

const DeleteComment = (props) => {
    const dispatch=useDispatch()

    const deleteComment = async()=>{
        await CrudRepository.delete(`comments/delete/${props.id}`)
        .then(response=>{
            if(response.data.value.success===true){
                CrudRepository.getAll('comments')
                .then(results=>{
                    dispatch(removeFromItemsReducer())
                    dispatch(addToItemsReducer(results.data.value))
                })
            }
        })
    }
  return (
    <CustomButton click={deleteComment} variant="danger">
      حذف
    </CustomButton>
  )
}

export default DeleteComment