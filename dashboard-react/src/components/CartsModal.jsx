import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductsTable from './ProductTable';

function CartsModal({ show, onHide, cart }) {
    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Carts details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='clienti container-full-width'>
                    <div className='card client-card'>
                        <ProductsTable productList={cart.products} modalMode={true} isCarts={true} showMoreOption={false}/>
                    </div>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CartsModal;