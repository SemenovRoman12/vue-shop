<template>
  <div class="orders-container">
    <h2>Мои заказы</h2>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Товары (id): {{ order.products.join(', ') }}</p>
        <p>Сумма заказа: {{ order.order_price }} ₽</p>
      </div>
      <div v-if="orders.length === 0">Заказов нет</div>
    </div>
    <button class="btn secondary" @click="goBack">Назад</button>
  </div>
</template>

<script>
import { getOrders } from '@/services/orders'

export default {
  name: 'OrdersView',
  data() {
    return {
      orders: [],
      loading: false
    }
  },
  async created() {
    this.loading = true
    try {
      const resp = await getOrders()
      this.orders = resp.data
    } catch (err) {
      console.error('Ошибка при загрузке заказов', err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.orders-container {
  background: #fff;
  padding: 16px;
  border-radius: 6px;
}
.loading {
  text-align: center;
  font-weight: bold;
}
.order-item {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 12px;
  margin: 12px 0;
}
.btn.secondary {
  margin-top: 16px;
  padding: 6px 12px;
  background-color: #bdbdbd;
  border: none;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
}
.btn.secondary:hover {
  background-color: #9e9e9e;
}
</style>
