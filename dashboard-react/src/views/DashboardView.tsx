import { useEffect, useState } from "react";
import BigGraphic from "../layouts/BigGraphic";
import CardTitle from "@/components/Cart/cardTitle";
import Carts from "@/components/Cart/Carts";
import Graphic from "../layouts/Graphic";
import Products from "@/components/Product/Products";
import RecentUsers from "@/components/User/UserList";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/components/User/user.type";

import "@/components/styles/Dashboard.css";
import { selectIsLogged, selectUserLogged } from "@/store/slices/LoginUser";

export default function DashboardView() {
  const isLogged = useSelector(selectIsLogged);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const user = useSelector(selectUserLogged).UserLogged;

  return (
    <>
      <main>
        <div className="welcome-container">
          <div className="d-flex">
            <h3>
              {isLogged &&  "Benvenuto " + user.name }
            </h3>
          </div>

          <h3>Ecco una paronamica del tuo business</h3>
        </div>
        <Graphic />
        <div className="clienti container-full-width">
          <div className="card">
            <CardTitle />

            <BigGraphic />
          </div>
          <RecentUsers onSelectUser={(user: any) => setSelectUser(user)} />
        </div>
        <div className="container-full-width">
          <Carts
            userId={selectUser?.id}
            productItem={selectProduct}
            inPage={false}
          />
          <Products
            onSelectProduct={(product: any) => setSelectProduct(product)}
            onProductsListChange={(products: any) => setProductsList(products)}
          />
        </div>
      </main>
    </>
  );
}
