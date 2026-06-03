import { selectIsLogged, selectUserLogged } from "@/store/slices/LoginUser"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Loading from "@/components/LoadingGif/Loading"
import FeedbackLoadingModal from "./FeedbackLoadingModal"

export default function FeedbackImprove() {
    const isLogged = useSelector(selectIsLogged)
    const navigate = useNavigate()
    const user = useSelector(selectUserLogged).UserLogged
    const [getFeedback, setGetFeedback] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const sendFeedback = async (e) => {
        e.preventDefault()
        setDisableBtn(true)
        setShowModal(true)
        try {
            await fetch("https://script.google.com/macros/s/AKfycbyOIEC796boienfU5ly6CAaRz4REd31t2MdHeZQnIIsegxi0TcdPCPVhsSyTPeGesrj/exec", {
                method: "POST",
                body: JSON.stringify({
                    name: user.name,
                    message: getFeedback,
                }),
            })

            alert("Feedback inviato!")
            setGetFeedback("")
            setDisableBtn(false)
            setShowModal(false)
        } catch (err) {
            console.log(err)
        }
    }
 useEffect(() => {
    if (!isLogged) {
        navigate("/login")
        return
    }
}, [])

    return (
        <>
            {!isLogged && (
                <>
                    <Loading height={100} />
                </>
            )
            }

            {showModal &&
                <FeedbackLoadingModal
                    show={disableBtn}
                />
            }
            {isLogged &&
                <Form className="card" onSubmit={sendFeedback}>
                    <h1>Feedback</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Esprimi il tuo feedback e dicci possiamo migliorare</Form.Label>
                        <Form.Control onChange={(e) => setGetFeedback(e.target.value)} as="textarea" rows={3} maxLength={351} style={{ "resize": "none" }} placeholder="Enter feedback" />
                    </Form.Group>
                    <Button disabled={disableBtn} variant="primary" type="submit" style={{ "width": "10rem" }}>
                        Invia feedback
                    </Button>
                </Form>
            }


        </>

    )
}