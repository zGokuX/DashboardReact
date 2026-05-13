import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import ProductModal from "./ProductModal"
import PaginationPage from "../Common/PaginationPage"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, loadProducts, selectProductsTotal } from "@/store/slices/productsSlice"
import { BagPlusFill } from "react-bootstrap-icons"
export default function ProductsTable(props) {
    const [selectProduct, setSelectProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [pagination, setPagination] = useState(0);
    const totalProducts = useSelector(selectProductsTotal)
    const dispatch = useDispatch()
    function detailsProductButton(product) {
        setSelectProduct(product)
        setShowModal(true)
    }

    useEffect(() => {
        dispatch(loadProducts({ pageSize: 25, page: pagination, userId: 1 }))

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
                    {props.productList?.map((item) => {
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
                                {!props.isCarts && !props.modalMode && !props.inUser &&
                                    <td className="d-flex gap-2">
                                        <Button variant="outline-primary" onClick={() => detailsProductButton(item)}>
                                            See more
                                        </Button>
                                        {props.inPage &&
                                            < Button variant="outline-primary" onClick={() => dispatch(addToCart({product: item.title,price: item.price}))}>
                                        <BagPlusFill />
                                    </Button>
                                }

                            </td>
                                }
                            </tr>

                )
                    })}
            </tbody>
        </table >
        {
            props.inPage && (
                <PaginationPage
                    setPagination={setPagination}
                    pagination={pagination}
                    totalUsers={totalProducts}
                />
            )
        }
        </>
    )
}