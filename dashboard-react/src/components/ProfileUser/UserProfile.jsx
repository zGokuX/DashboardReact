import { logOutUser, logUser, selectAllHistory, selectUserLogged } from "@/store/slices/LoginUser"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NavBarProfile from "./NavBarProfile"

export default function UserProfile() {
    const user = useSelector(selectUserLogged).UserLogged
    const historyProduct = useSelector(selectAllHistory)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isActiveInputName, setIsActiveInputName] = useState(true)
    const [isActiveInputPhone, setIsActiveInputPhone] = useState(true)
    const [isActiveInputBirthPlace, setIsActiveInputBirthPlace] = useState(true)
    const [isActiveInputDate, setIsActiveInputDate] = useState(true)
    const [isActiveInputImage, setIsActiveInputImage] = useState(true)
    const [newName, setNewName] = useState(null)
    const [newPhone, setNewPhone] = useState(null)
    const [newBirthPlace, setNewBirthPlace] = useState(null)
    const [newDate, setNewDate] = useState(null)
    const [preview, setPreview] = useState(false)
    const [newImage, setNewImage] = useState(null)
    const [navBarMarker, setNavBarMarker] = useState(1)
    console.log("PRODOTTI TOTALI: ", historyProduct)
    useEffect(() => {
        if (!user) {
            navigate("/")
            return
        }
        console.log(user)
    }, [user])

    function updateName() {
        if (newName === user.name) {
            setIsActiveInputName(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: newName && newName.length > 0 ? newName.charAt(0).toUpperCase() + newName.slice(1) : user.name, email: user.email, password: user.password, phone: user.phone, birthPlace: user.birthPlace, date: user.date, historyProduct: user.historyProduct, picture: user.picture } }))
        setIsActiveInputName(true)
    }
    function updatePhone() {
        if (newPhone.replace(/ /g, '-') == user.phone) {
            setIsActiveInputPhone(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: newPhone.replace(/ /g, '-'), birthPlace: user.birthPlace, date: user.date, historyProduct: user.historyProduct, picture: user.picture } }))
        setIsActiveInputPhone(true)
    }
    function updateBirthPlace() {
        if (newBirthPlace === user.birthPlace) {
            setIsActiveInputBirthPlace(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: user.phone, birthPlace: newBirthPlace, date: user.date, historyProduct: user.historyProduct, picture: user.picture } }))
        setIsActiveInputBirthPlace(true)
    }
    function updateDate() {
        if (newDate === user.date) {
            setIsActiveInputDate(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: user.phone, birthPlace: user.birthPlace, date: newDate, historyProduct: user.historyProduct, picture: user.picture } }))
        setIsActiveInputDate(true)
    }

    function updateImage() {
        if (newImage === user.picture) {
            setIsActiveInputImage(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: user.phone, birthPlace: user.birthPlace, date: user.date, historyProduct: user.historyProduct, picture: newImage } }))
        setIsActiveInputImage(true)
        setPreview(false)
    }

    return (
        <>
            <div className="card d-flex gap-3 align-items-center">
                <NavBarProfile
                    setNavBarMarker={setNavBarMarker}
                    navBarMarker={navBarMarker}
                />
                <h3>{navBarMarker === 3 ? "Pagamenti precedenti" : "Dati personali"}</h3>
                {navBarMarker === 1 &&
                    <>
                        <div className="userName d-flex flex-column gap-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Carica foto profilo</label>
                            <div className="d-flex flex-row gap-3   ">
                                <img src={preview ? newImage : user?.picture} className="rounded-circle" height={75} width={75}></img>
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={isActiveInputImage}
                                    style={{ width: "25rem" }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setNewImage(URL.createObjectURL(file));
                                            setPreview(true)
                                        }
                                    }}
                                />

                            </div>
                            <div className="buttons d-flex gap-3">
                                <Button style={{ "width": "10rem" }} onClick={() => setIsActiveInputImage(false)}>Modifica</Button>
                                {!isActiveInputImage &&
                                    <Button style={{ "width": "10rem" }} onClick={() => updateImage()}>Salva modifiche</Button>
                                }
                            </div>


                        </div>

                        <div className="userName d-flex flex-column gap-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="text" disabled={isActiveInputName} defaultValue={user?.name} style={{ "width": "25rem" }} onChange={(e) => setNewName(e.target.value)} />
                            <div className="buttons d-flex gap-3">
                                <Button style={{ "width": "10rem" }} onClick={() => setIsActiveInputName(false)}>Modifica</Button>
                                {!isActiveInputName &&
                                    <Button style={{ "width": "10rem" }} onClick={() => updateName()}>Salva modifiche</Button>
                                }
                            </div>

                        </div>

                        <div className="userName d-flex flex-column gap-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="text" disabled defaultValue={user?.email} style={{ "width": "25rem" }} />
                        </div>
                    </>
                }
                {navBarMarker === 2 &&
                    <>
                        <div className="userName d-flex flex-column gap-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Numero di telefono</label>
                            <input type="text" disabled={isActiveInputPhone} placeholder={user?.phone} style={{ "width": "25rem" }} onChange={(e) => setNewPhone(e.target.value)} />
                            <div className="buttons d-flex gap-3">
                                <Button style={{ "width": "10rem" }} onClick={() => setIsActiveInputPhone(false)}>Modifica</Button>
                                {!isActiveInputPhone &&
                                    <Button style={{ "width": "10rem" }} onClick={() => updatePhone()}>Salva modifiche</Button>
                                }
                            </div>

                        </div>
                        <div className="userName d-flex flex-column gap-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Luogo di nascita</label>
                            <input type="text" disabled={isActiveInputBirthPlace} placeholder={user?.birthPlace} style={{ "width": "25rem" }} onChange={(e) => setNewBirthPlace(e.target.value)} />
                            <div className="buttons d-flex gap-3">
                                <Button style={{ "width": "10rem" }} onClick={() => setIsActiveInputBirthPlace(false)}>Modifica</Button>
                                {!isActiveInputBirthPlace &&
                                    <Button style={{ "width": "10rem" }} onClick={() => updateBirthPlace()}>Salva modifiche</Button>
                                }
                            </div>

                        </div>

                        <div className="userName d-flex flex-column gap-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Data di nascita</label>
                            <input type="date" disabled={isActiveInputDate} defaultValue={user?.date} style={{ "width": "25rem" }} onChange={(e) => setNewDate(e.target.value)} />
                            <div className="buttons d-flex gap-3">
                                <Button style={{ "width": "10rem" }} onClick={() => setIsActiveInputDate(false)}>Modifica</Button>
                                {!isActiveInputDate &&
                                    <Button style={{ "width": "10rem" }} onClick={() => updateDate()}>Salva modifiche</Button>
                                }
                            </div>

                        </div>
                    </>
                }
                {navBarMarker === 3 && historyProduct && historyProduct.length > 0 &&
                    <div className="userName d-flex flex-column gap-2">
                        <ol>
                            {historyProduct.map((item, index) => (
                                <li key={index} className="d-flex align-items-center gap-2 mb-2">
                                    <img
                                        src={item.image}
                                        alt={item.product}
                                        style={{
                                            "width": "40px",
                                            "height": "40px",
                                            "borderRadius": "6px"
                                        }}
                                    />

                                    <div>
                                        <div>
                                            {item.product} - €{item.price} x {item.quantity}
                                        </div>

                                        <small style={{ color: "#666" }}>
                                            Pagato il: {new Date(item.paidAt).toLocaleString()}
                                        </small>
                                    </div>

                                </li>
                            ))}

                        </ol>
                    </div>
                }
            </div>
        </>
    )
}