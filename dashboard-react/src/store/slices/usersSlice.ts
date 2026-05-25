import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface UsersState {
  filteredUser: User[]
  users: User[]
  total: number
  page: number
  limit: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  filteredUser: [],
  users: [],
  total: 0,
  page: 0,
  limit: 25,
  status: 'idle',
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    fetchUsersRequest: (state) => {
      state.status = 'loading'
      state.error = null
    },

    fetchUsersFilterRequest: (state) => {
      state.status = 'loading'
      state.error = null
    },

    fetchUsersFilterByNameRequest: (state,action : any) => {
      state.status = 'loading'
      state.error = null
    },

    fetchUsersFilterSuccess: (
      state,
      action: PayloadAction<{
        filteredUser: User[]
      }>
    ) => {
      console.log(action.payload)
      state.status = 'succeeded'
      state.filteredUser = action.payload.filteredUser || []
    },

    fetchUsersFilterByNameSuccess: (
      state,
      action: PayloadAction<{
        filteredUser: User[]
      }>
    ) => {
      state.status = 'succeeded'
      state.filteredUser = action.payload.filteredUser || []
    },

    fetchUsersSuccess: (
      state,
      action: PayloadAction<{
        users: User[]
        total: number
        page?: number
        pageSize?: number
      }>
    ) => {
      state.status = 'succeeded'
      state.users = action.payload.users || []
      state.total = action.payload.total || 0
      state.page = action.payload.page ?? state.page
      state.limit = action.payload.pageSize ?? state.limit
    },

    fetchUsersFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.status = 'failed'
      state.error = action.payload
    },

    fetchUsersFilterFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.status = 'failed'
      state.error = action.payload
    },

    fetchUsersFilterByNameFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.status = 'failed'
      state.error = action.payload
    },

    setUsersPage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.page = action.payload
    },

    resetUsers: (state) => {
      state.users = []
      state.total = 0
      state.page = 0
      state.status = 'idle'
      state.error = null
    },
  },
})

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUsersFilterRequest,
  fetchUsersFilterSuccess,
  fetchUsersFilterFailure,
  fetchUsersFilterByNameRequest,
  fetchUsersFilterByNameSuccess,
  fetchUsersFilterByNameFailure,
  setUsersPage,
  resetUsers,
} = usersSlice.actions

export const selectUserFiltered = (state: any) => state.users.filteredUser
export const selectUsers = (state: any) => state.users.users
export const selectUsersStatus = (state: any) => state.users.status
export const selectUsersTotal = (state: any) => state.users.total
export const selectUsersPage = (state: any) => state.users.page

export default usersSlice.reducer