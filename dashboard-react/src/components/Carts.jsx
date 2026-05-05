import { useEffect, useState } from "react"
import { fetchCarts } from "../services/requests"
import CartsModal from "./CartsModal"
import Button from 'react-bootstrap/Button';

export default function Carts(props) {
    const [cartList, setCartList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectSingleCart, setSelectSingleCart] = useState(null)
    useEffect(() => {
        getCart(1)
    }, [])

    async function getCart(userId) {
        const cart = await fetchCarts(userId, props.maxViewCarts)
        setCartList(cart)
    }

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
                        <span>Carts<i className="fa-solid fa-cart-shopping"></i></span>
                        <div className="card-actions" id="btn-card-actions">
                            <span className="card-action-list">Vedi Tutti</span>
                        </div>
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
                </div>
            </div>
        </>
    )
}