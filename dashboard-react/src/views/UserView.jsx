import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchSingleUser } from "../services/requests"
import FieldUser from "@/components/User/FieldUser"
import { Button } from "react-bootstrap"

export default function UserView() {

    const { userid } = useParams()

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        fetchSingleUser(userid).then((userRes) => {
            setUser(userRes)
        })
    }, [userid])

    return (
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
                <Button variant="danger" onClick={() => navigate("/")}>Torna indietro</Button>
            </div>
        </div>
    )
}