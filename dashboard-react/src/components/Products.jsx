import { useEffect, useState } from "react"
import { fetchAllCategories, fetchProducts, fetchProductsCategory } from "../services/requests"
import ProductsTable from "./ProductTable"
import { Link } from "react-router-dom"
import { Form } from "react-bootstrap"
export default function Products(props) {

    const [productList, setProductList] = useState([])
    const [filterCategory, setFilterCategory] = useState('default')
    const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
        getProduct(1)
        fetchAllCategories().then(res => {
            setCategoryList(res)

      console.log(res)
    })
  }, [])
  function titleProcess(text) {
    const result = text.charAt(0).toUpperCase() + text.slice(1)

    return result
  }

    async function getProduct(userId) {
        const product = await fetchProducts(userId, props.maxViewProduct)
        if (props.onSelectProduct) {
            props.onSelectProduct(product.products)
        }
       
        setProductList(product.products)
    }

  function filterProductsCategory(value) {
    fetchProductsCategory(value).then(res => {
      if (value === 'default') {
        return getProduct(1)
      }
      setProductList(res)
    })
  }

  useEffect(() => {
    if (props.onProductsListChange) {
      props.onProductsListChange(productList)
    }
  }, [props, productList])

    return (
        <>
            <div className="clienti container-full-width">
                <div className="card client-card">
                    <div className="card-title">
                        <span><i className="fa-solid fa-list"></i>Products</span>
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
                                {categoryList.map((item, index) => {
                                    return <option key={index} value={item}>{titleProcess(item.replace('-', ' '))}</option>
                                })}
                            </Form.Select>
                        }
                    </div>
                    <ProductsTable
                        productList={productList}
                        setProductList={setProductList}
                        inPage = {props.inPage}
                    />
                </div>
            </div>
        </>
    )
}
