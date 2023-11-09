import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import EditModal from '../../../framework/admin/modal/EditModal'
import EditCategory from '../edit/EditCategory'
import DeleteCategory from '../delete/DeleteCategory'

const CategoriesListItems = () => {
    const categoriesSearchList = useSelector(state=>state.crud.items)

  return (
    <Table bordered striped hover size='sm' className='top'>
        <thead>
            <tr>
                <th>شناسه</th>
                <th>نام</th>
                <th>توضیحات</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {categoriesSearchList.map(item=>{
                return <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.description}</td>
                    <td>
                        <EditModal variant='warning'
                        modalBody={<EditCategory data={item}/>}
                        modalTitle='ویرایش دسته بندی'
                        modalFooter={false}
                        buttonTitle='ویرایش'/>
                    </td>
                    <td>
                        <DeleteCategory id={item.id}/>
                    </td>
                </tr>
            })}
        </tbody>
    </Table>
  )
}

export default CategoriesListItems