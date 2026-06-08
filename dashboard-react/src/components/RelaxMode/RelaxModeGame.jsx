import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RelaxMode() {
    return (
        <div style={{ backgroundColor: "#333", height: "100vh" }}>
            <div className="UpBar ps-5 pt-2 pe-3 d-flex justify-content-between text-light fs-4">
                <div style={{ backgroundColor: "#2c2c2c", boxShadow: "0px 4px 0px 0px black", border: "2px solid #403f3f", width: "18rem" }} className="money d-flex align-items-center rounded ps-3 pt-2 pe-5">
                    <div className="icon text-success fs-2">
                        <i class="fa-regular fa-money-bill-1 me-2"></i>
                    </div>
                    <div className="textNumber">
                        <span style={{ fontWeight: "bold" }} className="fs-3">12.45K</span>
                        <p style={{ fontSize: "16px", fontWeight: "bold" }} className="text-secondary">CREDITI</p>

                    </div>

                </div>
                <div className="other d-flex gap-3">
                    <span style={{ backgroundColor: "#2c2c2c", boxShadow: "0px 4px 0px 0px black", border: "2px solid #403f3f", padding: "2rem" }} className="d-flex align-items-center rounded"><i class="fa-solid fa-star"></i></span>
                    <span style={{ backgroundColor: "#2c2c2c", boxShadow: "0px 4px 0px 0px black", border: "2px solid #403f3f", padding: "2rem" }} className="+d-flex align-items-center rounded"><i class="fa-solid fa-crosshairs"></i></span>
                </div>
                <div className="d-flex">
                    <div style={{ backgroundColor: "#ffb703", border: "2px solid #fb8500", padding: "2rem", color: "black" }} className="Shop d-flex align-items-center rounded">
                        <span style={{ fontWeight: "bold" }}><i class="fa-solid fa-cart-shopping me-2"></i>NEGOZIO</span>

                    </div >
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button style={{ backgroundColor: "#c1121f", border: "2px solid #780000", color: "black" }} className="Shop ms-2 rounded fs-4">
                            <p className="mb-0" style={{ fontWeight: "bold" }}>ESCI</p>
                        </Button>
                    </Link>
                </div>


            </div>
        </div>
    )
}