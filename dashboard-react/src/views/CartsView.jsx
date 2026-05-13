import Carts from "@/components/Cart/Carts";


export default function CartsView() {
    return (
        <>
            <div className="adjustment-layout-product">
                <h2>Lista carelli</h2>
                <Carts maxViewCarts={25} // non serve tiralo da constant 
                
                inPage={true} />
            </div>

        </>
    )
}