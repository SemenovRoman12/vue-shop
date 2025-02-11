<template>
  <div class="catalog-container">
    <h1>Каталог товаров</h1>

    <div class="nav-panel">
      <template v-if="!isLoggedIn">
        <router-link to="/login">Вход</router-link>
        <router-link to="/register">Регистрация</router-link>
      </template>
      <template v-else>
        <button class="logout-btn" @click="handleLogout">Выйти</button>
        <router-link to="/orders">Мои заказы</router-link>
        <router-link to="/cart">Корзина</router-link>
      </template>
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>

    <div class="products" v-else>
      <div v-for="product in products" :key="product.id" class="product-item">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">Цена: {{ product.price }} ₽</p>
        <button
            v-if="isLoggedIn"
            @click="addProduct(product.id)"
            class="add-btn"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts } from '@/services/products'
import { logout } from '@/services/auth'
import { addToCart } from '@/services/cart'

export default {
  name: 'CatalogView',
  data() {
    return {
      products: [],
      loading: false
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user_token')
    }
  },
  async created() {
    try {
      this.loading = true
      const data = await getProducts()
      this.products = data.data
    } catch (err) {
      console.error('Ошибка при получении товаров', err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async addProduct(id) {
      try {
        await addToCart(id)
        alert('Товар добавлен в корзину!')
      } catch (err) {
        console.error('Ошибка при добавлении товара', err)
      }
    },
    async handleLogout() {
      try {
        await logout()
      } catch (err) {
        console.error('Ошибка при логауте', err)
      }
      localStorage.removeItem('user_token')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.catalog-container {
  background-color: #fff;
  padding: 16px;
  border-radius: 6px;
}

.nav-panel {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.nav-panel > * {
  text-decoration: none;
  color: #007acc;
  font-weight: bold;
}
.logout-btn {
  background-color: #f44336;
  border: none;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.logout-btn:hover {
  background-color: #c0392b;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.product-item {
  flex: 0 0 calc(33% - 10px);
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 4px;
}
.product-item h3 {
  margin: 0 0 8px 0;
}
.price {
  font-weight: bold;
  margin: 4px 0;
}
.add-btn {
  margin-top: 8px;
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.add-btn:hover {
  background-color: #388e3c;
}

.loading {
  text-align: center;
  font-weight: bold;
}
</style>
