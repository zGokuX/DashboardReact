import { useState } from "react";
import { Button } from "react-bootstrap";
import CartsModal from "./CartsModal";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import ProductsTable from "./ProductTable";

export default function CartTable({ cartList, ...props }) {
    const [showModal, setShowModal] = useState(false)
    const [selectCart, setSelectCart] = useState([])
    const [cart, setCart] = useState(cartList)
    const [selectProduct, setSelectProduct] = useState([])
    const [openedUserId, setOpenedUserId] = useState(null)

    function showProduct(item) {
        if (openedUserId === item.id) {
            setOpenedUserId(null)
            setSelectProduct([])
        } else {
            setOpenedUserId(item.id)
            setSelectProduct(item.products)
        }
    }
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
                                        {props.inUser &&
                                            <Button
                                                className="text-nowrap"
                                                variant="outline-primary"
                                                onClick={() => {
                                                    showProduct(item)
                                                }}
                                            >
                                                Mostra Prodotti {openedUserId === item.id ? <CaretUpFill /> : <CaretDownFill />}
                                            </Button>
                                        }
                                    </td>

                                </tr>


                            );
                        })}
                    {
                        selectProduct.length > 0 &&
                        <tr>
                            <td colSpan="5">
                                <ProductsTable
                                    productList={selectProduct}
                                    modalMode={false}
                                    isCarts={false}
                                    inUser={true}
                                    showMoreOption={false}
                                />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}