import { useState } from "react";
import { Button } from "react-bootstrap";;
import { CaretDownFill, CaretUpFill, TrashFill } from "react-bootstrap-icons";
import ProductsTable from "../Product/ProductTable";
import Loading from "../LoadingGif/Loading";

export default function CartTable({ cartList, ...props }) {
    // eslint-disable-next-line no-unused-vars
    const [showModal, setShowModal] = useState(false)
    const [openedUserId, setOpenedUserId] = useState(null)
    const [selectProduct, setSelectProduct] = useState([])
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
        {cartList.length === 0 ? <Loading/> : cartList &&

            <table className="card-table">
                <thead>
                    <tr className="table-header">
                        {!props.inUser &&
                            <th className="col nome">
                                Utente id
                            </th>
                        }
                        <th className="col nome">
                            Prodotti Totali
                        </th>
                        <th className="col cliente">Quantità</th>
                        <th className="col stato">Somma totale</th>
                        <th className="col stato">
                            Totale(scontato)
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
                                {!props.inUser && (
                                  <td>
                                    <a
                                      href='#'
                                      onClick={e =>
                                        props.openModalDetail(e, item.userId)
                                      }
                                    >
                                      Utente {item.id}
                                    </a>
                                  </td>
                                )}

                                <td>{item.totalProducts}</td>
                                <td>{item.totalQuantity}</td>
                                <td>€ {Math.round(item.total)}</td>
                                <td>€{Math.round(item.discountedTotal)}</td>

                                <td className='d-flex gap-3'>
                                  {!props.inUser && (
                                    <Button
                                      variant='outline-primary'
                                      onClick={() => {
                                        setShowModal(true)
                                        props.setSelectCart(item)
                                        props.detailsButton(item)
                                      }}
                                    >
                                      Details
                                    </Button>
                                  )}

                                  {props.inUser && (
                                    <Button
                                      className='text-nowrap'
                                      variant='outline-primary'
                                      onClick={() => {
                                        showProduct(item)
                                      }}
                                    >
                                      Mostra Prodotti{' '}
                                      {openedUserId === item.id ? (
                                        <CaretUpFill />
                                      ) : (
                                        <CaretDownFill />
                                      )}
                                    </Button>
                                  )}

                                  {props.inPage && !props.inUser && (
                                    <Button
                                      variant='danger'
                                      onClick={() => {
                                        props.setSelectCart(item)
                                        props.setShowConfirmModal(true)
                                      }}
                                    >
                                      <TrashFill size={14} className='m-0'>
                                        Delete
                                      </TrashFill>
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            )
                        })}
                    {
                        selectProduct.length > 0 &&
                        <tr>
                            <td colSpan="5" style={{ "paddingLeft": "30px", "paddingRight": "10px", "paddingBottom": "15px" }}>
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
            </table >
                        }
        </>
    )
}