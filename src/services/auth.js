import api from './api'

export async function login(email, password) {
    const resp = await api.post('/login', { email, password })
    return resp.data
}

export async function registerUser(fio, email, password) {
    const resp = await api.post('/signup', { fio, email, password })
    return resp.data
}

export async function logout() {
    const resp = await api.get('/logout')
    return resp.data
}
