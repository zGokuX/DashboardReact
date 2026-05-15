import { createSlice } from '@reduxjs/toolkit'

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

    fetchProductSortRequest: (state, action) => {
      state.status = 'loading'
      state.error = null
    },

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

    fetchProductsSortSuccess: (state, action) => {
      state.status = 'succeeded'
      state.products = action.payload.products || []
      state.total = action.payload.total ?? 0
    },

    fetchProductFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    fetchProductsCategoryFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    fetchProductsSortFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    setProductCategories: (state, action) => {
      state.categories = action.payload
    },

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

    resetCart(state, action) {
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

    clearProducts: state => {
      state.products = []
      state.total = 0
      state.categories = []
      state.selectedCategory = null
      state.status = 'idle'
      state.error = null
    },
  },
})

export const {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchProductRequestByCategory,
  fetchProductsCategorySuccess,
  fetchProductsCategoryFailure,
  fetchProductSortRequest,
  fetchProductsSortSuccess,
  fetchProductsSortFailure,
  setProductCategories,
  setSelectedCategory,
  removeToCart,
  clearProducts,
  addToCart,
  resetCart,
} = productsSlice.actions

export const selectProducts = state =>
  state.products.products

export const selectProductsTotal = state =>
  state.products.total

export const selectProductCategories = state =>
  state.products.categories

export const selectSelectedCategory = state =>
  state.products.selectedCategory

export const selectProductsStatus = state =>
  state.products.status

export const selectUserProduct = state =>
  state.products.userProducts

export default productsSlice.reducer