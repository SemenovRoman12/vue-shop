import axios from 'axios'

const api = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor на установку токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('user_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
