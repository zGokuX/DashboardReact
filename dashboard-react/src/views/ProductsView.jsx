import { useEffect, useState } from "react"
import { fetchProducts } from "../services/requests"
import Products from "../components/Products"
export default function ProductsView(props) {
    return (
        <>
            <div className="adjustment-layout-product">
                <Products  maxViewProduct={props.maxViewProduct}/>
            </div>
        </>
    )
}