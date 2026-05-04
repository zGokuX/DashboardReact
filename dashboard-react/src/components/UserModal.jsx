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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Range</Form.Label>
                            <Form.Range max={140} onChange={(e) => setLocalUser({ ...localUser, age: e.target.value })} />
                        </Form.Group>

                        <Form.Select aria-label="Default select example" onChange={(e) => console.log(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" onChange={(e) => console.log(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <label htmlFor="name">Nome</label><br />
                        <input className='input-row-list' type="text" defaultValue={localUser.firstName} placeholder='Inserisci nome...' onChange={(e) => setLocalUser({ ...localUser, firstName: e.target.value })} /><br /><br />
                        <label htmlFor="surname">Cognome</label><br />
                        <input className='input-row-list' type="text" defaultValue={localUser.lastName} placeholder='Inserisci cognome...' onChange={(e) => setLocalUser({ ...localUser, lastName: e.target.value })} /><br /><br />
                        <label htmlFor="company">Azienda</label><br />
                        <input className='input-row-list' type="text" defaultValue={localUser?.company?.department} placeholder='Inserisci azienda...' onChange={(e) => setLocalUser({ ...localUser, company: { department: e.target.value } })} /><br /><br />
                        <label htmlFor="email">Email</label><br />
                        <input className='input-row-list' type="text" defaultValue={localUser.email} placeholder='Inserisci email...' onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })} /><br /><br />
                        <label htmlFor="number">Numero</label><br />
                        <input className='input-row-list' type="text" defaultValue={localUser.phone} placeholder='Inserisci numero di telefono...' onChange={(e) => setLocalUser({ ...localUser, phone: e.target.value })} /><br /><br />
                        <label htmlFor="email">Università</label><br />
                        <input className='input-row-list' type="text" defaultValue={localUser.university} placeholder='Inserisci università...' onChange={(e) => setLocalUser({ ...localUser, username: e.target.value })} /><br />
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