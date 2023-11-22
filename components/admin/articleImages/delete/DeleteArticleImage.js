import React from 'react'
import CustomButton from '../../../../ui/customUi/button/CustomButton'
import CrudRepository from '../../../../repositories/cruds/CrudRepository'
import { useDispatch } from 'react-redux'
import { addToItemsReducer, removeFromItemsReducer } from '../../../../redux/features/admin/AdminSlice'

const DeleteArticleImage = (props) => {
  const dispatch = useDispatch()

    const deleteArticleImage=async()=>{
        await CrudRepository.delete(`articleImages/delete/${props.id}`)
        .then(response=>{
            alert(response.data.value.message)
            CrudRepository.getAll('articleImages')
            .then(results=>{
              dispatch(removeFromItemsReducer())
              dispatch(addToItemsReducer(results.data.value))
            })

        })
    }

  return (
    <CustomButton click={deleteArticleImage} variant='danger'>
        حذف
    </CustomButton>
  )
}

export default DeleteArticleImage