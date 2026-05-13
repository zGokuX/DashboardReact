import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import {
    fetchSingleUser,
} from "../../services/requests";

function ConfirmModal({
    show,
    onHide,
    cart,
    onCartDelete,
}) {
    const [cartUser, setCartUser] = useState(null); // todo eliminare non usato 

    useEffect(() => {
        if (cart?.userId) {
            fetchSingleUser(cart.userId).then((res) => {
                setCartUser(res);
            });
        }
    }, [cart]);

    async function handleDelete() {
        try {

            onCartDelete(cart.id);

            onHide();
        } catch (error) {
            console.error(
                "Errore eliminazione carrello:",
                error
            );
        }
    }

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Conferma eliminazione
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="clienti container-full-width">
                    <div className="card client-card">
                        <p className="mt-3">
                            Sei sicuro di voler eliminare questo
                            carrello?
                        </p>
                    </div>
                </div>


            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    Annulla
                </Button>

                <Button
                    variant="danger"
                    onClick={handleDelete}
                >
                    Elimina
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;