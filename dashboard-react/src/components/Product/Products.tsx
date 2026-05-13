import { useEffect, useState } from 'react'
import { fetchAllCategories } from '@/services/requests'
import ProductsTable from './ProductTable'
import Graphic from '@/layouts/Graphic'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadFilteredProducts,
  loadProducts,
  selectProducts,
} from '@/store/slices/productsSlice'
import { UnknownAction } from '@reduxjs/toolkit'
import { ITEM_PER_PAGE } from '@/Constants'

export default function Products(props : any) {
  const productList = useSelector(selectProducts)
  const dispatch = useDispatch()
  const [filterCategory, setFilterCategory] = useState('default')
  const [categoryList, setCategoryList] = useState([])
  


  useEffect(() => {
    dispatch(loadProducts({pageSize: ITEM_PER_PAGE, page: 0, userId: 1}) as unknown as UnknownAction)
    fetchAllCategories().then(res => {
      setCategoryList(res)
      console.log(res)
    })
  }, [])
  useEffect(() => {
    if (props.onProductsListChange) {
      props.onProductsListChange(productList)
    }
  }, [props, productList])

  function titleProcess(text : string) {
    const result = text.charAt(0).toUpperCase() + text.slice(1)

    return result
  }

  function filterProductsCategory(value : string) {
    console.log(value)
    if (!value) {
      return
    }
    value === 'default'
      ? dispatch(loadProducts({ pageSize: ITEM_PER_PAGE, page: 0, userId: 1 }) as unknown as UnknownAction)
      : dispatch(loadFilteredProducts({ categoryId: value }) as unknown as UnknownAction)
  }

  return (
    <>
      {props.inPage && <Graphic />}

      <div className='clienti container-full-width'>
        <div className='card client-card'>
          <div className='card-title'>
            <span>
              <i className='fa-solid fa-list'></i>Products
            </span>
            {!props.inPage && (
              <div className='card-actions' id='btn-card-actions'>
                <nav>
                  <Link to='/products'>
                    <span className='card-action-list'>Vedi Tutti</span>
                  </Link>
                </nav>
              </div>
            )}

            {/* TODO creare un componente productsFilter  */}
            {props.inPage && (
              <Form.Select
                className='w-25'
                aria-label='Default select example'
                defaultValue={filterCategory}
                onChange={e => {
                  // todo spostare tutta la logica dentro il filterProductsCategory -> ricevera e e fa tutte le operazioni 
                  const value = e.target.value
                  setFilterCategory(value)
                  filterProductsCategory(value)
                }}
              >
                <option value='default'>Categoria</option>
                {categoryList.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {titleProcess(item.replace('-', ' '))}
                    </option>
                  )
                })}
              </Form.Select>
            )}
          </div>
          <ProductsTable productList={productList} inPage={props.inPage} />
        </div>
      </div>
    </>
  )
}
