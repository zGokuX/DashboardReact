import { useEffect, useState } from "react";
import CartsModal from "./CartsModal";
import ConfirmModal from "./ConfirmModal";
import UserDetail from "../User/UserDetailModal";
import CartTable from "./CartTable";
import PaginationPage from "../Common/PaginationPage";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  fetchCartsRequest,
  selectCarts,
  selectCartsTotal,
  deleteCart as deleteCartAction,
  selectSingleCarts,
  fetchSingleCartsRequest,
} from "@/store/slices/cartsSlice";

import {
  deleteCart as deleteCartRequest,
  fetchFilterUserNames,
} from "@/services/requests";

import { Cart } from "./carts.type";
import CartHeader from "./cartHeader";
import NotificationCartDelete from "./NotificationCartDelete";
import { ITEM_PER_PAGE } from "@/Constants";
import { Button } from "react-bootstrap";

export default function Carts(props: any) {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectSingleCart, setSelectSingleCart] = useState(null);
  const [pagination, setPagination] = useState(0);
  const [userDetailModalShow, setUserDetailModalShow] = useState(false);
  const [selectCart, setSelectCart] = useState<any>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectUserByIdCart, setSelectUserByIdCart] = useState(null);
  const [selectionSingleValue, setSelectionSingleValue] = useState(-1);
  const cartList: Cart[] = useSelector(selectCarts);
  const singleCart: Cart[] = useSelector(selectSingleCarts);
  const totalCarts = useSelector(selectCartsTotal);

  function requestData() {
    if (selectionSingleValue > 0) {
      dispatch(fetchSingleCartsRequest(selectionSingleValue));
      return;
    }
    dispatch(
      fetchCartsRequest({
        pageSize: ITEM_PER_PAGE,
        page: pagination,
      }),
    );
  }

  useEffect(() => {
    requestData();
  }, [dispatch, pagination, selectionSingleValue]);

  function detailsButton(cart: any) {
    setSelectSingleCart(cart);
    setShowModal(true);
  }

  async function removeCart(cartId: number) {
    try {
      await deleteCartRequest(cartId);

      dispatch(deleteCartAction({ id: cartId }));

      setShowToast(true);
    } catch (error) {
      console.error("Errore eliminazione carrello:", error);
    }
  }

  function openModalDetail(e: any, cartId: any) {
    e.preventDefault();

    setSelectUserByIdCart(cartId);
    setUserDetailModalShow(true);
  }

  const promiseOptions = async (inputValue: string) => {
    const response = await fetchFilterUserNames(inputValue).then((res) =>
      res.map((item) => {
        return {
          value: item.id,
          label: item.firstName + " " + item.lastName,
        };
      }),
    );
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
      {props.inPage && (
        <>
          <label>
            Qui puoi selezionare gli utenti per controllare i loro carrelli
          </label>
          <div className="d-flex gap-3 my-2 mx-0">
            <AsyncSelect
              cacheOptions
              defaultOptions
              className="w-25"
              loadOptions={promiseOptions}
              onChange={(e) => setSelectionSingleValue(e.value)}
            />
            {selectionSingleValue > 0 && (
              <Button
                style={{ width: "10rem" }}
                onClick={() => setSelectionSingleValue(-1)}
              >
                Resetta il filtro
              </Button>
            )}
          </div>
        </>
      )}

      <div className="clienti container-full-width">
        <div id="client-card" className="card client-card">
          <CartHeader inPage={props.inPage} />

          <CartTable
            cartList={selectionSingleValue > 0 ? singleCart : cartList}
            detailsButton={detailsButton}
            userId={props.userId}
            inPage={props.inPage}
            setSelectCart={setSelectCart}
            setShowConfirmModal={setShowConfirmModal}
            openModalDetail={openModalDetail}
          />

          {props.inPage && selectionSingleValue < 0 && (
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
  );
}
