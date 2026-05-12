import { createSlice } from '@reduxjs/toolkit'

// Definiamo lo stato iniziale del dominio carts.
// Questo slice è pensato per gestire i carrelli come entità separate nel store globale.
const initialState = {
  carts: [],
  total: 0,
  page: 0,
  limit: 25,
  status: 'idle',
  error: null,
}

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    // Azione inviata per segnalare l'inizio della richiesta di carrelli.
    fetchCartsRequest: (state) => {
      state.status = 'loading'
      state.error = null
    },
    // Azione inviata quando i carrelli sono stati caricati con successo.
    // Qui salviamo la lista e il totale nel store.
    fetchCartsSuccess: (state, action) => {
      state.status = 'succeeded'
      state.carts = action.payload.carts || []
      state.total = action.payload.total ?? 0
    },
    // Azione inviata in caso di errore di fetch, conserviamo il messaggio per visualizzarlo.
    fetchCartsFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    // Cambia la pagina corrente per la visualizzazione dei carrelli.
    setCartsPage: (state, action) => {
      state.page = action.payload
    },
    // Resetta il dominio carts allo stato iniziale.
    clearCarts: (state) => {
      state.carts = []
      state.total = 0
      state.page = 0
      state.status = 'idle'
      state.error = null
    },
  },
})

export const {
  fetchCartsRequest,
  fetchCartsSuccess,
  fetchCartsFailure,
  setCartsPage,
  clearCarts,
} = cartsSlice.actions

// Selector per ottenere i dati dei carrelli dal root state.
export const selectCarts = (state) => state.carts.carts
export const selectCartsStatus = (state) => state.carts.status
export const selectCartsTotal = (state) => state.carts.total
export const selectCartsPage = (state) => state.carts.page

export default cartsSlice.reducer
