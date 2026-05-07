import { useEffect, useState } from "react"
import { fetchCarts } from "../services/requests"
import CartsModal from "./CartsModal"
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CartsView from "../views/CartsView";

const ITEM_PER_PAGE = 25

export default function Carts(props) {
    const [cartList, setCartList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [cartLength, setCartLength] = useState(0)
    const [totalCarts, setTotalCarts] = useState(0)
    const [selectSingleCart, setSelectSingleCart] = useState(null)
    const [pagination, setPagination] = useState(0)
    useEffect(() => {
        getCart(1)
    }, [])

    async function getCart(userId) {
        const cart = await fetchCarts(userId, props.maxViewCarts)
        setCartList(cart.carts)
        setTotalCarts(cart.total)
    }

    useEffect(() => {
    
        fetchCarts(1,ITEM_PER_PAGE, pagination).then((res) => {
          setCartList(res.carts)
        })
      }, [pagination])

    function detailsButton(cart) {
        setSelectSingleCart(cart)
        setShowModal(true)
    }

    return (
        <>
            {showModal &&
                <>
                    <CartsModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        cart={selectSingleCart}
                    />
                </>
            }
            <div className="clienti container-full-width">
                <div className="card client-card">
                    <div className="card-title">
                        <span><i className="fa-solid fa-cart-shopping"></i>Carts</span>

                        {!props.inPage &&
                            <div className="card-actions" id="btn-card-actions">
                                <nav>
                                    <Link to="/cards"><span className="card-action-list">Vedi Tutti</span></Link>
                                </nav>
                            </div>
                        }

                    </div>
                    <table className="card-table">
                        <thead>
                            <tr className="table-header">
                                <th className="col nome">Utente id</th>
                                <th className="col nome">Prodotti Totali</th>
                                <th className="col cliente">Quantità</th>
                                <th className="col stato">Totale</th>
                                <th className="col stato">Sconto totale</th>
                                <th className="col stato"></th>
                            </tr>
                        </thead>

                        <tbody id="bodyTable2">

                            {cartList.filter(item => {
                                if (!props.userId) {
                                    return true
                                }

                                if (props.userId === item.userId) {

                                    return true
                                }
                                return false
                            }).map(item => {
                                return (

                                    <tr key={item.id}>
                                        <td>{item.userId}</td>
                                        <td>{item.totalProducts}</td>
                                        <td>{item.totalQuantity}</td>
                                        <td>€ {Math.round(item.total)}</td>
                                        <td>€ {Math.round(item.discountedTotal)}</td>
                                        {/* <td><Button variant="outline-primary" onClick={() => {
                                            props.productItem
                                                .filter(product => product.id === item.id)
                                                .forEach(product => {
                                                    setSelectSingleProduct(product)
                                                    setShowModal(true)
                                                })
                                        }}>
                                            details
                                        </Button></td> */}
                                        <td><Button variant="outline-primary" onClick={() => detailsButton(item)}>
                                            details
                                        </Button></td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                    {props.inPage &&
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                                e.preventDefault()
                                setPagination(currentValue => {
                                    if (currentValue <= 0) {
                                        return 0
                                    } else {
                                        return currentValue - 1
                                    }
                                })

                            }}>Previous</a></li>

                            {pagination > 0 &&
                                <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault()
                                    setPagination(currentValue => {
                                        return currentValue - 1
                                    })

                                }}>{pagination}</a></li>
                            }

                            <li className="page-item"><a className="page-link" href="#">{pagination + 1}</a></li>


                            {pagination < (Math.ceil(totalCarts / ITEM_PER_PAGE) - 1) &&
                                <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault()
                                    setPagination(currentValue => {

                                        return currentValue + 1

                                    })

                                }}>{pagination + 2}</a></li>
                            }
                            <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                                e.preventDefault()

                                setPagination(currentValue => {
                                    if (currentValue == Math.ceil(totalCarts / ITEM_PER_PAGE) - 1) {
                                        return currentValue
                                    } else {
                                        return currentValue + 1
                                    }
                                })



                            }}>Next</a></li>
                        </ul>
                    }
                </div>

            </div >

        </>
    )
}