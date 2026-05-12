import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import ProductModal from "./ProductModal"
import PaginationPage from "./PaginationPage"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts, selectProducts, selectProductsTotal } from "../slices/productsSlice"
const ITEM_PER_PAGE = 25
export default function ProductsTable(props) {
    const [selectProduct, setSelectProduct] = useState(null)
    const productList = useSelector(selectProducts)
    const [showModal, setShowModal] = useState(false)
    const [pagination, setPagination] = useState(0);
    const totalProducts = useSelector(selectProductsTotal)
    const dispatch = useDispatch()
    function detailsProductButton(product) {
        setSelectProduct(product)
        setShowModal(true)
    }

    useEffect(() => {
     dispatch(loadProducts({pageSize: 25,page:pagination,userId:1}))

    }, [pagination]);


    function setPage(currentValue, goOn) {
        console.log(currentValue, goOn)
        if (goOn && currentValue <= 7) {
            setPagination(currentValue + 1)
            return currentValue + 1
        } else if (!goOn) {
            setPagination(currentValue - 1)
            currentValue = currentValue - 1
        }
        if (currentValue > Math.ceil(totalProducts / ITEM_PER_PAGE) - 1) {
            setPagination(currentValue)
        }
        if (currentValue <= 0) {
            setPagination(0)
            return 0
        }
        return currentValue
    }
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
                    {productList.map((item) => {
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
                <PaginationPage
                    setPage={setPage}
                    pagination={pagination}
                    totalUsers={totalProducts}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                />
            )}
        </>
    )
}