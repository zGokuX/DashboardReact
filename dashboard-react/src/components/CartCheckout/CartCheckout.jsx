import {
    selectUserProduct,
    addToCart,
    removeToCart
} from "@/store/slices/productsSlice"

import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function CartCheckout() {
    const dispatch = useDispatch()
    const listCart = useSelector(selectUserProduct)

    const groupedCart = listCart.reduce((acc, item) => {
        const existing = acc.find(
            el => el.product === item.product
        )

        if (existing) {
            existing.quantity += 1
            existing.totalPrice += item.price
        } else {
            acc.push({
                ...item,
                quantity: 1,
                totalPrice: item.price
            })
        }

        return acc
    }, [])

    const total = listCart.reduce((acc, item) => {
        return acc + item.price
    }, 0)

    return (
        <div
            className="card"
            style={{ minHeight: "100vh" }}
        >
            <div className="card-title d-flex justify-content-between">
                <h1>IL TUO CARRELLO</h1>

                {listCart.length > 0 && (
                    <Link to="/checkin">
                        <Button variant="outline-primary">
                            Procedi al pagamento
                        </Button>
                    </Link>
                )}
            </div>

            {groupedCart.length > 0 && (
                <h4>
                    Prodotti totali{" "}
                    {groupedCart.reduce((acc, item) => {
                        return acc + item.quantity
                    }, 0)}
                </h4>
            )}

            {listCart.length === 0 && (
                <>
                    <p className="fs-4">
                        Nessun oggetto nel carrello
                    </p>

                    <Link to="/products">
                        <p>
                            Vai ai prodotti{" "}
                            <i className="fa-solid fa-list"></i>
                        </p>
                    </Link>
                </>
            )}

            <table className="table">
                <thead>
                    {groupedCart.length > 0 && (
                        <tr>
                            <th></th>
                            <th>Nome prodotto</th>
                            <th>Quantità</th>
                            <th>Prezzo</th>
                        </tr>
                    )}
                </thead>

                <tbody>
                    {groupedCart.map((item, index) => (
                        <tr key={index}>
                          

                            <td>
                                <img
                                    src={item.image}
                                    height={70}
                                    alt={item.product}
                                />
                            </td>

                            <td>{item.product}</td>

                            <td>
                                <div className="quantityBox">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() =>
                                            dispatch(removeToCart(item))
                                        }
                                    >
                                        -
                                    </button>

                                    <span className="mx-2">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() =>
                                            dispatch(addToCart(item))
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </td>

                            <td>
                                € {Math.round(item.totalPrice)}
                            </td>
                        </tr>
                    ))}

                    {groupedCart.length > 0 && (
                        <tr>
                            <td>
                                <span className="fs-5">
                                    Totale
                                </span>
                            </td>

                            <td></td>
                            <td></td>

                            <td>
                                <b>
                                    <span className="fs-5">
                                        € {Math.round(total)}
                                    </span>
                                </b>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}