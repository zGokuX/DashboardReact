import Carts from "../components/Carts";


export default function CartsView(props) {
    return (
        <>
            <div className="adjustment-layout-product">
                <h2>Lista carelli</h2>
                <Carts maxViewCarts={20} inPage={true} />
            </div>

        </>
    )
}