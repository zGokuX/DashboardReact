import { logOutUser, logUser, selectUserLogged } from "@/store/slices/LoginUser"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NavBarProfile from "./NavBarProfile"

export default function UserProfile() {
    const user = useSelector(selectUserLogged).UserLogged
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isActiveInputName, setIsActiveInputName] = useState(true)
    const [isActiveInputPhone, setIsActiveInputPhone] = useState(true)
    const [isActiveInputBirthPlace, setIsActiveInputBirthPlace] = useState(true)
    const [isActiveInputDate, setIsActiveInputDate] = useState(true)
    const [newName, setNewName] = useState(null)
    const [newPhone, setNewPhone] = useState(null)
    const [newBirthPlace, setNewBirthPlace] = useState(null)
    const [newDate, setNewDate] = useState(null)
    const [navBarMarker, setNavBarMarker] = useState(1)
    useEffect(() => {
        if (!user) {
            navigate("/")
            return
        }
        console.log(user)
    }, [user])

    function logOut() {
        dispatch(logOutUser())
        navigate("/")
    }
    function updateName() {
        if (newName === user.name) {
            setIsActiveInputName(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: newName.charAt(0).toUpperCase() + newName.slice(1), email: user.email, password: user.password, phone: user.phone, birthPlace: user.birthPlace, date: user.date, historyProduct: user.historyProduct } }))
        setIsActiveInputName(true)
    }
    function updatePhone() {
        if (newPhone.replace(/ /g, '-') == user.phone) {
            setIsActiveInputPhone(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: newPhone.replace(/ /g, '-'), birthPlace: user.birthPlace, date: user.date, historyProduct: user.historyProduct } }))
        setIsActiveInputPhone(true)
    }
    function updateBirthPlace() {
        if (newBirthPlace === user.birthPlace) {
            setIsActiveInputBirthPlace(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: user.phone, birthPlace: newBirthPlace, date: user.date, historyProduct: user.historyProduct } }))
        setIsActiveInputBirthPlace(true)
    }
    function updateDate() {
        if (newDate === user.date) {
            setIsActiveInputDate(true)
            return
        }
        dispatch(logUser({ UserLogged: { name: user.name, email: user.email, password: user.password, phone: user.phone, birthPlace: user.birthPlace, date: newDate, historyProduct: user.historyProduct } }))
        setIsActiveInputDate(true)
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
                {navBarMarker === 3 && user.historyProduct && user.historyProduct.length > 0 &&
                    <div className="userName d-flex flex-column gap-2">
                        <ol>
                            {user.historyProduct?.map((item, index) => (
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
                <Button variant="danger" style={{ "width": "10rem" }} onClick={() => logOut()}>LogOut</Button>
            </div>
        </>
    )
}