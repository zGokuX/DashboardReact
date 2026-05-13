
import { Button, Modal } from "react-bootstrap"
import {
    Envelope,
    Telephone,
    Building,
    Cake,
    GeoAlt,
    Mortarboard,
    Person,
} from "react-bootstrap-icons"
import { fetchSingleUser } from "@/services/requests"
import { useState } from "react"

export default function UserDetail({ show , onHide , userId}) {

    const [user,setUser] = useState([])

    fetchSingleUser(userId).then(res => {
        setUser(res)
    })

    const fields = [
        { Icon: Envelope, label: "Email", value: user.email },
        { Icon: Telephone, label: "Telefono", value: user.phone },
        { Icon: Building, label: "Azienda", value: user.company?.department },
        { Icon: Cake, label: "Data di nascita", value: user.birthDate },
        { Icon: GeoAlt, label: "Nazione", value: user.address?.country },
        { Icon: Mortarboard, label: "Università", value: user.university },
        { Icon: Person, label: "Genere", value: user.gender },
    ]


    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    User detail modal
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="card border m-3">
                    <div className="card-body p-3">

                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="flex-grow-1">
                                <p className="mb-0 fw-medium" >
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="mb-0 text-secondary">
                                    @{user.username} · {user.age} anni
                                </p>
                            </div>
                            <span
                                className="badge rounded-pill bg-success"

                            >
                                {user.role}
                            </span>
                        </div>

                        <hr className="my-2" />

                        <ul className="list-unstyled mb-0">
                            {fields.map(({ Icon, label, value }) => (
                                <li
                                    key={label}
                                    className="d-flex align-items-center py-2"

                                >
                                    <Icon size={16} aria-hidden="true" />
                                    <span className="ms-2">
                                        {label}:
                                    </span>
                                    <span className="ms-3">{value}</span>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>


            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>

    )
}