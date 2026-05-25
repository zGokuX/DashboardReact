import { logOutUser, logUser, selectUserLogged } from "@/store/slices/LoginUser"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function UserProfile() {
    const user = useSelector(selectUserLogged).UserLogged
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isActiveInputName, setIsActiveInputName] = useState(true)
    const [newName, setNewName] = useState(null)
    function logOut() {
        dispatch(logOutUser())
        navigate("/")
    }
    function updateName() {
        dispatch(logUser({ UserLogged: { name: newName, email: user.email, password: user.password } }))
        setIsActiveInputName(true)
    }
    return (
        <>
            <div className="card d-flex gap-3">
                <h3>Dati personali</h3>
                <div className="userName d-flex flex-column gap-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" disabled={isActiveInputName} defaultValue={user.name} style={{ "width": "25rem" }} onChange={(e) => setNewName(e.target.value)} />
                    <div className="buttons d-flex gap-3">
                        <Button style={{ "width": "10rem" }} onClick={() => setIsActiveInputName(false)}>Modifica</Button>
                        {!isActiveInputName &&
                            <Button style={{ "width": "10rem" }} onClick={() => updateName()}>Salva modifiche</Button>
                        }
                    </div>

                </div>

                <div className="userName d-flex flex-column gap-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="text" disabled defaultValue={user.email} style={{ "width": "25rem" }} />
                </div>

                <Button variant="danger" style={{ "width": "10rem" }} onClick={() => logOut()}>LogOut</Button>
            </div>
        </>
    )
}