import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@/components/RelaxMode/RelaxModeStyle.css"
import { useEffect, useState } from "react";
export default function RelaxMode() {
    const [money, setMoney] = useState(24000);
    const [actual_money, setActual_money] = useState(12000);

    function resetMoney() {
        setActual_money(prevMoney => prevMoney + money)
        setMoney(0)
    }

    function formatNumber(num) {
        if (num < 1000) return num.toString();

        const units = ["K", "M", "B", "T"];
        let unitIndex = -1;
        let value = num;

        while (value >= 1000 && unitIndex < units.length - 1) {
            value /= 1000;
            unitIndex++;
        }

        return `${parseFloat(value.toFixed(1))}${units[unitIndex]}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setMoney(prevMoney => prevMoney + 512);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="container-relax d-flex flex-column gap-4 ">
            <div className="UpBar ps-5 pt-2 pe-3 d-flex justify-content-between text-light fs-4">
                <div className="money d-flex align-items-center rounded ps-3 pt-2 pe-5">
                    <div className="icon text-success fs-2">
                        <i className="fa-regular fa-money-bill-1 me-2"></i>
                    </div>
                    <div className="textNumber">
                        <span className="fs-3">{formatNumber(actual_money)}</span>
                        <p className="text-secondary">CREDITI</p>
                    </div>
                </div>
                {/* <div className="other d-flex gap-3">
                    <span className="d-flex align-items-center rounded"><i className="fa-solid fa-star"></i></span>
                    <span className="+d-flex align-items-center rounded"><i className="fa-solid fa-crosshairs"></i></span>
                </div> */}
                <div className="d-flex shop">
                    {/* <Button className="shopbtn d-flex align-items-center rounded fs-4">
                        <span><i className="fa-solid fa-cart-shopping me-2"></i>NEGOZIO</span>
                    </Button > */}

                    <Button className="logout ms-2 rounded fs-4">
                        <Link className="leave" to="/">
                            <p className="mb-0">ESCI</p>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="chiodi-container ps-5 d-flex">
                <div className="chiodi-card">
                    <div className="chiodi-title">
                        <span>CHIODI</span>
                    </div>
                    <div className="d-flex justify-content-center chiodi-emoji">📌</div>
                    <div className="chiodi-level">LIV.25</div>
                </div>
                <div className="produzione">
                    <div className="produzione-title d-flex gap-5">
                        <span id="text-produzione">PRODUZIONE DI CHIODI</span>
                        <span id="money-per-sec">512/SEC</span>
                    </div>
                    <div className="progress-bar">
                        <progress className="start"></progress>
                    </div>

                    <div className="sell d-flex">
                        <span style={{ fontSize: "3rem" }}>📦</span>
                        <div className="title ">
                            <p className="m-0 magazzino">MAGAZZINO CHIODI</p>
                            <p className="money-text">{formatNumber(money)}</p>
                        </div>

                        <div className="button-sell d-flex flex-column" onClick={() => resetMoney()}>

                            <p className="m-0">VENDI TUTTO</p>
                            <p>💵{money <= 9999 ? money : formatNumber(money)}</p>
                        </div>
                    </div>
                </div>
                <div className="upgrade-panel">
                    <div className="upgrade-card improve">
                        <div className="upgrade-icon">⬆️</div>

                        <div className="upgrade-info">
                            <p className="upgrade-title">MIGLIORA</p>
                            <p className="upgrade-price">
                                {formatNumber(5120)} 💵
                            </p>
                        </div>
                    </div>

                    <div className="upgrade-card press">
                        <div className="upgrade-icon">🔨</div>

                        <div className="upgrade-info">
                            <p className="upgrade-title">+1 PRESSA</p>
                            <p className="upgrade-price">
                                {formatNumber(1020)} 💵
                            </p>
                        </div>
                    </div>

                    <div className="press-counter">
                        <p>PRESSE</p>
                        <p>25 / 50</p>
                    </div>
                </div>
            </div>
        </div>
    )
}