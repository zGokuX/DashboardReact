import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductsTable from './ProductTable';

function ProductModal({ show, onHide, product }) {
    return (
        <Modal show={show} onHide={onHide} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Product details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {console.log(product)}
                <h5>Nome prodotto: {product.title}</h5>
                <p>id prodotto: {product.id}</p>
                <p>Valutazione: {product.rating}</p>
                <p>Categoria: {product.category}</p>
                <p>Descrizione: {product.description}</p>
                <p>Policy rimborso: {product.returnPolicy}</p>
                <p>Garaniza: {product.warrantyInformation}</p>
                <div>
                    <p>Ultime valutazioni con commento:</p>

                    <ul>
                        {product.reviews.map((item, index) => (
                            <li key={index}>
                                Rating: {item.rating} — {item.comment}
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;