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
                        <input type="text" defaultValue={localUser.firstName} placeholder='Inserisci nome...' onChange={(e) => setLocalUser({ ...localUser, firstName: e.target.value })} /><br /><br />
                        <label htmlFor="name">Cognome</label><br />
                        <input type="text" defaultValue={localUser.lastName} onChange={(e) => setLocalUser({ ...localUser, lastName: e.target.value })}/><br /><br />
                        <label htmlFor="name">Azienda</label><br />
                        <input type="text" defaultValue={localUser.company.department} onChange={(e) => setLocalUser({ ...localUser, company: { department: e.target.value }})}/><br />
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