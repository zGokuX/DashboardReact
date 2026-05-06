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
                <div className='p-4'>
                    <div className='d-flex'>
                        <div className='card image-container mb-4'>
                            <img src={product.thumbnail} alt="" />
                        </div>
                        <div className='ms-3 card-title d-block'>
                            <h5 className='mb-3'>{product.title}</h5>
                            <div className='rounded d-flex mb-5 bg-primary-subtle w-25 justify-content-center p-1'><span className='text-primary'>{product.category}</span></div>
                            <div className='card-topbar d-flex gap-5'>
                                <div className='id-product-container'>
                                    <span className='text-secondary '>ID prodotto<p className='text-dark'><b>{product.id}</b></p></span>
                                </div>
                                <div className='rating-product-container'>
                                    <span className='text-secondary '>Valutazione <p className='text-dark'><b>{product.rating}</b></p></span>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='container-card'>
                        <div>
                            <p>Policy rimborso: {product.returnPolicy}</p>
                            <p>Garaniza: {product.warrantyInformation}</p>
                            <p>Descrizione: {product.description}</p>
                            <p>Categoria: {product.category}</p>
                            <p>Ultime valutazioni con commento:</p>
                            <ul>
                                {product.reviews.map((item, index) => (
                                    <li key={index}>
                                        Rating: {item.rating} — {item.comment}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;