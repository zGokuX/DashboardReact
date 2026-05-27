import { logUser } from "@/store/slices/LoginUser"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function LoginUserUI() {
    const dispatch = useDispatch()
    const [getName, setGetName] = useState(null)
    const [getEmail, setGetEmail] = useState(null)
    const [getPassword, setGetPassword] = useState(null)
    const navigate = useNavigate()
    function loggedUser() {
        if (getName == null || getEmail == null || getPassword == null) {
            console.log("login fallito")
            return
        }

        if(getName.length >= 15){
            return
        }

        dispatch(logUser({ UserLogged: { name: getName, email: getEmail, password: getPassword, phone: "Numero di telefono non inserito", birthPlace: "Luogo di nascita non inserito", date: "1970-01-01" } }))
        navigate("/")
    }
    return (
        <>
            <div className="card">
                <div>
                    <h2>Accedi</h2>
                </div>
                <div>
                    <>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control" onChange={(e) => setGetName(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setGetEmail(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setGetPassword(e.target.value)}></input>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => loggedUser()}>Accedi</button>
                        </form>
                    </>
                </div>
            </div>
        </>
    )
}