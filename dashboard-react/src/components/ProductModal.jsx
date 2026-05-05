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
                <div className='clienti container-full-width'>
                    <div className='card client-card'>
                        <ProductsTable productList={[product]} modalMode={true} isCarts={false} showMoreOption={true}/>
                    </div>
                    
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