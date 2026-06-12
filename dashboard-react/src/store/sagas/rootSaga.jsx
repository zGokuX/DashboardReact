import { all } from 'redux-saga/effects'
import { watchFetchCarts, watchFetchSingleCart } from './cartsSaga'
import { watchFetchUser, watchFetchUserFiltered,watchFetchUserFilteredByName } from './userSaga'

// Root saga: composizione di tutti i watcher saga dell'applicazione.
// Utilizziamo all() per poter eseguire più saghe in parallelo e mantenere
// la gestione dei side effect centralizzata in un unico punto.
// NB: i prodotti sono stati migrati a React Query, quindi non hanno più saghe.
export default function* rootSaga() {
  yield all([
    watchFetchCarts(),
    watchFetchUser(),
    watchFetchUserFiltered(),
    watchFetchUserFilteredByName(),
    watchFetchSingleCart(),
  ])
}
