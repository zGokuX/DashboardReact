import { addProduct, fetchProductsAllCategoryRequest, selectAllCategory, selectProducts } from "@/store/slices/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
export default function AddProductModal({ show, onHide }) {
    const dispatch = useDispatch()
    function titleProcess(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    const products = useSelector(selectProducts)
    const allCategory = useSelector(selectAllCategory)
    const [isChecked, setIsChecked] = useState(false)
    const [getTitle, setGetTitle] = useState(null)
    const [getCategory, setGetCategory] = useState(null)
    const [getPrice, setGetPrice] = useState(null)
    /* const [getImage, setGetImage] = useState(null) */
    const [getDiscount, setGetDiscount] = useState(null)

    function addingProduct() {
        if (!getTitle || !getCategory || !getPrice) {
            return;
        }

        const exists = products.some(item => item.title === getTitle);

        if (exists) {
            console.log("prodotto già esistente");
            return;
        }

        dispatch(
            addProduct({
                id: products.length
                    ? products[products.length - 1].id + 1
                    : 1,
                title: getTitle,
                price: getPrice,
                category: getCategory,
                discountPercentage: getDiscount || "None",
                availabilityStatus: "In Stock",
            })
        );

        onHide();
    }
    useEffect(() => {
        dispatch(fetchProductsAllCategoryRequest())
    }, [])
    useEffect(() => {
        console.log(allCategory)
    }, [allCategory])
    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi prodotto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome prodotto</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il nome del prodotto" onChange={(e) => setGetTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Prezzo prodotto</Form.Label>
                        <Form.Control type="number" placeholder="Inserisci il prezzo del prodotto" onChange={(e) => setGetPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Select
                        className="w-25 mb-3"
                        onChange={(e) => setGetCategory(e.target.value)}
                    >
                        <option value="default">Inserisci Categoria</option>

                        {allCategory.map((item, index) => (
                            <option key={index} value={item} >
                                {titleProcess(item.replace("-", " "))}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Il prodotto ha uno sconto?</Form.Label>
                        <Form.Check
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        {isChecked &&
                            <>
                                <Form.Label>Di quanto?</Form.Label>
                                <Form.Control type="number" placeholder="Inserisci sconto" onChange={(e) => setGetDiscount(e.target.value)} />
                            </>
                        }
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        addingProduct()
                    }}
                >
                    Aggiungi
                </Button>
                <Button variant="danger" onClick={onHide}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    )

}