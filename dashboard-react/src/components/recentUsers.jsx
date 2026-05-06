import { useEffect, useState } from "react"
import fetchUser, { fetchFilterNames, fetchUserFilter } from "../services/requests"
import UserModal from "./UserModal"
import { Button, Form, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function RecentUsers(props) {
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [filterAge, setFilterAge] = useState(0)
    const [message, setMessage] = useState('')
    const [isNew, setIsNew] = useState(false) //isNew

    async function getUser(maxUser) {
        const user = await fetchUser(maxUser)
        setUserList(user)
        setAllUsers(user)
    }

    useEffect(() => {

        getUser(props.maxViewUser)

    }, [])

    function editButton(user) {
        setSelectedUser(user)
        setShowModal(true)
        setIsNew(false)
        setMessage('Modifica utente')
        console.log(user)
    }

    function filterPlus(filterName, value) {
        if (value === 'default') {
            setUserList(allUsers)
            return
        }

        if (filterName === 'age') {
            const filtered = allUsers.filter(user => user.age == value)

            if (filtered.length === 0) {
                setUserList(allUsers)
            } else {
                setUserList(filtered)
            }
            return
        }
        
        fetchUserFilter(filterName, value).then((res) => {
            setUserList(res)
        })
    }
    function filterNames(value) {
        console.log(value)
        fetchFilterNames(value).then((res) => {
            setUserList(res)
        })
    }

    function addButton() {
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
                    <Button variant="outline-primary" className="modify-btn" onClick={() => editButton(item)}>Modifica</Button>
                    {!props.inPage &&
                        <Button variant="outline-primary" className="filter-btn " onClick={() => props.onSelectUser(item)}>Filtra</Button>
                    }
                    <nav>
                        <Link to={`/user/${item.id}`}><Button variant="outline-primary" className="filter-btn ">Details</Button></Link>
                    </nav>
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
                        console.log("E UN NUOVO UTENTE: ", isNewUser)
                        console.log("UTENTE: ", user)
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
            <div className="clienti container-full-width">
                <div className="card client-card">
                    <div className="card-title">

                        <h4>Clienti recenti</h4>
                        {!props.inPage &&
                            <div className="card-actions" id="btn-card-actions">
                                <nav>
                                    <Link to="/users"><span className="card-action-list">Vedi Tutti</span></Link>
                                </nav>
                            </div>
                        }
                    </div>
                    <button className="custom-btn" id="add-clients" onClick={addButton}>Aggiungi cliente </button>
                    <div className="client-list" id="client-list-id">
                        {props.inPage &&
                            <>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Cerca nome dell'utente"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => filterNames(e.target.value)}
                                    />
                                </InputGroup>
                                <div className='d-flex p-2 gap-3'>
                                    <Form.Select className="w-25 h-25" aria-label="Default select example" defaultValue="default"
                                        onChange={(e) => {
                                            const value = e.target.value
                                            filterPlus('gender', value)
                                        }}>
                                        <option value="default">Genere</option>
                                        <option value="male">Maschio</option>
                                        <option value="female">Femmina</option>
                                    </Form.Select>
                                    <Form.Select className="w-25 h-25" aria-label="Default select example" defaultValue="default"
                                        onChange={(e) => {
                                            const value = e.target.value
                                            filterPlus('role', value)
                                        }}>
                                        <option value="default">Ruolo</option>
                                        <option value="admin">admin</option>
                                        <option value="moderator">moderatore</option>
                                        <option value="user">utente</option>
                                    </Form.Select>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Età - {filterAge}</Form.Label>
                                        <Form.Range max={140} defaultValue={filterAge} onChange={(e) => {
                                            const value = e.target.value
                                            setFilterAge(value)
                                            filterPlus('age', value)
                                        }} />
                                    </Form.Group>
                                </div>

                            </>
                        }
                        {renderUser()}

                    </div>
                </div>
            </div >
        </>
    )
}