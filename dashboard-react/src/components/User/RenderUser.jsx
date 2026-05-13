import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import CartTable from "../Cart/CartTable"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"

export function RenderUser(props) {
        return props.displayedUsers.map((item) => {
            return (
                
                <React.Fragment key={item.id + item.firstName}>
                    <tr className='row-list' key={item.id + item.firstName}>
                        <td className='client-avatar'>
                            <img src={item.image} alt='Client Avatar' />
                        </td>
                        <td className='client-info'>
                            <h5>{item.firstName + ' ' + item.lastName}</h5>
                            <h6>{item.company.department}</h6>
                        </td>
                        {/*                     <td className='client-info'>
                        <span>{item.age}</span>
                    </td> */}
                        {props.inPage &&
                            <>
                                <td className='client-info'>
                                    <span>{item.email}</span>
                                </td>

                                <td className='client-info'>
                                    <span>
                                        {item.address?.state} {item.address?.city}{' '}
                                        {item.address?.address}
                                    </span>
                                </td>
                                <td className='client-info'>
                                    <span>{item.phone}</span>
                                </td>
                            </>
                        }

                        <td className='client-actions d-flex gap-3 h-25'>
                            {props.inPage &&
                                <>
                                    <Button
                                        variant='outline-primary'
                                        className='modify-btn'
                                        onClick={() => props.editButton(item)}
                                    >
                                        Modifica
                                    </Button>

                                    <Button
                                        variant='outline-primary'
                                        className='modify-btn'
                                        onClick={() => props.showCart(item)}
                                    >
                                        Mostra carrelli {props.openedUserId === item.id ? <CaretUpFill /> : <CaretDownFill />}
                                    </Button>
                                </>
                            }
                            {'  '}
                            {!props.inPage && (
                                <Button
                                    variant='outline-primary'
                                    className='filter-btn '
                                    onClick={() => props.onSelectUser(item)}
                                >
                                    Filtra
                                </Button>
                            )}

                            <Link to={`/user/${item.id}`}>
                                <Button variant='outline-primary' className='filter-btn '>
                                    Details
                                </Button>
                            </Link>
                        </td>
                    </tr>
                    {props.openedUserId == item.id && item.carts && (
                        <tr>
                            <td colSpan="6" style={{ "paddingLeft": "30px", "paddingRight": "20px" }}>
                                <CartTable
                                    cartList={item.carts}
                                    userId={props.userId}
                                    inPage={props.inPage}
                                    inUser={true}
                                />
                            </td>
                        </tr>
                    )}
                </React.Fragment>
            )
        })
    }