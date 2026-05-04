import { useState } from "react";
import BigGraphic from "./BigGraphic";
import CardTitle from "./cardTitle";
import Carts from "./Carts";
import Graphic from "./Graphic";
import Products from "./Products";
import RecentUsers from "./recentUsers";

export default function Maincomponent() {
    const [selectUser, setSelectUser] = useState(null)
    const [selectProduct, setSelectProduct] = useState(null)
    return (
        <>
            <main>
                <div className="welcome-container">
                    <h1>Benvenuto Marco!</h1>
                    <h3>Ecco una paronamica del tuo business</h3>
                </div>
                <Graphic />
                <div className="clienti container-full-width">
                    <div className="card">
                        <CardTitle />

                        <BigGraphic />

                    </div>
                    <RecentUsers onSelectUser={(user) => setSelectUser(user)} />
                </div>
                <div className="container-full-width">
                    <Carts userId={selectUser?.id} productItem={selectProduct} />
                    <Products onSelectProduct={(product) => setSelectProduct(product)} />
                </div>
            </main>
        </>
    )
}