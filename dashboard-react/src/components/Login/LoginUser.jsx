import { logUser } from "@/store/slices/LoginUser"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function LoginUserUI() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function loggedUser(data) {

        dispatch(logUser({
            UserLogged: {
                name: data.username,
                email: data.email,
                password: data.password,
                phone: "Numero di telefono non inserito",
                birthPlace: "Luogo di nascita non inserito",
                date: "1970-01-01"
            }
        }))

        navigate("/")
    }

    return (
        <>
            <div className="card">

                <h2>Accedi</h2>

                <form onSubmit={handleSubmit(loggedUser)}>

                    <div className="mb-3">
                        <label className="form-label">Username</label>

                        <input
                            type="text"
                            className="form-control"
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
                            })}
                        />

                        {errors.username && (
                            <p className="text-danger">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            {...register("email", {
                                required: "Email richiesta(es. MarcoRossi@gmail.com)",
                                pattern: {
                                    value: /^\S+@gmail\.com$/i,
                                    message: "Email non valida",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-danger">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input
                            type="password"
                            className="form-control"
                            {...register("password", {
                                required: "Password richiesta",
                                minLength: {
                                    value: 6,
                                    message: "Lunghezza minima 6",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-danger">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="d-flex gap-2">

                        <button
                            disabled={isSubmitting}
                            className="btn btn-primary"
                            type="submit"
                        >
                            {isSubmitting ? "Loading..." : "Accedi"}
                        </button>

                        <GoogleOAuthProvider clientId="997749676177-a0k16bjeev73vg5sch27sfq9rqbe7lju.apps.googleusercontent.com">

                            <GoogleLogin
                                onSuccess={(credentialResponse) => {

                                    const decoded = jwtDecode(
                                        credentialResponse.credential
                                    );

                                    console.log(decoded);

                                    dispatch(logUser({
                                        UserLogged: {
                                            name: decoded.name,
                                            email: decoded.email,
                                            phone: "Numero di telefono non inserito",
                                            birthPlace: "Luogo di nascita non inserito",
                                            date: "1970-01-01"
                                        }
                                    }));

                                    navigate("/");
                                }}

                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />

                        </GoogleOAuthProvider>

                    </div>

                </form>

            </div>
        </>
    )
}