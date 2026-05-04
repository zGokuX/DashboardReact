import { useEffect, useState } from "react"
import { fetchCarts } from "../services/requests"

export default function Carts() {
    const [cartList, setCartList] = useState([])
        useEffect(() => {
            getCart(1)
        }, [])
    
        async function getCart(userId) {
            const cart = await fetchCarts(userId)
            setCartList(cart)
        }
    return (
        <>
            <div className="card container-card">
                <div className="card-title">
                    <span>Carts<i className="fa-solid fa-cart-shopping"></i></span>
                    <span className="card-action">Vedi Tutti</span>
                </div>
                <table className="card-table">
                    <thead>
                        <tr className="table-header">
                            <th className="col nome">Prodotti Totali</th>
                            <th className="col cliente">Quantità</th>
                            <th className="col stato">Totale</th>

                        </tr>
                    </thead>

                    <tbody id="bodyTable2">
                         {cartList.map(item => {
                            return (

                                <tr key={item.id}>
                                    <td>{item.totalProducts}</td>
                                    <td>{item.totalQuantity}</td>
                                    <td>€ {Math.round(item.total)}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}