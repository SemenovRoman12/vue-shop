import api from './api'

export async function getProducts() {
    const resp = await api.get('/products')
    return resp.data
}
