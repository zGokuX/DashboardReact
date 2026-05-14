import { useState, useEffect } from "react"
import { resetCart, selectUserProduct } from "@/store/slices/productsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RiepilogoCart from "./RiepilogoCart"
import IndirizzoSpedizioneCart from "./IndirizzoSpedizioneCart"
import MetodoPagamento from "./MetodoPagamento"

export default function CartCheckin() {

    const listCart = useSelector(selectUserProduct)
    const [finalTotal, setFinalTotal] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState("card")

    const [cardData, setCardData] = useState({
        number: "",
        expiry: "",
        cvv: "",
        name: ""
    })

    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {

        if (!confirmed) return

        dispatch(resetCart())

        const timer = setTimeout(() => {
            navigate("/")
        }, 3000)

        return () => clearTimeout(timer)

    }, [confirmed, dispatch, navigate])

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

    const total = groupedCart.reduce((sum, item) => sum + item.price, 0)

    const formatCard = (val) => {
        return val
            .replace(/\D/g, "")
            .substring(0, 16)
            .replace(/(.{4})/g, "$1 ")
            .trim()
    }

    const handleConfirm = () => {
        setFinalTotal(total)
        setConfirmed(true)
    }

    if (confirmed) {
        return (
            <div
                className="card"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div className="text-center p-4">

                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            background: "#e1f5ee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1rem"
                        }}
                    >
                        <i
                            className="bi bi-check-lg"
                            style={{
                                fontSize: 36,
                                color: "#0f6e56"
                            }}
                        ></i>
                    </div>

                    <h4 className="fw-semibold mb-2">
                        Ordine confermato!
                    </h4>

                    <p className="text-muted mb-0">
                        Totale pagato: <strong>€ {Math.round(finalTotal)}</strong>
                    </p>

                    <p
                        className="text-muted"
                        style={{ fontSize: 13 }}
                    >
                        Riceverai una email di conferma a breve.
                    </p>

                    <p
                        className="text-muted"
                        style={{ fontSize: 12 }}
                    >
                        Verrai reindirizzato alla home tra 3 secondi...
                    </p>

                </div>
            </div>
        )
    }

    return (
        <div
            className="card"
            style={{
                minHeight: "100vh",
                padding: "1.5rem"
            }}
        >

            <div className="row g-3">

                <div className="col-12 col-md-7">
                    <RiepilogoCart
                        groupedCart={groupedCart}
                        total={total}
                    />
                    <IndirizzoSpedizioneCart />
                </div>
                
                <MetodoPagamento
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    cardData={cardData}
                    setCardData={setCardData}
                    formatCard={formatCard}
                    handleConfirm={handleConfirm}
                    total={total}
                />


            </div>

        </div>
    )
}