import { all } from 'redux-saga/effects'
import { watchFetchCarts } from './cartsSaga'

// Root saga: composizione di tutti i watcher saga dell'applicazione.
// Utilizziamo all() per poter eseguire più saghe in parallelo e mantenere
// la gestione dei side effect centralizzata in un unico punto.
export default function* rootSaga() {
  yield all([watchFetchCarts()])
}
