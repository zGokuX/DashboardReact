import { selectIsLogged, selectUserLogged } from "@/store/slices/LoginUser"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function FeedbackImprove() {
    const isLogged = useSelector(selectIsLogged)
    const user = useSelector(selectUserLogged).UserLogged
    const [getFeedback , setGetFeedback] = useState(null)
    const sendFeedback = async (e) => {
    e.preventDefault()

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
    } catch (err) {
        console.log(err)
    }
}
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogged) {
            navigate("/login")
        }
    }, [])

    return (
        <Form className="card"  onSubmit={sendFeedback}>
            <h1>Feedback</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Esprimi il tuo feedback e dicci possiamo migliorare</Form.Label>
                <Form.Control onChange={(e) => setGetFeedback(e.target.value)}  as="textarea" rows={3} maxLength={351} style={{"resize":"none"}} placeholder="Enter feedback" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{"width":"10rem"}}>
                Invia feedback
            </Button>
        </Form>
    )
}