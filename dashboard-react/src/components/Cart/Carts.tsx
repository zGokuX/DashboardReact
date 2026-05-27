import { useEffect, useState } from 'react'
import CartsModal from './CartsModal'
import ConfirmModal from './ConfirmModal'
import UserDetail from '../User/UserDetailModal'
import CartTable from './CartTable'
import PaginationPage from '../Common/PaginationPage'
import { useDispatch, useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async';
import {
  fetchCartsRequest,
  selectCarts,
  selectCartsTotal,
  deleteCart as deleteCartAction,
} from '@/store/slices/cartsSlice'

import { deleteCart as deleteCartRequest, fetchFilterUserNames } from '@/services/requests'

import { Cart } from './carts.type'
import CartHeader from './cartHeader'
import NotificationCartDelete from './NotificationCartDelete'
import { ITEM_PER_PAGE } from '@/Constants'

export default function Carts(props: any) {
  const dispatch = useDispatch()

  const [showToast, setShowToast] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectSingleCart, setSelectSingleCart] = useState(null)
  const [pagination, setPagination] = useState(0)
  const [userDetailModalShow, setUserDetailModalShow] = useState(false)
  const [selectCart, setSelectCart] = useState<any>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectUserByIdCart, setSelectUserByIdCart] = useState(null)

  const cartList: Cart[] = useSelector(selectCarts)
  const totalCarts = useSelector(selectCartsTotal)

  useEffect(() => {
    dispatch(
      fetchCartsRequest({
        pageSize: ITEM_PER_PAGE,
        page: pagination,
      })
    )
  }, [dispatch, pagination])

  function detailsButton(cart: any) {
    setSelectSingleCart(cart)
    setShowModal(true)
  }

  async function removeCart(cartId: number) {
    try {
      // DELETE API
      await deleteCartRequest(cartId)

      // UPDATE REDUX STATE
      dispatch(deleteCartAction({ id: cartId }))

      // TOAST
      setShowToast(true)
    } catch (error) {
      console.error('Errore eliminazione carrello:', error)
    }
  }

  function openModalDetail(e: any, cartId: any) {
    e.preventDefault()

    setSelectUserByIdCart(cartId)
    setUserDetailModalShow(true)
  }
  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  const promiseOptions = async (inputValue: string) => {
    const response = await fetchFilterUserNames(inputValue).then((res) => res.map(item => {
      return {
        value: item.id,
        label: item.firstName + " " + item.lastName
      }
    }))
    console.log(response)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(response);
      }, 300);
    });

  };

  return (
    <>

      {showConfirmModal && selectCart && (
        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          cart={selectCart}
          onCartDelete={removeCart}
        />
      )}

      {showModal && selectSingleCart && (
        <CartsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          products={selectSingleCart}
        />
      )}

      {userDetailModalShow && (
        <UserDetail
          show={userDetailModalShow}
          onHide={() => setUserDetailModalShow(false)}
          userId={selectUserByIdCart}
        />
      )}

      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />

      <div className='clienti container-full-width'>
        <div className='card client-card'>
          <CartHeader inPage={props.inPage} />

          <CartTable
            cartList={cartList}
            detailsButton={detailsButton}
            userId={props.userId}
            inPage={props.inPage}
            setSelectCart={setSelectCart}
            setShowConfirmModal={setShowConfirmModal}
            openModalDetail={openModalDetail}
          />

          {props.inPage && (
            <PaginationPage
              setPagination={setPagination}
              pagination={pagination}
              totalUsers={totalCarts}
            />
          )}
        </div>

        <NotificationCartDelete
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </div>
    </>
  )
}