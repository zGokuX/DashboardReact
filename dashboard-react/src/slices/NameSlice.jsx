import { createSlice } from '@reduxjs/toolkit'

export const inputSlice = createSlice({
  name: 'userName',
  initialState: {
    value: '',
    userList: [],
  },
  reducers: {
    addName: (state, action) => {
      state.value = action.payload
    },
    setUser: (state, action) => {
      state.userList = action.payload
    },
    setUserList: (state, action) => {
      state.userList = action.payload
    }
  },
})


export const { addName, setUser, setUserList } = inputSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectName = (state) => state.userName

export default inputSlice.reducer
