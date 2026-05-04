import { useEffect, useState } from "react"
import { fetchProducts } from "../services/requests"
export default function Products(props) {

    const [productList, setProductList] = useState([])
    useEffect(() => {
        getProduct(1)
    }, [])

    async function getProduct(userId) {
        const product = await fetchProducts(userId)
        props.onSelectProduct(product)
        setProductList(product)
    }


    return (
        <>
            <div className="card container-card">
                <div className="card-title">
                    <span>Products<i className="fa-solid fa-list"></i></span>
                    <span className="card-action">Vedi Tutte</span>
                </div>
                <table className="card-table invoices-table" id="table-products">
                    <thead>
                        <tr className="table-header">
                            <th>Id prodotto</th>
                            <th>Nome prodotto</th>
                            <th>Categoria</th>
                            <th>Prezzo</th>
                        </tr>
                    </thead>
                    <tbody id="bodyTable">
                        {productList.map(item => {
                            return (

                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><img style={{ display: "flex" }} width="50px" src={item.thumbnail} alt="Products Avatar" />{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>€ {Math.round(item.price)}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}