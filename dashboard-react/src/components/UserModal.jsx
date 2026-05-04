import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserModal({ show, onHide, user, title, check, onUserChange }) {

    const [localUser, setLocalUser] = useState(check? {...user} : {firstName: '' , lastName: '', company: ''})

    function saveHandler() {
        onHide()
        onUserChange({ firstName: localUser.firstName, lastName: localUser.lastName, company: localUser.company.department },check)
    }

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="" onSubmit={(e) => e.preventDefault}>
                        <label htmlFor="name">Nome</label><br />
                        <input type="text" defaultValue={user.firstName} placeholder='Inserisci nome...' onChange={(e) => setLocalUser({ ...user, firstName: e.target.value })} /><br /><br />
                        <label htmlFor="name">Cognome</label><br />
                        <input type="text" defaultValue={user.lastName} onChange={(e) => setLocalUser({ ...user, lastName: e.target.value })}/><br /><br />
                        <label htmlFor="name">Azienda</label><br />
                        <input type="text" defaultValue={user.company.department} onChange={(e) => setLocalUser({ ...user, company: { department: e.target.value }})}/><br />
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