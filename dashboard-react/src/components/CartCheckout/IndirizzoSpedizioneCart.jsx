export default function IndirizzoSpedizioneCart(){
    return (
        <>
           <div className="card p-3">

                        <h6
                            className="fw-semibold mb-3"
                            style={{
                                fontSize: 12,
                                textTransform: "uppercase"
                            }}
                        >
                            Indirizzo di spedizione
                        </h6>

                        <div className="mb-2">
                            <label
                                className="form-label"
                                style={{ fontSize: 12 }}
                            >
                                Nome completo
                            </label>

                            <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Marco Rossi"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                className="form-label"
                                style={{ fontSize: 12 }}
                            >
                                Indirizzo
                            </label>

                            <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Via Roma, 12"
                            />
                        </div>

                        <div className="row g-2">

                            <div className="col-8">

                                <label
                                    className="form-label"
                                    style={{ fontSize: 12 }}
                                >
                                    Città
                                </label>

                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="Napoli"
                                />

                            </div>

                            <div className="col-4">

                                <label
                                    className="form-label"
                                    style={{ fontSize: 12 }}
                                >
                                    CAP
                                </label>

                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="80100"
                                />

                            </div>

                        </div>

                    </div>
        </>
    )
}