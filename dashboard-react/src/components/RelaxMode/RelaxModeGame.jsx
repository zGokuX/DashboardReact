import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@/components/RelaxMode/RelaxModeStyle.css"
export default function RelaxMode() {
    return (
        <div className="container-relax d-flex flex-column gap-4 ">
            <div className="UpBar ps-5 pt-2 pe-3 d-flex justify-content-between text-light fs-4">
                <div className="money d-flex align-items-center rounded ps-3 pt-2 pe-5">
                    <div className="icon text-success fs-2">
                        <i className="fa-regular fa-money-bill-1 me-2"></i>
                    </div>
                    <div className="textNumber">
                        <span className="fs-3">12.45K</span>
                        <p className="text-secondary">CREDITI</p>
                    </div>
                </div>
                <div className="other d-flex gap-3">
                    <span className="d-flex align-items-center rounded"><i className="fa-solid fa-star"></i></span>
                    <span className="+d-flex align-items-center rounded"><i className="fa-solid fa-crosshairs"></i></span>
                </div>
                <div className="d-flex shop">
                    <Button className="shopbtn d-flex align-items-center rounded fs-4">
                        <span><i className="fa-solid fa-cart-shopping me-2"></i>NEGOZIO</span>
                    </Button >
                    
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
                        <div className="start"></div>
                    </div>

                    <div className="sell d-flex">
                        <span style={{fontSize: "3rem"}}>📦</span>
                        <div className="title ">
                            <p className="m-0 magazzino">MAGAZZINO CHIODI</p>
                            <p className="money-text">24.3K</p>
                        </div>

                        <div className="button-sell d-flex flex-column">
                            <p className="m-0">VENDI TUTTO</p>
                            <p>💵24.3K</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}