import api from './api'

export async function addToCart(productId) {
    const resp = await api.post(`/cart/${productId}`)
    return resp.data
}

export async function getCart() {
    const resp = await api.get('/cart')
    return resp.data
}

export async function removeCartItem(itemId) {
    const resp = await api.delete(`/cart/${itemId}`)
    return resp.data
}

export async function createOrder() {
    const resp = await api.post('/order')
    return resp.data
}
