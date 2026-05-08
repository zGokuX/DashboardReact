import { useState } from "react";
import BigGraphic from "../layouts/BigGraphic";
import CardTitle from "../components/cardTitle";
import Carts from "./Carts";
import Graphic from "../layouts/Graphic";
import Products from "./Products";
import RecentUsers from "./RecentUsers";



export default function Dashboard() {
    const [selectUser, setSelectUser] = useState(null)
    const [selectProduct, setSelectProduct] = useState(null)
    const [productsList, setProductsList] = useState([])

    return (
      <>
        <main>
          <div className='welcome-container'>
            <h1>Benvenuto Marco!</h1>
            <h3>Ecco una paronamica del tuo business</h3>
          </div>
          <Graphic productsList={productsList} />
          <div className='clienti container-full-width'>
            <div className='card'>
              <CardTitle />

              <BigGraphic />
            </div>
            <RecentUsers onSelectUser={user => setSelectUser(user)} />
          </div>
          <div className='container-full-width'>
            <Carts
              userId={selectUser?.id}
              productItem={selectProduct}
              inPage={false}
            />
            <Products
              onSelectProduct={product => setSelectProduct(product)}
              onProductsListChange={products => setProductsList(products)}
            />
          </div>
        </main>
      </>
    )
}