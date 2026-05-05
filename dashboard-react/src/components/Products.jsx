import { useEffect, useState } from "react"
import { fetchProducts } from "../services/requests"
import ProductsTable from "./ProductTable"
export default function Products(props) {

    const [productList, setProductList] = useState([])
    useEffect(() => {
        getProduct(1)
    }, [])

    async function getProduct(userId) {
        const product = await fetchProducts(userId,props.maxViewProduct)
        if(props.onSelectProduct){
             props.onSelectProduct(product)
        }
       
        setProductList(product)
    }


    return (
        <>
            <div className="card container-card">
                <div className="card-title">
                    <span>Products<i className="fa-solid fa-list"></i></span>
                    <span className="card-action">Vedi Tutte</span>
                </div>
               <ProductsTable productList={productList}/>
            </div>
        </>
    )
}