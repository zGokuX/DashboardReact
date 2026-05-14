import { BrowserRouter, Link, Route, Routes } from "react-router-dom";


import ProductsView from "../views/ProductsView";
import DashboardView from "../views/DashboardView";
import CartsView from "../views/CartsView";
import RecentUsersView from "../views/RecentUsersView";
import UserView from "../views/UserView";
import CartCheckoutView from "@/views/CartCheckoutView";
import CartCheckin from "@/components/CartCheckout/CartChekIn";

export default function Layout() {
    return (
        <>
                <div className="layout container-full-width">
                    <aside>
                        <nav id="move-nav">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                                <li>
                                    <Link to="/cards">Carts</Link>
                                </li>

                                <li>
                                    <Link to="/products">Products</Link>
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
                    </Routes>
                    
                </div>
        </>
    )
}