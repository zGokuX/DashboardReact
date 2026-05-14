
export default function RiepilogoCart({groupedCart, total}) {
    return (
        <>
            <div className="card p-3 mb-3">

                <h6
                    className="fw-semibold mb-3"
                    style={{
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                        color: "#6c757d"
                    }}
                >
                    Riepilogo ordine
                </h6>

                {groupedCart.map((item, i) => (

                    <div
                        key={i}
                        className="d-flex justify-content-between align-items-start py-2"
                        style={{
                            borderBottom:
                                i < groupedCart.length - 1
                                    ? "1px solid #f0f0f0"
                                    : "none"
                        }}
                    >

                        <div>
                            <p
                                className="mb-0 fw-semibold"
                                style={{ fontSize: 14 }}
                            >
                                {item.product}
                            </p>

                            <span
                                className="text-muted"
                                style={{ fontSize: 12 }}
                            >
                                Quantità: {item.quantity}
                            </span>
                        </div>

                        <div className="text-end">

                            <p
                                className="mb-0 fw-semibold"
                                style={{ fontSize: 14 }}
                            >
                                € {Math.round(item.price)}
                            </p>

                            {item.quantity > 1 && (
                                <span
                                    className="text-muted"
                                    style={{ fontSize: 12 }}
                                >
                                    € {Math.round(item.price / item.quantity)} cad.
                                </span>
                            )}

                        </div>

                    </div>

                ))}

                <hr className="my-3" />

                <div className="d-flex justify-content-between">

                    <span className="fw-semibold">
                        Totale
                    </span>

                    <span
                        className="fw-semibold"
                        style={{
                            fontSize: 18,
                            color: "#1e3a5f"
                        }}
                    >
                        € {Math.round(total)}
                    </span>

                </div>

            </div>
        </>
    )
}