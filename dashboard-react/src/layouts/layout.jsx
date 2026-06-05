import { Link, Route, Routes } from "react-router-dom";


import ProductsView from "../views/ProductsView";
import DashboardView from "../views/DashboardView";
import CartsView from "../views/CartsView";
import RecentUsersView from "../views/RecentUsersView";
import UserView from "../views/UserView";
import CartCheckoutView from "@/views/CartCheckoutView";
import CartCheckin from "@/components/CartCheckout/CartChekIn";
import LoginUserUI from "@/components/Login/LoginUser";
import UserProfile from "@/components/ProfileUser/UserProfile";
import FeedbackImprove from "@/Feedback/FeedbackImprove";

export default function Layout() {
    return (
        <>
                <div className="layout container-full-width">
                    <aside>
                        <nav id="move-nav">
                            <ul>
                                <li className="d-flex align-items-center">
                                    <i class="fa-solid fa-house me-2"></i>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="d-flex align-items-center">
                                    <i class="fa-solid fa-user me-2"></i>
                                    <Link to="/users">Users</Link>
                                </li>
                                <li className="d-flex align-items-center">
                                    <i className='fa-solid fa-cart-shopping me-2'></i>
                                    <Link to="/cards">Carts</Link>
                                </li>

                                <li className="d-flex align-items-center">
                                    <i className="fa-solid fa-list me-2"></i>
                                    <Link to="/products">Products</Link>
                                </li>

                                <li className="d-flex align-items-center">
                                    <i class="fa-solid fa-comment me-2"></i>
                                    <Link to="/feeback">Feedback</Link>
                                </li>
                            </ul>

                        </nav>
                    </aside>
                    <Routes>
                        <Route path="/*" element={<DashboardView/>} />
                        <Route path="/users/*" element={<RecentUsersView />} />
                        <Route path="/cards/*" element={<CartsView/>} />
                        <Route path="/products/*" element={<ProductsView/>} />
                        <Route path="/cartCheckout/*" element={<CartCheckoutView/>} />
                        <Route path="/checkin/*" element={<CartCheckin/>} />
                        <Route path="/user/:userid" element={<UserView/>} />
                        <Route path="/login/*" element={<LoginUserUI/>} />
                        <Route path="/profile/*" element={<UserProfile/>} />
                        <Route path="/feeback/*" element={<FeedbackImprove/>} />
                    </Routes>
                    
                </div>
        </>
    )
}