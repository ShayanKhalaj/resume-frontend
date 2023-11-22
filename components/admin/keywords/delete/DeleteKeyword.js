import React from 'react'
import CustomButton from '../../../../ui/customUi/button/CustomButton'
import CrudRepository from '../../../../repositories/cruds/CrudRepository'
import { useDispatch } from 'react-redux'
import { addToItemsReducer, removeFromItemsReducer } from '../../../../redux/features/admin/AdminSlice'

const DeleteKeyword = (props) => {
    const dispatch=useDispatch()

    const deleteKeyword = async()=>{
        await CrudRepository.delete(`keywords/delete/${props.id}`)
        .then(response=>{
            if(response.data.success===true){
                dispatch(removeFromItemsReducer())
                dispatch(addToItemsReducer(response.data))
            }
        })
      
    }
  return (
    <CustomButton click={deleteKeyword} variant="danger">
      حذف
    </CustomButton>
  )
}

export default DeleteKeyword