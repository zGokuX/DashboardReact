export default function fetchUser(maxUser) {
  return fetch(`https://dummyjson.com/users?limit=${maxUser ? maxUser : 10}`).then(res => res.json()).then(userResponse => {
    return userResponse.users

  })
}

export function fetchCarts(userId = null,maxCarts) {
  return fetch(`https://dummyjson.com/carts?limit=${maxCarts ? maxCarts : 10}&userId=${userId}`).then(res => res.json()).then(cartResponse => {
    return cartResponse.carts

  })
}

export function fetchProducts(userId = null,maxProducts) {
  return fetch(`https://dummyjson.com/products?limit=${maxProducts ? maxProducts : 10}&userId=${userId}`).then(res => res.json()).then(productResponse => {
    return productResponse.products

  })
}