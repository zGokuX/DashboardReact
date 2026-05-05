import Carts from "../components/Carts";


export default function CartsView(props) {
 return (
    <>
    <Carts maxViewCarts={props.maxViewCarts}/>
    </>
    )
}