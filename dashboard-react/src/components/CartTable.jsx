import { Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

export default function CartTable({cartList,openModalDetail,detailsButton,setSelectCart,setShowConfirmModal, ...props}){
    return (
         <table className="card-table">
                        <thead>
                            <tr className="table-header">
                                <th className="col nome">Utente id</th>
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
                                            <td><a href="#" onClick={(e) => openModalDetail(e, item.userId)}>Utente {item.userId}</a></td>
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
                                                    onClick={() =>
                                                        detailsButton(item)
                                                    }
                                                >
                                                    details
                                                </Button>
                                                {props.inPage &&
                                                    <Button variant="danger">
                                                        <TrashFill
                                                            size={20}
                                                            onClick={() => {
                                                                setSelectCart(item);
                                                                setShowConfirmModal(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </TrashFill>
                                                    </Button>
                                                }
                                            </td>

                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
    )
}