import { useEffect, useState } from "react";
import { fetchCarts } from "../services/requests";
import CartsModal from "./CartsModal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import UserDetail from "./UserDetailModal";
import { TrashFill } from "react-bootstrap-icons";
import { Toast, ToastContainer } from "react-bootstrap";

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

                    <table className="card-table">
                        <thead>
                            <tr className="table-header">
                                <th className="col nome">Utente id</th>
                                <th className="col nome">
                                    Prodotti Totali
                                </th>
                                <th className="col cliente">Quantità</th>
                                <th className="col stato">Totale</th>
                                <th className="col stato">
                                    Sconto totale
                                </th>
                                <th style={{ "width": "150px" }} className="col stato"></th>
                            </tr>
                        </thead>

                        <tbody id="bodyTable2">
                            {cartList
                                .filter((item) => {
                                    if (!props.userId) return true;

                                    return props.userId === item.userId;
                                })
                                .map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><a href="#" onClick={(e) => openModalDetail(e, item.userId)}>Utente {item.userId}</a></td>
                                            <td>{item.totalProducts}</td>
                                            <td>{item.totalQuantity}</td>
                                            <td>
                                                € {Math.round(item.total)}
                                            </td>
                                            <td>
                                                €
                                                {Math.round(
                                                    item.discountedTotal
                                                )}
                                            </td>

                                            <td className="d-flex gap-3">
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        detailsButton(item)
                                                    }
                                                >
                                                    details
                                                </Button>
                                                {props.inPage &&
                                                    <Button variant="danger">
                                                        <TrashFill
                                                            size={20}
                                                            onClick={() => {
                                                                setSelectCart(item);
                                                                setShowConfirmModal(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </TrashFill>
                                                    </Button>
                                                }
                                            </td>

                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>

                    {props.inPage && (
                        <ul className="pagination">
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        setPagination((currentValue) => {
                                            if (currentValue <= 0) {
                                                return 0;
                                            }

                                            return currentValue - 1;
                                        });
                                    }}
                                >
                                    Previous
                                </a>
                            </li>

                            {pagination > 0 && (
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            setPagination(
                                                (currentValue) =>
                                                    currentValue - 1
                                            );
                                        }}
                                    >
                                        {pagination}
                                    </a>
                                </li>
                            )}

                            <li className="page-item">
                                <a className="page-link" href="#">
                                    {pagination + 1}
                                </a>
                            </li>

                            {pagination <
                                Math.ceil(totalCarts / ITEM_PER_PAGE) -
                                1 && (
                                    <li className="page-item">
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setPagination(
                                                    (currentValue) =>
                                                        currentValue + 1
                                                );
                                            }}
                                        >
                                            {pagination + 2}
                                        </a>
                                    </li>
                                )}

                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        setPagination((currentValue) => {
                                            if (
                                                currentValue ===
                                                Math.ceil(
                                                    totalCarts /
                                                    ITEM_PER_PAGE
                                                ) -
                                                1
                                            ) {
                                                return currentValue;
                                            }

                                            return currentValue + 1;
                                        });
                                    }}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
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