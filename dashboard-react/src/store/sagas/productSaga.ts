import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchProducts, fetchProductsCategory } from '@/services/requests'
import { fetchProductFailure, fetchProductRequest, fetchProductRequestByCategory, fetchProductsCategoryFailure, fetchProductsCategorySuccess, fetchProductSuccess } from '../slices/productsSlice'
import { ITEM_PER_PAGE } from '@/Constants'

// Questo saga gestisce il side effect di caricamento dei carrelli.
// Usiamo redux-saga qui per dimostrare un altro approccio rispetto a thunk.
function* handleFetchProduct(action) {
    try {
        console.log("ciao")
        const { pageSize = ITEM_PER_PAGE, page = 0 } = action.payload || {}
        // call è un effetto di redux-saga che chiama la funzione API in modo testabile.
        const response = yield call(fetchProducts, pageSize, page)
        // put invia l'azione di successo con i dati ricevuti.
        yield put(
            fetchProductSuccess({
                products: response.products || [],
                total: response.total ?? 0,
            }),
        )
    } catch (error) {
        // In caso di errore inviamo un'azione di failure con il messaggio.
        yield put(fetchProductFailure(error.message || 'Failed to load carts'))
    }
}


function* handleFetchProductCategory(action) {
    try {
        const { categoryId } = action.payload || {}

        const response = yield call(fetchProductsCategory, categoryId)
        console.log(response)
        yield put(
            fetchProductsCategorySuccess({
                products: response,
                total: response.length
            }),
        )
    } catch (error) {
        yield put(fetchProductsCategoryFailure(error.message || 'Failed to load products'))
    }
}
// watchFetchCarts osserva le azioni fetchCartsRequest e punta sempre all'ultima.
// takeLatest evita race condition: se partono più richieste, mantiene soltanto l'ultima attiva.
export function* watchFetchProduct() {
    yield takeLatest(fetchProductRequest.type, handleFetchProduct)
}
export function* watchFetchProductCategory() {
    yield takeLatest(fetchProductRequestByCategory.type, handleFetchProductCategory)
}
