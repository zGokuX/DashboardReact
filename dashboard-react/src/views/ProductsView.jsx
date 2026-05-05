import { useEffect, useState } from "react"
import { fetchProducts } from "../services/requests"
import Products from "../components/Products"
export default function ProductsView(props) {
    return (
        <>
            <div className="adjustment-layout-product">
                <h2>Lista prodotti</h2>
                <Products  maxViewProduct={props.maxViewProduct} inPage={true}/>
            </div>
        </>
    )
}