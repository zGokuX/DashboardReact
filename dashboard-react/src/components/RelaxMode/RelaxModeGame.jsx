import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@/components/RelaxMode/RelaxModeStyle.scss"
export default function RelaxMode() {
    return (
        <div className="container-relax">
            <div className="UpBar ps-5 pt-2 pe-3 d-flex justify-content-between text-light fs-4">
                <div className="money d-flex align-items-center rounded ps-3 pt-2 pe-5">
                    <div className="icon text-success fs-2">
                        <i class="fa-regular fa-money-bill-1 me-2"></i>
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
                    <Button className=" shopbtn d-flex align-items-center rounded fs-4">
                        <span><i className="fa-solid fa-cart-shopping me-2"></i>NEGOZIO</span>
                    </Button >
                    <Link to="/">
                        <Button className="logout ms-2 rounded fs-4">
                            <p className="mb-0">ESCI</p>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}