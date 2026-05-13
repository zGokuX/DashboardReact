import { useState } from "react";
import BigGraphic from "../layouts/BigGraphic";
import CardTitle from "@/components/Cart/cardTitle";
import Carts from "@/components/Cart/Carts";
import Graphic from "../layouts/Graphic";
import Products from "@/components/Product/Products";
import RecentUsers from "@/components/User/UserList";
import { useDispatch, useSelector } from "react-redux";
import { addName, selectName } from "@/store/slices/NameSlice"
import { Button } from "react-bootstrap";
import { Opencollective } from "react-bootstrap-icons";
import { User } from "@/components/User/user.type";

export default function DashboardView() {
    const dispatch = useDispatch()
    
    const nome = useSelector(selectName).value;

    const [selectUser, setSelectUser] = useState<User | null>(null)
    const [selectProduct, setSelectProduct] = useState(null)
    const [productsList, setProductsList] = useState([])
    const [isDisbaled,setIsDisabled] = useState(true)
    const [selectNameInput,setSelectNameInput] = useState("")

    function hanldeButtonModify(){
      setIsDisabled(!isDisbaled)
      
    }

    function confirmData(){+
        dispatch(addName(selectNameInput ? selectNameInput : "Marco"))
        setIsDisabled(!isDisbaled)
    }
    
    return (
      <>
        <main>
          {/* todo style spostare nel css */}
          <div className='welcome-container'>
            <div className="d-flex">
              <h1>Benvenuto <input maxLength={13} className="input-text" type="text" disabled={isDisbaled} defaultValue={nome == '' ? "Marco" : nome} onChange={(e) => setSelectNameInput(e.target.value)}/></h1>
              {!isDisbaled &&
              <Button onClick={() => confirmData()}>Salva nome</Button>
              }
              <Button className="modify-name-btn" onClick={() => hanldeButtonModify()} style={{"fontSize":"25px", "border":"none","backgroundColor":"transparent", "color":"blue"}} ><Opencollective/></Button>
            </div>
            
            <h3>Ecco una paronamica del tuo business</h3>
          </div>
          <Graphic/>
          <div className='clienti container-full-width'>
            <div className='card'>
              <CardTitle />

              <BigGraphic />
            </div>
            <RecentUsers onSelectUser={(user : any) => setSelectUser(user)} />
          </div>
          <div className='container-full-width'>
            <Carts
              userId={selectUser?.id}
              productItem={selectProduct}
              inPage={false}
            />
            <Products
              onSelectProduct={(product : any) => setSelectProduct(product)}
              onProductsListChange={(products : any) => setProductsList(products)}
            />
          </div>
        </main>
      </>
    )
}