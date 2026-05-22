import { all } from 'redux-saga/effects'
import { watchFetchCarts } from './cartsSaga'
import { watchFetchProduct, watchFetchProductCategory, watchFetchProductSort } from './productSaga'
import { watchFetchUser, watchFetchUserFiltered,watchFetchUserFilteredByName } from './userSaga'

// Root saga: composizione di tutti i watcher saga dell'applicazione.
// Utilizziamo all() per poter eseguire più saghe in parallelo e mantenere
// la gestione dei side effect centralizzata in un unico punto.
export default function* rootSaga() {
  yield all([
    watchFetchCarts(),
    watchFetchProduct(),
    watchFetchProductCategory(),
    watchFetchUser(),
    watchFetchUserFiltered(),
    watchFetchUserFilteredByName(),
    watchFetchProductSort(),
  ])
}
