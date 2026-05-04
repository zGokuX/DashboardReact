import { useEffect, useState } from "react"
import fetchUser from "../services/requests"
import UserModal from "./UserModal"

export default function RecentUsers() {
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')
    const [isNew, setIsNew] = useState(true) //isNew
    useEffect(() => {
        getUser(20)

    }, [])

    async function getUser(maxUser) {
        const user = await fetchUser(maxUser)
        setUserList(user)
    }


    function handleButton(user) {
        setSelectedUser(user)
        setShowModal(true)
        setIsNew(true)
        setMessage('Modifica utente')
        console.log(user)
    }

    return (
        <>
            {showModal && (
                <UserModal show={showModal}
                    onHide={() => setShowModal(false)}
                    onUserChange={(user, isCheck) => {
                        console.log(user)
                        if (!isCheck) {
                            setUserList(userList.map(item => {
                                if (user.id === item.id) {
                                    return { ...item, ...user }
                                }
                                return item
                            }))
                        } else {
                            setUserList([...userList, user])
                        }
                    }}
                    user={selectedUser}
                    title={message}
                    check={isNew}
                />
            )}
            <div className="card client-card">
                <div className="card-title">

                    <h4>Clienti recenti</h4>

                    <div className="card-actions" id="btn-card-actions">
                        <span className="card-action-list">Vedi Tutti</span>
                    </div>
                </div>
                <button className="custom-btn" id="add-clients" onClick={() => { setShowModal(true), setMessage('Aggiungi cliente'), setIsNew(false) }}>Aggiungi cliente </button>
                <div className="client-list" id="client-list-id">
                    {userList.map(item => {
                        return (

                            <div className="row-list" key={item.id}>
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
                                <button className="custom-btn modify-btn" onClick={() => handleButton(item)}>Modifica</button>
                                <button className="filter-btn custom-btn">Filtra</button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}