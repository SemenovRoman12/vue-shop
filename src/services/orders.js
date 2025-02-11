import api from './api'

export async function getOrders() {
    const resp = await api.get('/order')
    return resp.data
}
