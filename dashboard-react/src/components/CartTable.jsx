import { useState } from "react";
import { Button } from "react-bootstrap";
import CartsModal from "./CartsModal";

export default function CartTable({ cartList, ...props }) {
    const [showModal,setShowModal] = useState(false)
    const [selectCart, setSelectCart] = useState([])
    return (
        <>
        {showModal &&
            <CartsModal
            cart={selectCart}
            show={showModal}
            onHide={() => setShowModal(false)}
            />
        }
        <table className="card-table">
            <thead>
                <tr className="table-header">
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
                                        onClick={() => {
                                            setShowModal(true)
                                            setSelectCart(item)
                                        }}
                                    >
                                        details
                                    </Button>
                                </td>

                            </tr>
                        );
                    })}
            </tbody>
        </table>
        </>
    )
}