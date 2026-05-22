import { call, put, takeLatest } from 'redux-saga/effects'
import fetchUser, { fetchFilterNames, fetchUserFilter } from '@/services/requests'
import { ITEM_PER_PAGE } from '@/Constants'
import { fetchUsersFailure, fetchUsersFilterByNameFailure, fetchUsersFilterByNameRequest, fetchUsersFilterByNameSuccess, fetchUsersFilterFailure, fetchUsersFilterRequest, fetchUsersFilterSuccess, fetchUsersRequest, fetchUsersSuccess } from '../slices/usersSlice'

// Questo saga gestisce il side effect di caricamento dei carrelli.
// Usiamo redux-saga qui per dimostrare un altro approccio rispetto a thunk.
function* handleFetchUser(action) {
    try {
        const { pageSize = ITEM_PER_PAGE, page = 0 } = action.payload || {}
        // call è un effetto di redux-saga che chiama la funzione API in modo testabile.
        const response = yield call(fetchUser, pageSize, page)
        // put invia l'azione di successo con i dati ricevuti.
        yield put(
            fetchUsersSuccess({
                users: response.users || [],
                total: response.total ?? 0,
            }),
        )
    } catch (error) {
        // In caso di errore inviamo un'azione di failure con il messaggio.
        yield put(fetchUsersFailure(error.message || 'Failed to load carts'))
    }
}

function* handleFetchFilterUser(action) {
    try {
        const { filterName, value } = action.payload || {}
        // call è un effetto di redux-saga che chiama la funzione API in modo testabile.
        const response = yield call(fetchUserFilter, filterName, value)
        console.log(response)
        // put invia l'azione di successo con i dati ricevuti.
        yield put(
            fetchUsersFilterSuccess({
                filteredUser: response.users || []
            }),
        )
    } catch (error) {
        // In caso di errore inviamo un'azione di failure con il messaggio.
        yield put(fetchUsersFilterFailure(error.message || 'Failed to load carts'))
    }
}

function* handleFetchFilterUserName(action) {
    try {
        const { value } = action.payload || {}
        // call è un effetto di redux-saga che chiama la funzione API in modo testabile.
        const response = yield call(fetchFilterNames, value)
        // put invia l'azione di successo con i dati ricevuti.
        yield put(
            fetchUsersFilterByNameSuccess({
                filteredUser: response.users || []
            }),
        )
    } catch (error) {
        // In caso di errore inviamo un'azione di failure con il messaggio.
        yield put(fetchUsersFilterByNameFailure(error.message || 'Failed to load carts'))
    }
}

// watchFetchCarts osserva le azioni fetchCartsRequest e punta sempre all'ultima.
// takeLatest evita race condition: se partono più richieste, mantiene soltanto l'ultima attiva.
export function* watchFetchUser() {
    yield takeLatest(fetchUsersRequest.type, handleFetchUser)
}

export function* watchFetchUserFiltered() {
    yield takeLatest(fetchUsersFilterRequest.type, handleFetchFilterUser)
}
export function* watchFetchUserFilteredByName() {
    yield takeLatest(fetchUsersFilterByNameRequest.type, handleFetchFilterUserName)
}