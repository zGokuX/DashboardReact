import { useEffect, useState } from "react";
import ProductsTable from "./ProductTable";
import Graphic from "@/layouts/Graphic";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ITEM_PER_PAGE } from "@/Constants";
import AddProductModal from "./AddProductModal";
import { selectIsLogged } from "@/store/slices/LoginUser";
import {
  useProducts,
  useProductsByCategory,
  useProductsSorted,
  useCategories,
} from "@/hooks/useProducts";

export default function Products(props: any) {
  const isLogged = useSelector(selectIsLogged);
  const [filterCategory, setFilterCategory] = useState("default");
  const [sortBy, setSortBy] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [pagination, setPagination] = useState(0);

  // La modalità attiva decide quale query usare.
  // Categoria e ordinamento sono mutuamente esclusivi: vince l'ultimo scelto.
  const mode =
    sortBy.length > 0
      ? "sorted"
      : filterCategory !== "default"
        ? "category"
        : "list";

  // Tre query, ma solo quella della modalità attiva è abilitata.
  const listQuery = useProducts(ITEM_PER_PAGE, pagination, {
    enabled: mode === "list",
  });
  const categoryQuery = useProductsByCategory(filterCategory, {
    enabled: mode === "category",
  });
  const sortedQuery = useProductsSorted(sortBy, {
    enabled: mode === "sorted",
  });

  const activeQuery =
    mode === "sorted"
      ? sortedQuery
      : mode === "category"
        ? categoryQuery
        : listQuery;

  const productList = activeQuery.data?.products ?? [];
  const total = activeQuery.data?.total ?? 0;

  const { data: categoryList = [] } = useCategories();

  // Manteniamo il comportamento precedente: notifichiamo il parent quando
  // cambia la lista visualizzata.
  useEffect(() => {
    if (props.onProductsListChange) {
      props.onProductsListChange(productList);
    }
  }, [productList]);

  function titleProcess(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function filterProductsCategory(value: string) {
    setSortBy("");
    setFilterCategory(value);
  }

  function filterProductSort(value: string) {
    setFilterCategory("default");
    setSortBy(value);
  }

  return (
    <>
      {props.inPage && <Graphic products={productList} />}

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

                  {categoryList.map((item: string, index: number) => (
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
            total={total}
            inPage={props.inPage}
            pagination={pagination}
            setFilterCategory={setFilterCategory}
            setPagination={setPagination}
            onceFilter={mode !== "list"}
          />
        </div>
      </div>
    </>
  );
}
