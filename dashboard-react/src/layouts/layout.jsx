import { BrowserRouter, Link, Route, Routes } from "react-router-dom";


import ProductsView from "../views/ProductsView";
import DashboardView from "../views/DashboardView";
import CartsView from "../views/CartsView";
import RecentUsersView from "../views/RecentUsersView";
import UserView from "../views/UserView";

export default function Layout() {
    return (
        <>
            <BrowserRouter>
                <div className="layout container-full-width">
                    <aside>
                        <nav>
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
                        <Route path="/*" element={<DashboardView maxViewProduct={10} maxViewCarts={10} maxViewUser={10}/>} />
                        <Route path="/users/*" element={<RecentUsersView  maxViewUser={20} />} />
                        <Route path="/cards/*" element={<CartsView maxViewCarts={20}/>} />
                        <Route path="/products/*" element={<ProductsView maxViewProduct={20}/>} />
                        <Route path="/user/:userid" element={<UserView/>} />
                    </Routes>
                    
                </div>
            </BrowserRouter>
        </>
    )
}