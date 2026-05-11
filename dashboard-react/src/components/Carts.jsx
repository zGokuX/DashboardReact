import { useEffect, useState } from "react";
import { fetchCarts } from "../services/requests";
import CartsModal from "./CartsModal";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import UserDetail from "./UserDetailModal";
import { Toast, ToastContainer } from "react-bootstrap";
import CartTable from "./CartTable";
import PaginationPage from "./PaginationPage";

const ITEM_PER_PAGE = 25;

export default function Carts(props) {
    const [showToast, setShowToast] = useState(null)
    const [cartList, setCartList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalCarts, setTotalCarts] = useState(0);
    const [selectSingleCart, setSelectSingleCart] = useState(null);
    const [pagination, setPagination] = useState(0);
    const [userDetailModalShow, setUserDetailModalShow] = useState(false)
    const [selectCart, setSelectCart] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectUserByIdCart, setSelectUserByIdCart] = useState(null)

function setPage(currentValue, goOn) {
    console.log(currentValue, goOn)
    if (goOn && currentValue <= 7) {
      setPagination(currentValue + 1)
      return currentValue + 1
    } else if (!goOn) {
      setPagination(currentValue - 1)
      currentValue = currentValue - 1
    }
    if (currentValue > Math.ceil(totalCarts / ITEM_PER_PAGE) - 1) {
      setPagination(currentValue)
    }
    if (currentValue <= 0) {
      setPagination(0)
      return 0
    }
    return currentValue
  }

    useEffect(() => {
        async function getCart(userId) {
            const cart = await fetchCarts(userId, props.maxViewCarts);

            setCartList(cart.carts);
            setTotalCarts(cart.total);
        }
        getCart(1);
    }, []);



    useEffect(() => {
        fetchCarts(1, ITEM_PER_PAGE, pagination).then((res) => {
            setCartList(res.carts);
        });
    }, [pagination]);

    function detailsButton(cart) {
        setSelectSingleCart(cart);
        setShowModal(true);
    }

    function removeCart(cartId) {
        setCartList((currentList) =>
            currentList.filter((item) => item.id !== cartId)
        );
        setShowToast(true)
    }

    function openModalDetail(e, cart) {
        e.preventDefault()
        setSelectUserByIdCart(cart)
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
                    showNotification={(showNotificationVar) => {
                        if (showNotificationVar) {
                            console.log("ciao")
                            setShowToast(true)
                        }
                    }}
                />
            )}

            {showModal && selectSingleCart && (
                <CartsModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    cart={selectSingleCart}
                />
            )}

            {userDetailModalShow &&
                <UserDetail
                    show={userDetailModalShow}
                    onHide={() => setUserDetailModalShow(false)}
                    userId={selectUserByIdCart}
                />


            }

            <div className="clienti container-full-width">
                <div className="card client-card">
                    <div className="card-title">
                        <span>
                            <i className="fa-solid fa-cart-shopping"></i>
                            Carts
                        </span>

                        {!props.inPage && (
                            <div
                                className="card-actions"
                                id="btn-card-actions"
                            >
                                <nav>
                                    <Link to="/cards">
                                        <span className="card-action-list">
                                            Vedi Tutti
                                        </span>
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>

                    <CartTable
                        cartList={cartList}
                        openModalDetail={openModalDetail}
                        detailsButton={detailsButton}
                        setSelectCart={setSelectCart}
                        setShowConfirmModal={setShowConfirmModal}
                        userId={props.userId}
                        inPage={props.inPage}
                    />

                    {props.inPage && (
                        <PaginationPage
                        setPage={setPage}
                        pagination={pagination}
                        totalUsers={totalCarts}
                        ITEM_PER_PAGE={ITEM_PER_PAGE}
                        />
                    )}
                </div>
                <ToastContainer
                    className="p-3"
                    position="bottom-end"
                    style={{ zIndex: 1, position: "fixed" }}
                >
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Eliminazione Cart</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>

                        <Toast.Body>Dati del cart eliminati!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </>
    );
}