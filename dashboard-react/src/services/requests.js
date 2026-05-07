export default function fetchUser(pageSize = 25 , page = 0) {
  return fetch(`https://dummyjson.com/users?limit=${pageSize ? pageSize : 10}&skip=${page * pageSize}`).then(res => res.json()).then(userResponse => {
    return userResponse

  })
}

export function fetchSingleUser(userId) {
  return fetch(`https://dummyjson.com/users/${userId ? userId : 1}`).then(res => res.json());
}

export function fetchCarts(userId = null, pageSize = 25 , page = 0) {
  return fetch(`https://dummyjson.com/carts?limit=${pageSize ? pageSize : 10}&skip=${page * pageSize}&userId=${userId}`).then(res => res.json()).then(cartResponse => {
    return cartResponse

  })
}

export function fetchFilterNames(value) {
  return fetch(`https://dummyjson.com/users/search?q=${value}`).then(res => res.json()).then(userResponse => {
    return userResponse.users
  })
}

export function addUser(userData) {
  return fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
}

export function updateUser(userId, userData) {
  return fetch(`https://dummyjson.com/users/${userId}`, {
    method: 'PUT', /* or PATCH */
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
}

export function fetchProductsCategory(value) {
  return fetch(`https://dummyjson.com/products/category/${value}`)
    .then(res => res.json())
    .then(productResponse => {
      return productResponse.products
    })
}

export function fetchUserFilter(key, value) {
  return fetch(`https://dummyjson.com/users/filter?key=${key}&value=${value}`)
    .then(res => res.json()).then(userResponse => {
      return userResponse.users

    })
}

export function fetchAllCategories() {
  return fetch('https://dummyjson.com/products/category-list').then(res => res.json());
}

export function fetchProducts(userId = null, maxProducts) {
  return fetch(`https://dummyjson.com/products?limit=${maxProducts ? maxProducts : 10}&userId=${userId}`).then(res => res.json()).then(productResponse => {
    return productResponse.products

  })
}