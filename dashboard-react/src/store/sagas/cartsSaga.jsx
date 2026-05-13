import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchCarts } from '../../services/requests'
import { fetchCartsRequest, fetchCartsSuccess, fetchCartsFailure } from '@/store/slices/cartsSlice'

// Questo saga gestisce il side effect di caricamento dei carrelli.
// Usiamo redux-saga qui per dimostrare un altro approccio rispetto a thunk.
function* handleFetchCarts(action) {
  try {
    const { pageSize = 25, page = 0 } = action.payload || {}
    // call è un effetto di redux-saga che chiama la funzione API in modo testabile.
    const response = yield call(fetchCarts, pageSize, page)
    // put invia l'azione di successo con i dati ricevuti.
    yield put(
      fetchCartsSuccess({
        carts: response.carts || [],
        total: response.total ?? 0,
      }),
    )
  } catch (error) {
    // In caso di errore inviamo un'azione di failure con il messaggio.
    yield put(fetchCartsFailure(error.message || 'Failed to load carts'))
  }
}

// watchFetchCarts osserva le azioni fetchCartsRequest e punta sempre all'ultima.
// takeLatest evita race condition: se partono più richieste, mantiene soltanto l'ultima attiva.
export function* watchFetchCarts() {
  yield takeLatest(fetchCartsRequest.type, handleFetchCarts)
}
