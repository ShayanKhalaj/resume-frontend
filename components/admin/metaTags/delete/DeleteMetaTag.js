import React from 'react'
import CustomButton from '../../../../ui/customUi/button/CustomButton'
import CrudRepository from '../../../../repositories/cruds/CrudRepository'
import { useDispatch } from 'react-redux'
import { addToItemsReducer, removeFromItemsReducer } from '../../../../redux/features/admin/AdminSlice'

const DeleteMetaTag = (props) => {

    const dispatch = useDispatch()

    const deleteTag =async()=>{
        await CrudRepository.delete(`tags/delete${props.id}`)
        .then(response=>{
            if(response.data.value.success===true)
            {
                CrudRepository.getAll('tags')
                .then(results=>{
                    dispatch(removeFromItemsReducer())
                    dispatch(addToItemsReducer(results.data.value))
                })
            }
            else{
                alert(`${response.data.value.message} : ${response.data.value.errors}`)
            }
        })
    } 

  return (
    <CustomButton click={deleteTag} variant="danger">
    حذف
  </CustomButton>
  )
}

export default DeleteMetaTag