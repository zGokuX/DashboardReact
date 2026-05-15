import { useEffect, useState } from 'react'
import CartsModal from './CartsModal'
import ConfirmModal from './ConfirmModal'
import UserDetail from '../User/UserDetailModal'
import CartTable from './CartTable'
import PaginationPage from '../Common/PaginationPage'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchCartsRequest,
  selectCarts,
  selectCartsTotal,
  deleteCart as deleteCartAction,
} from '@/store/slices/cartsSlice'

import { deleteCart as deleteCartRequest } from '@/services/requests'

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
    setSelectSingleCart(cart.products)
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