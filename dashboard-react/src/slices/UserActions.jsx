import fetchUser from '../services/requests'
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from './usersSlice'

// Questo file contiene un action creator thunk manuale per users.
// L'obiettivo è mostrare come implementare il flusso Redux senza createAsyncThunk,
// mantenendo comunque il set di stati richiesti (request/success/failure).
export const fetchUsers = ({ pageSize = 25, page = 0 } = {}) => async (dispatch) => {
  dispatch(fetchUsersRequest())

  try {
    const response = await fetchUser(pageSize, page)
    dispatch(
      fetchUsersSuccess({
        ...response,
        page,
        pageSize,
      }),
    )
  } catch (error) {
    dispatch(fetchUsersFailure(error.message || 'Failed to load users'))
  }
}
