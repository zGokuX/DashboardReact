import { createSlice } from '@reduxjs/toolkit'

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
    fetchCartsRequest: (state, action) => {
      state.status = 'loading'
      state.error = null
    },

    fetchCartsSuccess: (state, action) => {
      state.status = 'succeeded'
      state.carts = action.payload.carts || []
      state.total = action.payload.total ?? 0
    },

    fetchCartsFailure: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    setCartsPage: (state, action) => {
      state.page = action.payload
    },

    clearCarts: (state) => {
      state.carts = []
      state.total = 0
      state.page = 0
      state.status = 'idle'
      state.error = null
    },

    deleteCart: (state, action) => {
      state.carts = state.carts.filter(
        (item) => item.id !== action.payload.id
      )

      state.total = state.total - 1
    },
  },
})

export const {
  fetchCartsRequest,
  fetchCartsSuccess,
  fetchCartsFailure,
  setCartsPage,
  clearCarts,
  deleteCart,
} = cartsSlice.actions

export const selectCarts = (state: any) => state.carts.carts

export const selectCartsStatus = (state: any) =>
  state.carts.status

export const selectCartsTotal = (state: any) =>
  state.carts.total

export const selectCartsPage = (state: any) =>
  state.carts.page

export default cartsSlice.reducer