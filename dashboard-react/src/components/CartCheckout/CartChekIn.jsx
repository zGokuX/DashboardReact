import { selectUserProduct } from "@/store/slices/productsSlice"
import { useSelector } from "react-redux"

export default function CartCheckin() {
    const listCart = useSelector(selectUserProduct)

    const groupedCart = listCart.reduce((acc, item) => {
        const existing = acc.find(el => el.product === item.product)

        if (existing) {
            existing.quantity += 1
            existing.price += item.price
        } else {
            acc.push({
                ...item,
                quantity: 1
            })
        }

        return acc
    }, [])
    return (
        <>
            <div className="card">
                <div className="riepilogo">
                    <div className="card-title"><h4>riepilogo ordine</h4></div>

                    {groupedCart.map(item => {
                        return (
                            <>
                                <div className="listCart">
                                    <h6>{item.product} <b>x{item.quantity}</b></h6>
                                    <span>€ {Math.round(item.price)}</span>
                                </div>
                            </>
                        )
                    })}

                </div>


            </div>
        </>
    )
}