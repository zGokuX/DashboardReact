import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSingleUser } from "../services/requests"

export default function UserView(props) {
    const {userid} = useParams()
    const [user,setUser] = useState('')

    useEffect(() => {
      fetchSingleUser(userid).then((userRes) => {
        setUser(userRes)
      })
      console.log(user)
    
    }, [userid])
    
    
    return (
        <>
            <div className="adjustment-layout-user">
                <div className="card">
                    <div className="card-content">
                        <h4>Dati dell'utente {user.username}</h4>
                        <p>Nome: {user.firstName}</p>
                        <p>Cognome: {user.lastName}</p>
                        <p>Genere: {user.gender}</p>
                        <p>Eta': {user.age}</p>
                        <p>Email: {user.email}</p>
                        <p>Numero di telefono: {user.phone}</p>
                        <p>Azienda: {user.company?.department}</p>
                        <p>Anno di nascita: {user.birthDate}</p>
                        <p>Nazione attuale: {user.address?.country}</p>
                        <p>Luogo di laurea: {user.university}</p>
                        <p>Ruolo nel sito: {user.role}</p>
                    </div>
                </div>
                
            </div>

        </>
    )
}