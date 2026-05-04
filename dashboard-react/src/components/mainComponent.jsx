import BigGraphic from "./BigGraphic";
import CardTitle from "./cardTitleComponent";
import Carts from "./CartsComponents";
import Graphic from "./GraphicComponent";
import Products from "./ProductsCompont";
import RecentUsers from "./recentUsers";

export default function Maincomponent() {
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
                        <CardTitle/>

                        <BigGraphic />

                    </div>
                    <RecentUsers />
                </div>
                <div className="container-full-width">
                    <Carts />
                    <Products />
                </div>
            </main>
        </>
    )
}