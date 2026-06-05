
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
        console.log(action.payload)
      },

      addToHistory: (state, action) => {
        state.HistoryProduct.push(...action.payload)
      },

      logOutUser: (state) => {
        state.UserLogged = []
        state.isLogged = false
      },
    },
  })


  export const { logUser,logOutUser,addToHistory } = LoginSlice.actions


export const selectUserLogged = (state) => state.Login.UserLogged
export const selectAllHistory = (state) => state.Login.HistoryProduct
export const selectIsLogged = (state) => state.Login.isLogged

  export default LoginSlice.reducer
