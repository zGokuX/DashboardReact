export default function fetchUser(maxUser) {
  return fetch(`https://dummyjson.com/users?limit=${maxUser}`).then(res => res.json()).then(userResponse => {
    return userResponse.users

  })
}

export function fetchCarts(userId = null) {
  return fetch(`https://dummyjson.com/carts?limit=10&userId=${userId}`).then(res => res.json()).then(cartResponse => {
    console.log(cartResponse)
    return cartResponse.carts

  })
}

export function fetchProducts(userId = null) {
  return fetch(`https://dummyjson.com/products?limit=20&userId=${userId}`).then(res => res.json()).then(productResponse => {
    console.log(productResponse)
    return productResponse.products

  })
}