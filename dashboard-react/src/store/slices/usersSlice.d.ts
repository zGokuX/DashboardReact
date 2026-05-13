import { ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import store from '../store'

export type FetchUsersParams = {
  pageSize?: number
  page?: number
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export declare function fetchUsers(
  params?: FetchUsersParams
): AppThunk<Promise<void>>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>