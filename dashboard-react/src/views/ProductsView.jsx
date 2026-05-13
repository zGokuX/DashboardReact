import Products from "@/components/Product/Products"
export default function ProductsView() {
    return (
        <>
            <div className="adjustment-layout-product">
                <h2>Lista prodotti</h2>
                <Products inPage={true}/>
            </div>
        </>
    )
}