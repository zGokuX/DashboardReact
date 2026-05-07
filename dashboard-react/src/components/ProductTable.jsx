import { useState } from "react"
import { Button } from "react-bootstrap"
import ProductModal from "./ProductModal"

export default function ProductsTable(props) {
    const [selectProduct, setSelectProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    function detailsProductButton(product) {
        setSelectProduct(product)
        setShowModal(true)
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
                    {props.productList.map((item, index) => {
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
        </>
    )
}