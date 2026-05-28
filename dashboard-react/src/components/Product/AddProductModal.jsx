import { addProduct, fetchProductsAllCategoryRequest, selectAllCategory, selectProducts } from "@/store/slices/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
export default function AddProductModal({ show, onHide }) {
    const dispatch = useDispatch()
    function titleProcess(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const products = useSelector(selectProducts)
    const allCategory = useSelector(selectAllCategory)
    const [isChecked, setIsChecked] = useState(false)
    const [getTitle, setGetTitle] = useState(null)
    const [getCategory, setGetCategory] = useState(null)
    const [getPrice, setGetPrice] = useState(null)
    const [getDesc, setGetDesc] = useState(null)
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
                discountPercentage: Number(getDiscount) || 0,
                availabilityStatus: "In Stock",
                description: getDesc
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
                <Form onSubmit={handleSubmit(addingProduct)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome prodotto</Form.Label>
                        <Form.Control type="text"
                            {...register("title", {
                                required: "Nome prodotto richiesto",
                                maxLength: {
                                    value: 15,
                                    message: "Lunghezza massima 15",
                                },
                                minLength: {
                                    value: 4,
                                    message: "Lunghezza minima 4",
                                },
                            })}
                            placeholder="Inserisci il nome del prodotto" onChange={(e) => setGetTitle(e.target.value)} />
                        {errors.title && (
                            <p className="text-danger">
                                {errors.title.message}
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descrizione prodotto</Form.Label>
                        <Form.Control type="text"
                            {...register("description", {
                                required: "Descrizione prodotto richiesta",
                                minLength: {
                                    value: 4,
                                    message: "Lunghezza minima 4",
                                },
                            })}
                            placeholder="Inserisci la descrizione del prodotto" onChange={(e) => setGetDesc(e.target.value)} />
                        {errors.description && (
                            <p className="text-danger">
                                {errors.description.message}
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Prezzo prodotto</Form.Label>
                        <Form.Control type="number" placeholder="Inserisci il prezzo del prodotto"
                            {...register("price", {
                                required: "Prezzo richiesto",
                                max: {
                                    value: 99999999,
                                    message: "Non puoi andare oltre i 99999999"
                                }

                            })}
                            onChange={(e) => setGetPrice(Number(e.target.value) > 99999999 ? 99999999 : Number(e.target.value))} />
                        {errors.price && (
                            <p className="text-danger">
                                {errors.price.message}
                            </p>
                        )}
                        <small style={{ "fontSize": "13px" }}>Ricorda se il numero inserito è al di sopra dei 99999999 verrà sovrascritto in 99999999</small>
                    </Form.Group>

                    {/* CATEGORY */}
                    <Form.Group className="w-50 mb-3">
                        <Form.Label>Categoria</Form.Label>

                        <Form.Select
                            {...register("category", {
                                required: "Categoria richiesta",
                                validate: (value) =>
                                    value !== "default" || "Seleziona una categoria valida"
                            })}
                            onChange={(e) => setGetCategory(e.target.value)}
                        >
                            <option value="default">Inserisci Categoria</option>

                            {allCategory.map((item, index) => (
                                <option key={index} value={item}>
                                    {titleProcess(item.replace("-", " "))}
                                </option>
                            ))}
                        </Form.Select>

                        {errors.category && (
                            <p className="text-danger">
                                {errors.category.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Il prodotto ha uno sconto?</Form.Label>
                        <Form.Check
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        {isChecked &&
                            <>
                                <Form.Label>Di quanto?</Form.Label>
                                <Form.Control type="number" placeholder="Inserisci sconto" onChange={(e) => setGetDiscount(Number(e.target.value) > 100 ? 100 : Number(e.target.value))} />
                                <small style={{ "fontSize": "13px" }}>Ricorda se il numero inserito è al di sopra dei 100 verrà sovrascritto in 100</small>
                            </>
                        }
                    </Form.Group>
                    <div className="d-flex gap-2">

                        <Button
                            type="submit"
                            variant="primary"
                        >
                            Aggiungi
                        </Button>
                        <Button variant="danger" onClick={onHide}>
                            Chiudi
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )

}