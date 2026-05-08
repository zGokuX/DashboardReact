import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { fetchProducts } from "../services/requests"
import ProductModal from "./ProductModal"
const ITEM_PER_PAGE = 25
export default function ProductsTable(props) {
    const [selectProduct, setSelectProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [pagination, setPagination] = useState(0);
    function detailsProductButton(product) {
        setSelectProduct(product)
        setShowModal(true)
    }

    useEffect(() => {
        fetchProducts(1, ITEM_PER_PAGE, pagination).then((res) => {
            if (props.setProductList) {
                props.setProductList(res.products)
            }

        });
    }, [pagination]);

    return (
        <>
            {showModal &&
                <>
                    <ProductModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        product={selectProduct}
                    />
                </>
            }
            <table className="card-table invoices-table" id="table-products">
                <thead>
                    <tr className="table-header">
                        <th>Id prodotto</th>
                        <th>Immagine prodotto</th>
                        <th>Nome prodotto</th>
                        <th>{props.modalMode && props.isCarts ? 'Quantità' : 'Categoria'}</th>
                        <th>Prezzo</th>
                        {!props.isCarts &&
                            <th>Disponibilità</th>
                        }

                        <th>Sconto</th>
                        {!props.isCarts && !props.modalMode &&

                            <th></th>
                        }
                        {
                            props.modalMode && props.showMoreOption && (
                                <>
                                    <th>Descrizione prodotto</th>
                                    <th>Valutazioni</th>
                                </>
                            )
                        }
                    </tr>
                </thead>
                <tbody id="bodyTable">
                    {props.productList.map((item) => {
                        return (

                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><img style={{ display: "flex" }} width="50px" src={item.thumbnail} alt="Products Avatar" /></td>
                                <td>{item.title}</td>
                                <td>{props.modalMode && props.isCarts ? item.quantity : item.category}</td>
                                <td>€ {Math.round(item.price)}</td>
                                {!props.isCarts &&
                                    <td>{item.availabilityStatus}</td>
                                }

                                <td>{item.discountPercentage}%</td>

                                {
                                    !props.isCarts && props.showMoreOption ? (
                                        <>
                                            <td>{item.description}</td>
                                            <td>{item.reviews?.map((reviewItem, index) => {
                                                return <p key={reviewItem.id ?? index}>Rating: {reviewItem.rating} Comment: {reviewItem.comment}</p>
                                            })}</td>

                                        </>) : (
                                        <>

                                        </>
                                    )
                                }
                                {!props.isCarts && !props.modalMode &&
                                    <td>
                                        <Button variant="outline-primary" onClick={() => detailsProductButton(item)}>
                                            See more
                                        </Button>
                                    </td>
                                }
                            </tr>

                        )
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

                    {pagination < 7 - 1 && (
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();

                                    setPagination((currentValue) => currentValue + 1);
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
                                    if (currentValue >= 7) {
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
        </>
    )
}