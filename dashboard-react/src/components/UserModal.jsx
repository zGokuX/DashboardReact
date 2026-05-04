import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserModal({ show, onHide, user, title, isNew, onUserChange }) {

    const [localUser, setLocalUser] = useState(isNew ? { firstName: '', lastName: '', company: '' } : { ...user })

    function saveHandler() {
        onHide()
        onUserChange(localUser, isNew)
    }

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="" onSubmit={(e) => e.preventDefault}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" defaultValue={localUser.firstName} placeholder="Scrivi il tuo nome..." onChange={(e) => setLocalUser({ ...localUser, firstName: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" defaultValue={localUser.lastName} placeholder="Scrivi il tuo cognome..." onChange={(e) => setLocalUser({ ...localUser, lastName: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Azienda</Form.Label>
                            <Form.Control type="text" defaultValue={localUser?.company?.department} placeholder="Inserisci la tua azienda..." onChange={(e) => setLocalUser({ ...localUser, company: { department: e.target.value } })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" defaultValue={localUser.email} placeholder='Inserisci la tua email...' onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control type="text" defaultValue={localUser.phone} placeholder='Inserisci il tuo numero di telefono...' onChange={(e) => setLocalUser({ ...localUser, phone: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Università</Form.Label>
                            <Form.Control type="text" defaultValue={localUser.university} placeholder='Inserisci la tua università...' onChange={(e) => setLocalUser({ ...localUser, username: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Età - {localUser.age}</Form.Label>
                            <Form.Range max={140} defaultValue={localUser.age} onChange={(e) => setLocalUser({ ...localUser, age: e.target.value })} />
                        </Form.Group>
                        <Form.Select aria-label="Default select example" onChange={(e) => setLocalUser({ ...localUser, gender: e.target.value })}>
                            <option>Inserisci il tuo Genere</option>
                            <option value="male">Maschio</option>
                            <option value="female">Femmina</option>
                        </Form.Select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={saveHandler}>
                        Salva modifiche
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserModal;