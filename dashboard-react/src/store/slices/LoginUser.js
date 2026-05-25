
  import { createSlice } from '@reduxjs/toolkit'

  export const LoginSlice = createSlice({
    name: 'Login',
    initialState: {
          UserLogged: {},
          isLogged: false,
    },
    reducers: {
      logUser: (state, action) => {
        state.UserLogged = action.payload || {}
        state.isLogged = true
        console.log(action.payload)
      },
      logOutUser: (state) => {
        state.UserLogged = []
        state.isLogged = false
      },
    },
  })


  export const { logUser,logOutUser } = LoginSlice.actions


export const selectUserLogged = (state) => state.Login.UserLogged
export const selectIsLogged = (state) => state.Login.isLogged

  export default LoginSlice.reducer
