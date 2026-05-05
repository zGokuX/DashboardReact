import { useEffect, useState } from "react"
import { fetchProducts } from "../services/requests"
import ProductsTable from "./ProductTable"
import { Link } from "react-router-dom"
export default function Products(props) {

    const [productList, setProductList] = useState([])
    useEffect(() => {
        getProduct(1)
    }, [])

    async function getProduct(userId) {
        const product = await fetchProducts(userId, props.maxViewProduct)
        if (props.onSelectProduct) {
            props.onSelectProduct(product)
        }

        setProductList(product)
    }


    return (
        <>
            <div className="clienti container-full-width">
                <div className="card client-card">
                    <div className="card-title">
                        <span>Products<i className="fa-solid fa-list"></i></span>
                        {!props.inPage &&
                            <div className="card-actions" id="btn-card-actions">
                                <nav>
                                    <Link to="/products"><span className="card-action-list">Vedi Tutti</span></Link>
                                </nav>
                            </div>
                        }
                    </div>
                    <ProductsTable productList={productList} />
                </div>
            </div>
        </>
    )
}