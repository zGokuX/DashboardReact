import { createSlice } from '@reduxjs/toolkit'

export const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    UserLogged: {},
    HistoryProduct: [],
    isLogged: false,
  },

  reducers: {
    logUser: (state, action) => {
      state.UserLogged = action.payload || {}
      state.isLogged = true

      localStorage.setItem(
        'UserLogged',
        JSON.stringify(action.payload || {})
      )
    },

    addToHistory: (state, action) => {
      state.HistoryProduct.push(...action.payload)
    },

    logOutUser: (state) => {
      state.UserLogged = {}
      state.isLogged = false

      localStorage.removeItem('UserLogged')
    },
  },
})

export const { logUser, logOutUser, addToHistory } = LoginSlice.actions

export const selectUserLogged = (state) => state?.Login?.UserLogged

export const selectUserLoggedWithStorage = (state) => {
  const user = state?.Login?.UserLogged

  if (user && Object.keys(user).length > 0) {
    return user
  }

  const savedUser = localStorage.getItem('UserLogged')
  return savedUser ? JSON.parse(savedUser) : {}
}

export const selectAllHistory = (state) => state?.Login?.HistoryProduct
export const selectIsLogged = (state) => state?.Login?.isLogged

export default LoginSlice.reducer