import { Button, Modal } from "react-bootstrap"
import { fetchSingleUser } from "@/services/requests"
import { useEffect, useState } from "react"
import FieldUser from "./FieldUser"

export default function UserDetail({ show, onHide, userId }) {

    const [user, setUser] = useState({})

    useEffect(() => {

        if (!userId) return

        fetchSingleUser(userId).then(res => {
            setUser(res)
        })

    }, [userId])

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

                                <p className="mb-0 fw-medium">
                                    {user.firstName} {user.lastName}
                                </p>

                                <p className="mb-0 text-secondary">
                                    @{user.username} · {user.age} anni
                                </p>

                            </div>

                            <span className="badge rounded-pill bg-success">
                                {user.role}
                            </span>

                        </div>

                        <hr className="my-2" />

                        <FieldUser user={user} />

                    </div>
                </div>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="danger"
                    onClick={onHide}
                >
                    Chiudi
                </Button>

            </Modal.Footer>

        </Modal>
    )
}