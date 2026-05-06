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
                        <div className='shadow-sm card image-container mb-4'>
                            <img src={product.thumbnail} alt="" />
                        </div>
                        <div className='ms-3 card-title d-block'>
                            <h5 className='mb-3'>{product.title}</h5>
                            <div className='text-nowrap rounded d-flex mb-5 bg-body-tertiary shadow-sm w-25 bg-light border justify-content-center p-2 px-5'><i class="text-primary d-flex align-items-center fa fa-shopping-basket" aria-hidden="true"></i><span className='ms-2 text-primary'>{product.category}</span></div>
                            <div className='card-topbar d-flex gap-5'>
                                <div className='bg-light border id-product-container rounded p-2'>
                                    <span className='text-muted  '>ID prodotto<p className='text-dark'><b>{product.id}</b></p></span>
                                </div>
                                <div className='rating-product-container bg-light border id-product-container rounded p-2'>
                                    <span className='text-muted '>Valutazione <p className='text-dark'><b>{product.rating}</b></p></span>
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