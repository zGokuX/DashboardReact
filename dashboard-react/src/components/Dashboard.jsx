import { useState } from "react";
import BigGraphic from "../layouts/BigGraphic";
import CardTitle from "../components/cardTitle";
import Carts from "./Carts";
import Graphic from "../layouts/Graphic";
import Products from "./Products";
import RecentUsers from "./RecentUsers";
import { Counter } from "./counter";
import { InputName } from "./inputName";
import { useDispatch, useSelector } from "react-redux";
import { addName, selectName } from "../slices/NameSlice";
import { Button } from "react-bootstrap";
import { Opencollective } from "react-bootstrap-icons";



export default function Dashboard() {
    const [selectUser, setSelectUser] = useState(null)
    const [selectProduct, setSelectProduct] = useState(null)
    const [productsList, setProductsList] = useState([])
    const nome = useSelector(selectName).value;
    const [isDisbaled,setIsDisabled] = useState(true)
    const [selectNameInput,setSelectNameInput] = useState(null)
    const dispatch = useDispatch()
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
        <InputName/>
          {/* todo style spostare nel css */}
          <Counter/>
          <div className='welcome-container'>
            <div className="d-flex">
              <h1>Benvenuto <input maxLength={13} style={{"fontSize":"25px","border":"none", "width":"12rem","backgroundColor":"transparent"}} type="text" disabled={isDisbaled} defaultValue={nome == '' ? "Marco" : nome} onChange={(e) => setSelectNameInput(e.target.value)}/></h1>
              {!isDisbaled &&
              <Button onClick={() => confirmData()}>Salva nome</Button>
              }
              <Button onClick={() => hanldeButtonModify()} style={{"fontSize":"25px", "border":"none","backgroundColor":"transparent", "color":"blue"}} ><Opencollective/></Button>
            </div>
            
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