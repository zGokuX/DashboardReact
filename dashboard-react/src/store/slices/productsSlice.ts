import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductsCategory } from '@/services/requests'

// createAsyncThunk è usato qui per gestire automaticamente tre stati di richieste asincrone:
// pending, fulfilled e rejected. Questo semplifica molto la logica rispetto al thunk manuale.
// export const loadProducts = createAsyncThunk(
//   'products/loadProducts',
//   async ({ pageSize, page, userId }: any) => {
//     console.log(pageSize, page, userId)
//     // Qui effettuiamo la chiamata API usando la funzione condivisa dal file requests.
//     const response = await fetchProducts(userId, pageSize, page)

//     return { ...response, page, pageSize }
//   },
// )

// export const loadFilteredProducts = createAsyncThunk(
//   'products/loadFilteredProducts',
//   async ({ categoryId }: any) => {
//     console.log(categoryId)
//     // Qui effettuiamo la chiamata API usando la funzione condivisa dal file requests.
//     const response = await fetchProductsCategory(categoryId)

//     return response
//   },
// )
const initialState = {
  products: [],
  userProducts: [],
  total: 0,
  categories: [],
  selectedCategory: null,
  status: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {


    fetchProductRequest: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    fetchProductRequestByCategory: (state, action) => {
      state.status = 'loading'
      state.error = null
    },
    
    // Azione inviata quando i carrelli sono stati caricati con successo.
    // Qui salviamo la lista e il totale nel store.
    fetchProductSuccess: (state, action) => {
      state.status = 'succeeded'
      state.products = action.payload.products || []
      state.total = action.payload.total ?? 0
    },
    fetchProductsCategorySuccess: (state, action) => {
      state.status = 'succeeded'
      state.products = action.payload.products || []
      state.total = action.payload.total ?? 0
    },
    // Azione inviata in caso di errore di fetch, conserviamo il messaggio per visualizzarlo.
    fetchProductFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    fetchProductsCategoryFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    // Azione di utilità per impostare le categorie senza effettuare fetch.
    setProductCategories: (state, action) => {
      state.categories = action.payload
    },
    // Azione per selezionare una categoria, utile per il filtro locale.
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    addToCart(state, action) {
      const { image, product, price } = action.payload
      state.userProducts.push({
        image,
        product,
        price,
      })
    },
    // Resetta il dominio products allo stato iniziale.
    clearProducts: (state) => {
      state.products = []
      state.total = 0
      state.categories = []
      state.selectedCategory = null
      state.status = 'idle'
      state.error = null
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     // Quando la richiesta è in corso impostiamo lo stato in loading e cancelliamo l'errore precedente.
  //     .addCase(loadProducts.pending, (state) => {
  //       state.status = 'loading'
  //       state.error = null
  //     })
  //     // Quando la richiesta ha successo memorizziamo i prodotti nel store.
  //     .addCase(loadProducts.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       state.products = action.payload.products || []
  //       state.total = action.payload.total ?? 0
  //       // La categoria selezionata non viene ridefinita qui per mantenere il filtro attuale.
  //     })
  //     // In caso di errore salviamo il messaggio per visualizzarlo all'utente.
  //     .addCase(loadProducts.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message
  //     })
  //     .addCase(loadFilteredProducts.pending, (state) => {
  //       state.status = 'loading'
  //       state.error = null
  //     })
  //     // Quando la richiesta ha successo memorizziamo i prodotti nel store.
  //     .addCase(loadFilteredProducts.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       state.products = action.payload || []
  //       console.log(action.payload)
  //       // La categoria selezionata non viene ridefinita qui per mantenere il filtro attuale.
  //     })
  //     // In caso di errore salviamo il messaggio per visualizzarlo all'utente.
  //     .addCase(loadFilteredProducts.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message
  //     })
  // },
})

export const {
  fetchProductRequest,
  fetchProductRequestByCategory,
  fetchProductsCategorySuccess,
  fetchProductsCategoryFailure,
  fetchProductSuccess,
  fetchProductFailure,
  setProductCategories,
  setSelectedCategory,
  clearProducts,
  addToCart,
  
} = productsSlice.actions

// Selector per prendere i dati dei prodotti dal root state.
export const selectProducts = (state) => state.products.products
export const selectProductsTotal = (state) => state.products.total
export const selectProductCategories = (state) => state.products.categories
export const selectSelectedCategory = (state) => state.products.selectedCategory
export const selectProductsStatus = (state) => state.products.status
export const selectUserProduct = (state) => state.products.userProducts
export default productsSlice.reducer
