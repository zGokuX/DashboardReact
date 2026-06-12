import { createSlice } from '@reduxjs/toolkit'

// Dopo la migrazione a React Query, lo stato "server" dei prodotti
// (lista, categorie, totale, status) vive nella cache di React Query.
// In Redux resta solo lo stato CLIENT: il carrello locale dell'utente.

const initialState = {
  userProducts: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    addToCart(state, action) {
      const { image, product, price } = action.payload

      state.userProducts.push({
        image,
        product,
        price,
      })
    },

    resetCart(state) {
      state.userProducts = []
    },

    removeToCart(state, action) {
      const index = state.userProducts.findIndex(
        item => item.product === action.payload.product
      )

      if (index !== -1) {
        state.userProducts.splice(index, 1)
      }
    },
  },
})

export const { addToCart, resetCart, removeToCart } = productsSlice.actions

export const selectUserProduct = state =>
  state.products.userProducts

export default productsSlice.reducer
