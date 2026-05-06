import { useEffect, useState } from "react"
import { fetchProducts, fetchProductsCategory } from "../services/requests"
import ProductsTable from "./ProductTable"
import { Link } from "react-router-dom"
import { Form } from "react-bootstrap"
export default function Products(props) {

    const [productList, setProductList] = useState([])
    const [filterCategory, setFilterCategory] = useState('default')
    const [userLength, setUserLength] = useState(0)
    useEffect(() => {
        getProduct(1)
    }, [])

    async function getProduct(userId) {
        const product = await fetchProducts(userId, props.maxViewProduct)
        if (props.onSelectProduct) {
            props.onSelectProduct(product)
        }

        setProductList(product)
    }

    function filterProductsCategory(value) {
        fetchProductsCategory(value).then((res) => {
            if(value === 'default'){
                return getProduct(1)
            }
            setProductList(res)
        })
    }


    return (
        <>
            <div className="clienti container-full-width">
                <div className="card client-card">
                    <div className="card-title">
                        <span>Products<i className="fa-solid fa-list"></i></span>
                        {!props.inPage &&
                            <div className="card-actions" id="btn-card-actions">
                                <nav>
                                    <Link to="/products"><span className="card-action-list">Vedi Tutti</span></Link>
                                </nav>
                            </div>
                        }
                        {props.inPage &&
                            <Form.Select className="w-25" aria-label="Default select example" defaultValue={filterCategory}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setFilterCategory(value)
                                    filterProductsCategory(value)
                                }}>
                                <option value="default">Categoria</option>
                                <option value="beauty">bellezza</option>
                                <option value="fragrances">fragranze</option>
                                <option value="furniture">mobilia</option>
                                <option value="groceries">generi alimentari</option>
                            </Form.Select>
                        }
                    </div>
                    <ProductsTable productList={productList} />
                </div>
            </div>
        </>
    )
}