import React from 'react'
import { useDispatch } from 'react-redux'
import { DELETE, GET } from '../../../../api/axios/AxiosRepository'
import { addModelToItemsListReducer, removeModelsFromItemsListReducer, showCreateModalReducer } from '../../../../redux/features/admin/CRUD_OperationsSlice'

const DeleteCategory = (props) => {
    const dispatch =useDispatch()
    
    const deleteCategory=async()=>{
        await DELETE(`categories/delete/${props.id}`)
        .then(response=>{
            if(response.data.success===true){
                dispatch(removeModelsFromItemsListReducer())
                GET('categories')
                .then(response=>{
                    dispatch(addModelToItemsListReducer(response.data.value))
                })
            }
            else{
                alert(`${response.data.message}:${response.data.errors}`)
            }
        })
        .then(error=>{
            console.log(error)
        })
    }
  return (
    <button className='btn btn-danger' onClick={deleteCategory} >حذف</button>
  )
}

export default DeleteCategory