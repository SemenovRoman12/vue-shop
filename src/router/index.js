import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '@/components/Catalog.vue'
import RegisterView from '@/components/Register.vue'
import LoginView from '@/components/Login.vue'
import CartView from '@/components/Cart.vue'
import OrdersView from '@/components/Orders.vue'

const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: CatalogView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartView
    },
    {
        path: '/orders',
        name: 'Orders',
        component: OrdersView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
