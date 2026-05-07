import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductsTable from './ProductTable';
import { ArrowClockwise, FileEarmarkText, PersonVcard, ShieldCheck, StarFill } from 'react-bootstrap-icons';

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
                            <div className='text-nowrap rounded d-inline-flex mb-5 bg-body-tertiary shadow-sm bg-light border justify-content-center align-items-center p-2 px-4'>
                                <i
                                    className="text-primary fa fa-shopping-basket"
                                    aria-hidden="true"
                                ></i>

                                <span className='ms-2 text-primary'>
                                    {product.category}
                                </span>
                            </div>
                            <div className='card-topbar d-flex gap-5'>
                                <div className='d-flex gap-2 p-3 bg-light border id-product-container rounded p-2'>
                                    <PersonVcard className='mt-3 text-primary' size={32} />
                                    <span className='text-muted'>ID prodotto<p className='mt-2 mb-1 text-dark'><b>{product.id}</b></p></span>
                                </div>
                                <div className='d-flex gap-2 p-3 rating-product-container bg-warning-subtle border id-product-container rounded p-2'>
                                    <StarFill className='mt-3 text-warning' size={32} />
                                    <span className='text-muted '>Valutazione <p className='mt-2 mb-1 text-dark'><b>{product.rating}</b></p></span>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='container-card d-flex gap-4'>
                        <div className='card w-50'>
                            <div className='d-flex gap-2 p-3 flex-row '>
                                <FileEarmarkText
                                    className='bg-light border-0 text-primary rounded-circle p-2'
                                    width={95}
                                    height={40}
                                />

                                <span>
                                    Descrizione
                                    <p className='text-muted w-75 small'>
                                        {product.description}
                                    </p>
                                </span>
                            </div>
                            <hr className="my-1" />
                            <div className='d-flex gap-2 p-3 flex-row'>
                                <ArrowClockwise className='bg-light border-0 text-primary  rounded-circle p-1' size={38} />
                                <span>Policy rimborso <p className='text-muted small'>{product.returnPolicy}</p></span>
                            </div>
                            <hr className="my-1" />
                            <div className='d-flex gap-2 p-3 flex-row'>
                                <ShieldCheck className='bg-light border-0 text-primary  rounded-circle p-1' size={38} />
                                <span>Garaniza <p className='text-muted small'>{product.warrantyInformation}</p></span>
                            </div>


                        </div>
                        <div className='card p-3 w-75'>
                            <ul className='p-0 '>
                                <h5>Ultime valutazioni con commento</h5>
                                {product.reviews.map((item, index) => (
                                    <div key={index} className='mb-2 card d-flex flex-row align-items-center p-3 bg-body-tertiary lh-1'>
                                        <StarFill className='text-warning' size={20} />
                                        <span> <b className='me-5'>{item.rating}</b> {item.comment}</span>
                                    </div>
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