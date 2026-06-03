import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function UserFormModal({ show, onHide, user, title, isNew, onUserChange }) {
    const AddUserSchema = z.object({
        name: z
            .string()
            .min(4, "Lunghezza minima 4")
            .max(15, "Lunghezza massima 15"),

        surname: z
            .string()
            .min(4, "Lunghezza minima 4")
            .max(15, "Lunghezza massima 15"),

        company: z
            .string()
            .min(4, "Lunghezza minima 4")
            .max(15, "Lunghezza massima 15"),

        email: z
            .string()
            .email("Email non valida")
            .regex(/^\S+@gmail\.com$/i, "Solo Gmail accettate"),

        phone: z
            .string()
            .min(5, "Numero troppo corto")
            .max(15, "Lunghezza massima 15"),

        placeBirth: z
            .string()
            .min(2, "Luogo richiesto")
            .max(15, "Lunghezza massima 15"),

        age: z.coerce.number().min(0).max(140),

        university: z.string().optional(),

        gender: z.enum(["male", "female"]),
    });
    type AddUserSchema = z.infer<typeof AddUserSchema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(AddUserSchema),
        defaultValues: {
            name: user?.firstName || "",
            surname: user?.lastName || "",
            company: user?.company?.department || "",
            email: user?.email || "",
            phone: user?.phone || "",
            placeBirth: user?.address?.city || "",
            age: user?.age || 0,
            university: user?.university || "",
            gender: user?.gender || "",
        },
    });

    function saveHandler(data: AddUserSchema) {
        const formattedUser = {
            firstName: data.name,
            lastName: data.surname,
            company: {
                department: data.company,
            },
            email: data.email,
            phone: data.phone,
            address: {
                city: data.placeBirth,
            },
            age: Number(data.age),
            university: data.university,
            gender: data.gender,
        };

        onUserChange(formattedUser, isNew);
        onHide();
    }

    return (
        <Modal className="modal-xl" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
                <Form onSubmit={handleSubmit(saveHandler)}>
                    <div className="row">

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cognome"
                                    {...register("surname")}
                                />
                                {errors.surname && (
                                    <p className="text-danger">
                                        {errors.surname.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Azienda</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Azienda"
                                    {...register("company")}
                                />
                                {errors.company && (
                                    <p className="text-danger">
                                        {errors.company.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-danger">
                                        {errors.email.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Telefono"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className="text-danger">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Luogo di nascita</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Luogo di nascita"
                                    {...register("placeBirth")}
                                />
                                {errors.placeBirth && (
                                    <p className="text-danger">
                                        {errors.placeBirth.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-12">
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Età - {user?.age}
                                </Form.Label>
                                <Form.Range
                                    min={0}
                                    max={140}
                                    {...register("age")}
                                />
                                {errors.age && (
                                    <p className="text-danger">
                                        {errors.age.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Università</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Università"
                                    {...register("university")}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Genere</Form.Label>
                                <Form.Select {...register("gender")}>
                                    <option value="">
                                        Seleziona genere
                                    </option>
                                    <option value="male">Maschio</option>
                                    <option value="female">Femmina</option>
                                </Form.Select>

                                {errors.gender && (
                                    <p className="text-danger">
                                        {errors.gender.message}
                                    </p>
                                )}
                            </Form.Group>
                        </div>
                    </div>

                    <div className="d-flex gap-3">
                        <Button variant="danger" onClick={onHide}>
                            Chiudi
                        </Button>

                        <Button variant="primary" type="submit">
                            Salva modifiche
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UserFormModal;