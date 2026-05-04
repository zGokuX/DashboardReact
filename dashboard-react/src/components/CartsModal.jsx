import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CartsModal({ show, onHide, nomeProdotto, immagineProdotto, prezzoProdotto, categoriaProdotto, recensioneProdotto, descrizioneRecensioneProdotto }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Carts details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>{nomeProdotto}</h3>
                <p>Categoria: <b>{categoriaProdotto}</b></p>
                <p>Immagine prodotto:</p>
                <img width={100} src={immagineProdotto} alt="Product image" />
                <p>Prezzo: <b>{prezzoProdotto} €</b></p>
                <p>Valutazione: <b>{recensioneProdotto}</b></p>
                <p>ULTIME RECENSIONI</p>
                {descrizioneRecensioneProdotto.map((item, index) => (
                    <div key={item.id ? item.id : index}>
                        <p>Rating: <b>{item.rating}</b> - Comment: {item.comment}</p>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CartsModal;