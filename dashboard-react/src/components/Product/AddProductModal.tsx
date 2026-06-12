import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    useProducts,
    useCategories,
    useAddLocalProduct,
} from "@/hooks/useProducts";

export default function AddProductModal({ show, onHide }) {
    const productsQuery = useProducts();
    const products = productsQuery.data?.products ?? [];
    const { data: allCategory = [] } = useCategories();
    const addLocalProduct = useAddLocalProduct();

    const [isChecked, setIsChecked] = useState(false);
    const [discount, setDiscount] = useState(0);

    function titleProcess(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const productSchema = z.object({
        title: z
            .string()
            .min(4, "Lunghezza minima 4")
            .max(55, "Lunghezza massima 55"),

        description: z
            .string()
            .min(4, "Lunghezza minima 4"),

        price: z.coerce
            .number()
            .min(1, "Il prezzo deve essere maggiore di 1")
            .max(99999999, "Non puoi andare oltre i 99999999"),

        category: z
            .string()
            .refine((value) => value !== "default", {
                message: "Seleziona una categoria valida",
            }),
    });

    type ProductFormData = z.infer<typeof productSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: "default",
        },
    });

    function addingProduct(data: ProductFormData) {
        const exists = products.some(
            (item) =>
                item.title.trim().toLowerCase() ===
                data.title.trim().toLowerCase()
        );

        if (exists) {
            alert("Prodotto già esistente");
            return;
        }

        // dummyjson non persiste l'aggiunta: iniettiamo il prodotto nella
        // cache di React Query invece di invalidare (che lo farebbe sparire).
        addLocalProduct({
            id: products.length
                ? Math.max(...products.map((p: any) => p.id)) + 1
                : 1,
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            discountPercentage: isChecked ? discount : 0,
            availabilityStatus: "In Stock",
        });

        setDiscount(0);
        setIsChecked(false);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi prodotto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(addingProduct)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome prodotto</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Inserisci il nome del prodotto"
                            {...register("title")}
                        />

                        {errors.title && (
                            <p className="text-danger mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrizione prodotto</Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Inserisci la descrizione del prodotto"
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-danger mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Prezzo prodotto</Form.Label>

                        <Form.Control
                            type="number"
                            placeholder="Inserisci il prezzo del prodotto"
                            {...register("price")}
                        />

                        {errors.price && (
                            <p className="text-danger mt-1">
                                {errors.price.message}
                            </p>
                        )}

                        <small style={{ fontSize: "13px" }}>
                            Prezzo massimo consentito: 99999999
                        </small>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>

                        <Form.Select {...register("category")}>
                            <option value="default">
                                Inserisci Categoria
                            </option>

                            {allCategory?.map((item, index) => (
                                <option key={index} value={item}>
                                    {titleProcess(
                                        item.replaceAll("-", " ")
                                    )}
                                </option>
                            ))}
                        </Form.Select>

                        {errors.category && (
                            <p className="text-danger mt-1">
                                {errors.category.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Il prodotto ha uno sconto?
                        </Form.Label>

                        <Form.Check
                            checked={isChecked}
                            onChange={() =>
                                setIsChecked((prev) => !prev)
                            }
                        />

                        {isChecked && (
                            <>
                                <Form.Label className="mt-2">
                                    Di quanto?
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    min={0}
                                    max={100}
                                    placeholder="Inserisci sconto (%)"
                                    value={discount}
                                    onChange={(e) =>
                                        setDiscount(
                                            Math.min(
                                                100,
                                                Number(e.target.value) || 0
                                            )
                                        )
                                    }
                                />

                                <small style={{ fontSize: "13px" }}>
                                    Valore massimo: 100%
                                </small>
                            </>
                        )}
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            Aggiungi
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => {
                                onHide();
                            }}
                        >
                            Chiudi
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}