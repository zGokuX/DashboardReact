import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

function UserFormModal({ show, onHide, user, title, isNew, onUserChange }) {

    const [localUser, setLocalUser] = useState(isNew ? { firstName: '', lastName: '', company: '' } : { ...user })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    function saveHandler() {
        onHide()
        onUserChange(localUser, isNew)
    }

    return (
        <>

            <Modal className='modal-xl' show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
               <Form onSubmit={handleSubmit(saveHandler)}>
                        <div className='row'>
                            <div className="col-6"><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" defaultValue={localUser.firstName}

                                    {...register("name", {
                                        required: "Nome richiesto",
                                        maxLength: {
                                            value: 15,
                                            message: "Lunghezza massima 15",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Lunghezza minima 4",
                                        },
                                    })}
                                    placeholder="Scrivi il tuo nome..." onChange={(e) => setLocalUser({ ...localUser, firstName: e.target.value })} />
                                {errors.name && (
                                    <p className="text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </Form.Group></div>

                            <div className="col-6"><Form.Group className="mb-3">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control type="text" defaultValue={localUser.lastName}
                                    {...register("surname", {
                                        required: "Cognome richiesto",
                                        maxLength: {
                                            value: 15,
                                            message: "Lunghezza massima 15",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Lunghezza minima 4",
                                        },
                                    })}
                                    placeholder="Scrivi il tuo cognome..." onChange={(e) => setLocalUser({ ...localUser, lastName: e.target.value })} />
                                {errors.surname && (
                                    <p className="text-danger">
                                        {errors.surname.message}
                                    </p>
                                )}
                            </Form.Group></div>

                            <div className="col-6"><Form.Group className="mb-3">
                                <Form.Label>Azienda</Form.Label>
                                <Form.Control type="text" defaultValue={localUser?.company?.department}
                                    {...register("company", {
                                        required: "Azienda richiesta",
                                        maxLength: {
                                            value: 15,
                                            message: "Lunghezza massima 15",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Lunghezza minima 4",
                                        },
                                    })}
                                    placeholder="Inserisci la tua azienda..." onChange={(e) => setLocalUser({ ...localUser, company: { department: e.target.value } })} />
                                {errors.company && (
                                    <p className="text-danger">
                                        {errors.company.message}
                                    </p>
                                )}
                            </Form.Group></div>

                            <div className="col-6"><Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={localUser.email}
                                    {...register("email", {
                                        required: "Email richiesta(es. MarcoRossi@gmail.com)",
                                        pattern: {
                                            value: /^\S+@gmail\.com$/i,
                                            message: "Email non valida",
                                        },
                                    })}
                                    placeholder='Inserisci la tua email...' onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })} />
                                {errors.email && (
                                    <p className="text-danger">
                                        {errors.email.message}
                                    </p>
                                )}
                            </Form.Group></div>

                            <div className="col-6"><Form.Group className="mb-3">
                                <Form.Label>Numero di telefono</Form.Label>
                                <Form.Control type="text" defaultValue={localUser.phone}
                                    {...register("phone", {
                                        required: "Numero di telefono richiesto",
                                        maxLength: {
                                            value: 15,
                                            message: "Lunghezza massima 15",
                                        },

                                    })}
                                    placeholder='Inserisci il tuo numero di telefono...' onChange={(e) => setLocalUser({ ...localUser, phone: e.target.value })} />
                                {errors.phone && (
                                    <p className="text-danger">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </Form.Group></div>

                            <div className="col-6"><Form.Group className="mb-3">
                                <Form.Label>Luogo di nascità</Form.Label>
                                <Form.Control type="text" defaultValue={localUser.address?.city}
                                    {...register("placeBirth", {
                                        required: "Luogo di nascita richiesto",
                                        maxLength: {
                                            value: 15,
                                            message: "Lunghezza massima 15",
                                        },

                                    })}
                                    placeholder='Inserisci il tuo luogo di nascita...' onChange={(e) => setLocalUser({ ...localUser, address: { city: e.target.value } })} />
                                {errors.placeBirth && (
                                    <p className="text-danger">
                                        {errors.placeBirth.message}
                                    </p>
                                )}
                            </Form.Group></div>

                            <div className="col-12"><Form.Group className="mb-3">
                                <Form.Label>Età - {localUser.age}</Form.Label>
                                <Form.Range max={140} defaultValue={localUser.age} onChange={(e) => setLocalUser({ ...localUser, age: e.target.value })} />
                            </Form.Group></div>


                            <div className="col-6"><Form.Group className="mb-3">
                                <Form.Label>Università</Form.Label>
                                <Form.Control type="text" defaultValue={localUser.university} placeholder='Inserisci la tua università...' onChange={(e) => setLocalUser({ ...localUser, university: e.target.value })} />
                            </Form.Group></div>


                            <div className='col-6'>
                                <Form.Label>Genere</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setLocalUser({ ...localUser, gender: e.target.value })}>
                                    <option>Inserisci il tuo Genere</option>
                                    <option value="male">Maschio</option>
                                    <option value="female">Femmina</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='d-flex gap-3'>

                        <Button variant="danger" onClick={onHide}>
                            Chiudi
                        </Button>
                        <Button variant="primary" type='submit'>
                            Salva modifiche
                        </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserFormModal;