import { call, put, takeLatest } from 'redux-saga/effects'

import {
  fetchProducts,
  fetchProductsCategory,
  fetchSortProductPrice,
} from '@/services/requests'

import {
  fetchProductFailure,
  fetchProductRequest,
  fetchProductRequestByCategory,
  fetchProductsCategoryFailure,
  fetchProductsCategorySuccess,
  fetchProductSortRequest,
  fetchProductsSortFailure,
  fetchProductsSortSuccess,
  fetchProductSuccess,
} from '../slices/productsSlice'

import { ITEM_PER_PAGE } from '@/Constants'

function* handleFetchProduct(action) {
  try {
    const { pageSize = ITEM_PER_PAGE, page = 0 } =
      action.payload || {}

    const response = yield call(
      fetchProducts,
      pageSize,
      page
    )

    yield put(
      fetchProductSuccess({
        products: response.products || [],
        total: response.total ?? 0,
      })
    )
  } catch (error) {
    yield put(
      fetchProductFailure(
        error.message || 'Failed to load products'
      )
    )
  }
}

function* handleFetchProductCategory(action) {
  try {
    const { categoryId } = action.payload || {}

    const response = yield call(
      fetchProductsCategory,
      categoryId
    )

    yield put(
      fetchProductsCategorySuccess({
        products: response,
        total: response.length,
      })
    )
  } catch (error) {
    yield put(
      fetchProductsCategoryFailure(
        error.message || 'Failed to load products'
      )
    )
  }
}

function* handleFetchProductSort(action) {
  try {
    const { price } = action.payload || {}

    const response = yield call(
      fetchSortProductPrice,
      price
    )

    yield put(
      fetchProductsSortSuccess({
        products: response,
        total: response.length,
      })
    )
  } catch (error) {
    yield put(
      fetchProductsSortFailure(
        error.message || 'Failed to load products'
      )
    )
  }
}

export function* watchFetchProduct() {
  yield takeLatest(
    fetchProductRequest.type,
    handleFetchProduct
  )
}

export function* watchFetchProductCategory() {
  yield takeLatest(
    fetchProductRequestByCategory.type,
    handleFetchProductCategory
  )
}

export function* watchFetchProductSort() {
  yield takeLatest(
    fetchProductSortRequest.type,
    handleFetchProductSort
  )
}