import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductsTable from '../Product/ProductTable';
import { useEffect, useState } from 'react';
import { fetchSingleUser } from '@/services/requests';

function CartsModal({ show, onHide, products }) {
    const [cartUser, setCartUser] = useState(null)
    {console.log(products)}
    useEffect(() => {
        fetchSingleUser(products.userId).then((res => {
            setCartUser(res)
        }))

    }, [])
    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Carts details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='clienti container-full-width'>
                    <div className='card client-card'>
                        {cartUser &&
                        <>
                            <h3> {cartUser.firstName + " " + cartUser.lastName}</h3>
                        </>
                        }
                        <ProductsTable productList={products.products} modalMode={true} isCarts={true} showMoreOption={false} />
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CartsModal;