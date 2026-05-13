import { selectUserProduct } from "@/store/slices/productsSlice"
import { Button } from "react-bootstrap"
import { ArrowRight } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function CartCheckout() {
    const listCart = useSelector(selectUserProduct)
    return (
        <>
            <div className="card" style={{ "min-height": "30vh" }}>
                <div className="card-title d-flex justify-content-between">
                    <h1>IL TUO CARELLO</h1>
                    {listCart.length > 0 &&
                        <Button variant="outline-primary">Procedi al pagamento</Button>
                    }
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nome prodotto</th>
                            <th>Prezzo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCart.length == 0 &&
                            <tr>
                                <span className="fs-4">Nessun oggetto nel carrello</span><br /><br />
                                <Link to="/products"><p>Vai ai prodotti <ArrowRight /></p></Link>
                            </tr>

                        }

                        {listCart.map((item, index) => {

                            return (
                                <>
                                    <tr key={index}>
                                        <td>{item.product}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                </>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}