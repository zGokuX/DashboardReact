/* eslint-disable react-hooks/purity */
export default function MetodoPagamento({setPaymentMethod,paymentMethod,cardData,setCardData,formatCard,handleConfirm,total}){
    return(
        <>
        
                <div className="col-12 col-md-5">

                    <div className="card p-3">

                        <h6
                            className="fw-semibold mb-3"
                            style={{
                                fontSize: 12,
                                textTransform: "uppercase"
                            }}
                        >
                            Metodo di pagamento
                        </h6>

                        {[
                            {
                                value: "card",
                                label: "Carta di credito",
                                desc: "Visa, Mastercard, Amex",
                                icon: "bi-credit-card"
                            },
                            {
                                value: "paypal",
                                label: "PayPal",
                                desc: "Accedi al tuo conto",
                                icon: "bi-paypal"
                            },
                            {
                                value: "transfer",
                                label: "Bonifico bancario",
                                desc: "3–5 giorni lavorativi",
                                icon: "bi-bank"
                            },
                        ].map(opt => (

                            <div
                                key={opt.value}
                                onClick={() => setPaymentMethod(opt.value)}
                                className="d-flex align-items-center gap-3 p-2 mb-2"
                                style={{
                                    border:
                                        paymentMethod === opt.value
                                            ? "1.5px solid #1e3a5f"
                                            : "1px solid #dee2e6",

                                    borderRadius: 8,
                                    cursor: "pointer",

                                    background:
                                        paymentMethod === opt.value
                                            ? "#f0f4f9"
                                            : "transparent",

                                    transition: "all .15s"
                                }}
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value={opt.value}
                                    checked={paymentMethod === opt.value}
                                    onChange={() => setPaymentMethod(opt.value)}
                                    style={{ accentColor: "#1e3a5f" }}
                                />
                                <div>

                                    <p
                                        className="mb-0 fw-semibold"
                                        style={{ fontSize: 14 }}
                                    >
                                        {opt.label}
                                    </p>

                                    <p
                                        className="mb-0 text-muted"
                                        style={{ fontSize: 12 }}
                                    >
                                        {opt.desc}
                                    </p>

                                </div>

                            </div>

                        ))}

                        {paymentMethod === "card" && (

                            <div
                                className="mt-3 pt-3"
                                style={{
                                    borderTop: "1px solid #f0f0f0"
                                }}
                            >

                                <div className="mb-2">

                                    <label
                                        className="form-label"
                                        style={{ fontSize: 12 }}
                                    >
                                        Numero carta
                                    </label>

                                    <input
                                        className="form-control form-control-sm"
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardData.number}
                                        onChange={(e) =>
                                            setCardData({
                                                ...cardData,
                                                number: formatCard(e.target.value)
                                            })
                                        }
                                    />

                                </div>

                                <div className="row g-2 mb-2">

                                    <div className="col-6">

                                        <label
                                            className="form-label"
                                            style={{ fontSize: 12 }}
                                        >
                                            Scadenza
                                        </label>

                                        <input
                                            className="form-control form-control-sm"
                                            type="text"
                                            placeholder="MM/AA"
                                            maxLength={5}
                                            value={cardData.expiry}
                                            onChange={(e) =>
                                                setCardData({
                                                    ...cardData,
                                                    expiry: e.target.value
                                                })
                                            }
                                        />

                                    </div>

                                    <div className="col-6">

                                        <label
                                            className="form-label"
                                            style={{ fontSize: 12 }}
                                        >
                                            CVV
                                        </label>

                                        <input
                                            className="form-control form-control-sm"
                                            type="text"
                                            placeholder="123"
                                            maxLength={3}
                                            value={cardData.cvv}
                                            onChange={(e) =>
                                                setCardData({
                                                    ...cardData,
                                                    cvv: e.target.value
                                                })
                                            }
                                        />

                                    </div>

                                </div>

                                <div className="mb-2">

                                    <label
                                        className="form-label"
                                        style={{ fontSize: 12 }}
                                    >
                                        Nome sulla carta
                                    </label>

                                    <input
                                        className="form-control form-control-sm"
                                        type="text"
                                        placeholder="MARCO ROSSI"
                                        value={cardData.name}
                                        onChange={(e) =>
                                            setCardData({
                                                ...cardData,
                                                name: e.target.value.toUpperCase()
                                            })
                                        }
                                    />

                                </div>

                            </div>

                        )}
                        {paymentMethod === "paypal" && (
                            <div
                                className="mt-3 pt-3 text-center text-muted"
                                style={{
                                    borderTop: "1px solid #f0f0f0",
                                    fontSize: 13
                                }}
                            >
                                Verrai reindirizzato a PayPal dopo la conferma.
                            </div>
                        )}

                        {paymentMethod === "transfer" && (
                            <div
                                className="mt-3 pt-3"
                                style={{
                                    borderTop: "1px solid #f0f0f0",
                                    fontSize: 13,
                                    color: "#6c757d"
                                }}
                            >

                                <p className="mb-1">
                                    <strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456
                                </p>

                                <p className="mb-0">
                                    <strong>Causale:</strong> Ordine #
                                    {Math.floor(Math.random() * 90000) + 10000}
                                </p>

                            </div>
                        )}

                        <button
                            className="btn-primary btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                            onClick={handleConfirm}
                        >

                            <i
                                className="bi bi-lock-fill"
                                style={{ fontSize: 14 }}
                            ></i>

                            Conferma ordine — € {Math.round(total)}

                        </button>

                    </div>

                </div>
        </>
    )
}