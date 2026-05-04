import { useEffect, useState } from "react"
import fetchUser from "../services/requests"
import UserModal from "./UserModal"

export default function RecentUsers(props) {
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')
    const [isNew, setIsNew] = useState(false) //isNew
    
    async function getUser(maxUser) {
        const user = await fetchUser(maxUser)
        // console.log(user.map(item => item.id))
        // console.log(user.length)
        setUserList(user)
    }
    
    useEffect(() => {
        getUser(10)
        
    }, [])

    function editButton(user) {
        setSelectedUser(user)
        setShowModal(true)
        setIsNew(false)
        setMessage('Modifica utente')
        console.log(user)
    }

    function addButton(){
        setShowModal(true)
        setMessage('Aggiungi cliente')
        setIsNew(true) 
    }

    function renderUser() {
        return (userList.map(item => {
            // console.log(item)
            return (
                <div className="row-list" key={item.id + item.firstName}>
                    <div className="client-avatar">
                        <img src={item.image} alt="Client Avatar" />
                    </div>
                    <div className="client-info">
                        <h5>{item.firstName + " " + item.lastName}</h5>
                        <h6>{item.company.department}</h6>
                    </div>
                    <div className="client-price">
                        <span>€ 1.200</span>
                    </div>
                    <button className="custom-btn modify-btn" onClick={() => editButton(item)}>Modifica</button>
                    <button className="filter-btn custom-btn" onClick={() => props.onSelectUser(item)}>Filtra</button>
                </div>
            )
        }))
    }
    return (
        <>
            {showModal && (
                <UserModal show={showModal}
                    onHide={() => setShowModal(false)}
                    onUserChange={(user, isNewUser) => {
                        console.log("E UN NUOVO UTENTE: ",isNewUser)
                        console.log("UTENTE: ",user)
                        if (isNewUser) {
                            setUserList([...userList, user])
                        } else {
                            setUserList(userList.map(item => {
                                if (user.id === item.id) {
                                    return { ...item, ...user }
                                }
                                return item
                            }))
                        }
                    }}
                    user={selectedUser}
                    title={message}
                    isNew={isNew}
                />
            )}
            <div className="card client-card">
                <div className="card-title">

                    <h4>Clienti recenti</h4>

                    <div className="card-actions" id="btn-card-actions">
                        <span className="card-action-list">Vedi Tutti</span>
                    </div>
                </div>
                <button className="custom-btn" id="add-clients" onClick={addButton}>Aggiungi cliente </button>
                <div className="client-list" id="client-list-id">
                    {renderUser()}

                </div>
            </div>
        </>
    )
}