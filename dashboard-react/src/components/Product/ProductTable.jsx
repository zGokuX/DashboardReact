import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import ProductModal from "./ProductModal"
import PaginationPage from "../Common/PaginationPage"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, fetchProductRequest, selectProductsTotal } from "@/store/slices/productsSlice"
import { BagPlusFill } from "react-bootstrap-icons"
import NotificationAddToCart from "./NotificationAddToCart"
import { ITEM_PER_PAGE } from "@/Constants"
export default function ProductsTable(props) {
    const [selectProduct, setSelectProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [pagination, setPagination] = useState(0);
    const totalProducts = useSelector(selectProductsTotal)
    const [activeProductId, setActiveProductId] = useState(null)
    const [copiedImage, setCopiedImage] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const dispatch = useDispatch()
    function detailsProductButton(product) {
        setSelectProduct(product)
        setShowModal(true)
    }

    useEffect(() => {
        if (showImage) {
            setAnimate(false)

            const timer = setTimeout(() => {
                setAnimate(true)
            }, 50) // piccolo delay per trigger CSS transition

            return () => clearTimeout(timer)
        }
    }, [showImage])
    useEffect(() => {
        dispatch(fetchProductRequest({ pageSize: ITEM_PER_PAGE, page: pagination }))

    }, [pagination]);

    function handleAddToCart(item) {
        const isActive = activeProductId === item.id

        if (isActive) {
            setActiveProductId(null)
            setCopiedImage(null)
            setShowImage(false)
            return
        }

        setAnimate(false)
        setShowImage(false)

        setTimeout(() => {
            setCopiedImage(item.thumbnail)
            setActiveProductId(item.id)
            setShowImage(true)

            dispatch(
                addToCart({
                    image: item.thumbnail,
                    product: item.title,
                    price: item.price
                })
            )

            setShowToast(true)

            // trigger animazione DOPO render iniziale
            requestAnimationFrame(() => {
                setAnimate(true)
            })
        }, 0)

        // cleanup finale
        setTimeout(() => {
            setActiveProductId(null)
            setCopiedImage(null)
            setShowImage(false)
            setAnimate(false)
        }, 1500)
    }
    return (
        <>
            {showImage && (
                <img
                    src={copiedImage}
                    className={`movement ${animate ? "active" : ""}`}
                    width="50"
                    alt="copied"
                />
            )}
            {showModal &&
                <>
                    <ProductModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        product={selectProduct}
                        inPage={props.inPage}
                    />
                </>
            }
            <table className="card-table invoices-table" id="table-products">
                <thead>
                    <tr className="table-header">
                        <th>Id prodotto</th>
                        <th>Immagine prodotto</th>
                        <th>Nome prodotto</th>
                        <th>Prezzo</th>
                        <th>Sconto</th>
                        {!props.inUser &&
                            <th>{props.modalMode && props.isCarts ? 'Quantità' : 'Categoria'}</th>
                        }


                        {!props.isCarts && !props.inUser &&
                            <th>Disponibilità</th>
                        }


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
                                <td>€ {Math.round(item.price)}</td>
                                <td>{item.discountPercentage}%</td>
                                <td>{props.modalMode && props.isCarts ? item.quantity : item.category}</td>

                                {!props.isCarts &&
                                    <td>{item.availabilityStatus}</td>
                                }



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
                                            < Button variant="outline-primary" onClick={() => handleAddToCart(item)}>
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
            <NotificationAddToCart
                setShowToast={setShowToast}
                showToast={showToast}
            />
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