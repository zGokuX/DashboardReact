import { useEffect, useState } from "react";
import { fetchAllCategories } from "@/services/requests";
import ProductsTable from "./ProductTable";
import Graphic from "@/layouts/Graphic";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductRequest,
  fetchProductRequestByCategory,
  fetchProductSortRequest,
  selectProducts,
} from "@/store/slices/productsSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { ITEM_PER_PAGE } from "@/Constants";
import AddProductModal from "./AddProductModal";
import { selectIsLogged } from "@/store/slices/LoginUser";

export default function Products(props: any) {
  const productList = useSelector(selectProducts);
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const [filterCategory, setFilterCategory] = useState("default");
  const [categoryList, setCategoryList] = useState([]);
  const [onceFilter, setOnceFilter] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [pagination, setPagination] = useState(0);

  function productRequest() {
    dispatch(
      fetchProductRequest({
        pageSize: ITEM_PER_PAGE,
        page: pagination,
      }) as unknown as UnknownAction,
    );
  }
  useEffect(() => {
    productRequest();
  }, [pagination]);

  useEffect(() => {
    fetchAllCategories().then((res) => {
      setCategoryList(res);
    });
  }, []);

  useEffect(() => {
    if (!onceFilter) {
      dispatch(
        fetchProductRequest({
          pageSize: ITEM_PER_PAGE,
          page: pagination,
        }) as unknown as UnknownAction,
      );
    }
  }, [pagination, onceFilter]);

  useEffect(() => {
    if (props.onProductsListChange) {
      props.onProductsListChange(productList);
    }
  }, [productList]);

  function titleProcess(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function filterProductsCategory(value: string) {
    setFilterCategory(value);

    if (value === "default") {
      setOnceFilter(false);
      productRequest();
    } else {
      setOnceFilter(true);
      dispatch(
        fetchProductRequestByCategory({
          categoryId: value,
        }) as unknown as UnknownAction,
      );
    }
  }

  function filterProductSort(value: string) {
    if (value.length > 0) {
      setOnceFilter(true);
      dispatch(
        fetchProductSortRequest({
          price: value,
        }) as unknown as UnknownAction,
      );
    } else {
      setOnceFilter(false);
      dispatch(
        fetchProductRequest({
          pageSize: ITEM_PER_PAGE,
          page: pagination,
        }) as unknown as UnknownAction,
      );
    }
  }

  return (
    <>
      {props.inPage && <Graphic />}

      {showAddProductModal && (
        <AddProductModal
          show={showAddProductModal}
          onHide={() => setShowAddProductModal(false)}
        />
      )}

      <div className={`clienti container-full-width ${props.inPage ? "mt-3" : "" }`}>
        <div className="card client-card" style={{ position: "static" }}>
          <div className="card-title">
            <span>
              <i className="fa-solid fa-list me-2"></i>
              Products
            </span>

            {!props.inPage && (
              <div className="card-actions">

                <Link to="/products">
                  <span style={{
                    display: "inline-block",
                    padding: "5px",
                    margin: "5px",
                  }} className="card-action-list">Vedi Tutti</span>
                </Link>


              </div>
            )}

            {props.inPage && (
              <>
                <Form.Select
                  className="w-25"
                  value={filterCategory}
                  onChange={(e) => filterProductsCategory(e.target.value)}
                >
                  <option value="default">Categoria</option>

                  {categoryList.map((item, index) => (
                    <option key={index} value={item}>
                      {titleProcess(item.replace("-", " "))}
                    </option>
                  ))}
                </Form.Select>
                  <Button disabled={!isLogged} onClick={() => setShowAddProductModal(true)}>
                    Aggiungi prodotto
                  </Button>
              </>
            )}
          </div>

          <ProductsTable
            filterProductSort={filterProductSort}
            productList={productList}
            inPage={props.inPage}
            pagination={pagination}
            setFilterCategory={setFilterCategory}
            setPagination={setPagination}
            onceFilter={onceFilter}
          />
        </div>
      </div>
    </>
  );
}
