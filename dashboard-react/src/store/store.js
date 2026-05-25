import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer from './slices/counterSlice';
import inputReducer from './slices/NameSlice';
import usersReducer from './slices/usersSlice';
import cartsReducer from './slices/cartsSlice';
import productsReducer from './slices/productsSlice';
import LoginReducer from './slices/LoginUser'
import rootSaga from './sagas/rootSaga';

// Creiamo il middleware saga per gestire side effect complessi fuori dai reducer.
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    counter: counterReducer,
    userName: inputReducer,
    users: usersReducer,
    carts: cartsReducer,
    products: productsReducer,
    Login: LoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disabilitiamo il controllo di serializzabilità per evitare warning con redux-saga.
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Avviamo la root saga una volta che il store è configurato.
// Questo consente a redux-saga di ascoltare le azioni e gestire i side effect.
sagaMiddleware.run(rootSaga);

export default store;
