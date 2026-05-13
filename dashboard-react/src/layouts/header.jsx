import { CartFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { selectName } from "@/store/slices/NameSlice";

export default function Header() {
    const nome = useSelector(selectName).value;
    return (
        <>
            <header>
                <div className="topbar-main">
                    <div className="logo-container">
                        <a href="#"><img src="assets/logosite.png" alt="Logo" /></a>
                    </div>
                    <div className="search-container">

                        <div className="search-form">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Cerca..." />
                        </div>
                    </div>
                    <div className="user-profile-container">
                        <div className="notification-user">
                            <i className="fa-solid fa-bell"></i>
                            <span className="notification-count">3</span>
                        </div>

                        <div className="cart-icon ms-3">
                            <CartFill size={25}/>
                        </div>
                        <div className="user-profile" id="user-profile-id">
                            <div className="user-avatar">
                                <img src="assets/avatars/2.png" alt="User Avatar" />
                            </div>
                            <div className="user-menu">
                                <span className="user-name">{nome == '' ? "Marco" : nome} Rossi</span>
                                <ul id="appear-ul">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Settings</a></li>
                                    <li><a href="#">Logout</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}