import { selectUserProduct } from "@/store/slices/productsSlice"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function CartCheckout() {
    const listCart = useSelector(selectUserProduct)
    // const [selectedCart, setSelectedCart] = useState([])
    // function handleCheckbox(e, cart) {
    //     console.log(e.target)
    //     if (e.target.value == "off") {
    //         console.log("selezione; ", cart.product)
    //     }

    // }
    const groupedCart = listCart.reduce((acc, item) => {
        const existing = acc.find(el => el.product === item.product)

        if (existing) {
            existing.quantity += 1
            existing.price += item.price
        } else {
            acc.push({
                ...item,
                quantity: 1
            })
        }

        return acc
    }, [])
    return (
        <>
            <div className="card" style={{ "minHeight": "30vh" }}>
                <div className="card-title d-flex justify-content-between">
                    <h1>IL TUO CARELLO</h1>

                    {listCart.length > 0 &&
                        <Button variant="outline-primary">Procedi al pagamento</Button>
                    }
                </div>
                {groupedCart.length > 0 &&
                    <h4>Prodotti totali {groupedCart.reduce((acc, item) => {
                        return acc + item.quantity
                    }, 0)}</h4>
                }
                {listCart.length == 0 &&
                    <>
                        <p className="fs-4">Nessun oggetto nel carrello</p>
                        <Link to="/products"><p>Vai ai prodotti <i className='fa-solid fa-list'></i></p></Link>
                    </>
                }
                <table>
                    <thead>
                        {groupedCart > 0 &&
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Nome prodotto</th>
                                <th>Prezzo</th>
                            </tr>
                        }

                    </thead>
                    <tbody>


                        {groupedCart.map((item, index) => {

                            return (
                                <>
                                    <tr key={index}>
                                        <td><input className="form-check-input" type="checkbox" /></td>
                                        <td><img src={item.image} height={70} /></td>
                                        <td>{item.product} <b>x{item.quantity}</b></td>
                                        <td>€ {Math.round(item.price)}</td>
                                    </tr>
                                </>
                            )
                        })}
                        {groupedCart.length > 0 &&
                            <tr>
                                <td>
                                    <span className="fs-5">Totale</span>
                                </td>
                                <td></td>
                                <td></td>
                                <td><b>
                                    <span className="fs-5">€ {listCart.reduce((acc, item) => {
                                        return Math.round(acc + item.price)
                                    }, 0)}</span></b>
                                </td>

                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}