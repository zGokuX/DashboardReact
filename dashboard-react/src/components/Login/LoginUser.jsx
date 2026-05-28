import { logUser } from "@/store/slices/LoginUser"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

export default function LoginUserUI() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const dispatch = useDispatch()
    const [getName, setGetName] = useState(null)
    const [getEmail, setGetEmail] = useState(null)
    const [getPassword, setGetPassword] = useState(null)
    const navigate = useNavigate()
    function loggedUser() { /* TODO: da cambiare in loginUser */
        if (getName == null || getEmail == null || getPassword == null) {
            console.log("login fallito")
            return
        }

        /*         if(getName.length < 15 || getPassword.length < 6){
                    return
                } */

        dispatch(logUser({ UserLogged: { name: getName.charAt(0).toUpperCase() + getName.slice(1), email: getEmail, password: getPassword, phone: "Numero di telefono non inserito", birthPlace: "Luogo di nascita non inserito", date: "1970-01-01" } }))
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
                        <form onSubmit={handleSubmit(loggedUser)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control"
                                    {...register("username", {
                                        required: "Username richiesto",
                                        maxLength: {
                                            value: 15,
                                            message: "Lunghezza massima 15",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Lunghezza minima 4",
                                        },
                                    })} onChange={(e) => setGetName(e.target.value)}></input>
                                {errors.username && (
                                    <p className="text-danger">{errors.username.message}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control"           {...register("email", {
                                    required: "Email richiesta(es. MarcoRossi@gmail.com)",
                                    pattern: {
                                        value: /^\S+@gmail\.com$/i,
                                        message: "Email non valida",
                                    },
                                })} id="exampleInputEmail1" onChange={(e) => setGetEmail(e.target.value)}></input>
                                {errors.email && (
                                    <p className="text-danger">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control"
                                    {...register("password", {
                                        required: "Password richiesta",
                                        minLength: {
                                            value: 6,
                                            message: "Lunghezza minima 6",
                                        },
                                    })}
                                    id="exampleInputPassword1" onChange={(e) => setGetPassword(e.target.value)}></input>
                                {errors.password && (
                                    <p className="text-danger">{errors.password.message}</p>
                                )}
                            </div>
                            <button disabled={isSubmitting} className="btn btn-primary" type="submit">
                                {isSubmitting ? "Loading..." : "Accedi"}
                            </button>
                        </form>
                    </>
                </div>
            </div>
        </>
    )
}