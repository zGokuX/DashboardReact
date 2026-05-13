import { createSlice } from '@reduxjs/toolkit'

// Usiamo createSlice perché è il modo più conciso e standardizzato per definire uno slice Redux
// con reducer mutabili tramite immer, azioni generate automaticamente e stato iniziale centralizzato.
const initialState = {
  users: [],
  total: 0,
  page: 0,
  limit: 25,
  status: 'idle',
  error: null,
}

// Questo slice rappresenta il dominio "users" nel nostro store globale.
// Conserviamo qui lista utenti, paginazione, stato di caricamento, e messaggi di errore.
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Azione inviata prima di avviare la richiesta, per impostare lo stato in loading.
    fetchUsersRequest: (state) => {
      state.status = 'loading'
      state.error = null
    },
    // Azione inviata quando la chiamata API va a buon fine.
    // Salviamo i dati ricevuti ed eventuali metadati di paginazione.
    fetchUsersSuccess: (state, action) => {
      state.status = 'succeeded'
      state.users = action.payload.users || []
      state.total = action.payload.total || 0
      state.page = action.payload.page ?? state.page
      state.limit = action.payload.pageSize ?? state.limit
    },
    // Azione inviata quando la chiamata API fallisce.
    // Conserviamo l'errore in stato per poterlo mostrare all'utente.
    fetchUsersFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    // Azione usata per modificare la pagina corrente in stato senza effettuare fetch.
    setUsersPage: (state, action) => {
      state.page = action.payload
    },
    // Ripristina lo stato users allo stato iniziale.
    // Utile quando vogliamo cancellare dati obsoleti o resettare il dominio.
    resetUsers: (state) => {
      state.users = []
      state.total = 0
      state.page = 0
      state.status = 'idle'
      state.error = null
    },
  },
})

// Esportiamo le azioni generate automaticamente dal slice.
// Queste azioni vengono dispatchate dai thunk o dai componenti React.
export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  setUsersPage,
  resetUsers,
} = usersSlice.actions

// Selector semplici: permettono ai componenti di leggere lo stato Redux in modo sicuro e riutilizzabile.
export const selectUsers = (state) => state.users.users
export const selectUsersStatus = (state) => state.users.status
export const selectUsersTotal = (state) => state.users.total
export const selectUsersPage = (state) => state.users.page

// Esportiamo il reducer per collegarlo al configureStore.
export default usersSlice.reducer
