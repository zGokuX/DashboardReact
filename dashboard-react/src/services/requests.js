export default function fetchUser(maxUser) {
  return fetch(`https://dummyjson.com/users?limit=${maxUser ? maxUser : 10}`).then(res => res.json()).then(userResponse => {
    return userResponse.users

  })
}

export function fetchSingleUser(userId) {
  return fetch(`https://dummyjson.com/users/${userId ? userId : 1}`).then(res => res.json());
}

export function fetchCarts(userId = null, maxCarts) {
  return fetch(`https://dummyjson.com/carts?limit=${maxCarts ? maxCarts : 10}&userId=${userId}`).then(res => res.json()).then(cartResponse => {
    return cartResponse.carts

  })
}

export function fetchFilterNames(value) {
  return fetch(`https://dummyjson.com/users/search?q=${value}`).then(res => res.json()).then(userResponse => {
    return userResponse.users
  })
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

export function fetchProducts(userId = null, maxProducts) {
  return fetch(`https://dummyjson.com/products?limit=${maxProducts ? maxProducts : 10}&userId=${userId}`).then(res => res.json()).then(productResponse => {
    return productResponse.products

  })
}