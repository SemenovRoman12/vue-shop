<template>
  <div class="cart-container">
    <h2>Моя корзина</h2>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else>
      <div v-if="groupedItems.length === 0">
        Корзина пуста
      </div>
      <div v-else>
        <div
            class="cart-item"
            v-for="group in groupedItems"
            :key="group.product_id"
        >
          <div class="item-info">
            <h4>{{ group.name }}</h4>
            <p>Цена: {{ group.price }} ₽</p>
            <p>Количество: {{ group.count }}</p>
          </div>
          <div class="item-actions">
            <button @click="increment(group.product_id)">+</button>
            <button @click="decrementOne(group.itemIds[0])">-</button>
            <button @click="removeAll(group.itemIds)">Удалить</button>
          </div>
        </div>
        <div class="cart-actions">
          <button class="checkout-btn" @click="checkout">Оформить заказ</button>
        </div>
      </div>
    </div>
    <button class="btn secondary" @click="goBack">Назад</button>
  </div>
</template>

<script>
import { getCart, addToCart, removeCartItem, createOrder } from '@/services/cart'

export default {
  name: 'CartView',
  data() {
    return {
      cartItems: [],
      loading: false
    }
  },
  computed: {
    groupedItems() {
      const map = {}
      this.cartItems.forEach(item => {
        const pid = item.product_id
        if (!map[pid]) {
          map[pid] = {
            product_id: pid,
            name: item.name,
            price: item.price,
            count: 0,
            itemIds: []
          }
        }
        map[pid].count++
        map[pid].itemIds.push(item.id)
      })
      return Object.values(map)
    }
  },
  async created() {
    await this.loadCart()
  },
  methods: {
    async loadCart() {
      try {
        this.loading = true
        const resp = await getCart()
        this.cartItems = resp.data
      } finally {
        this.loading = false
      }
    },
    async increment(productId) {
      await addToCart(productId)
      await this.loadCart()
    },
    async decrementOne(itemId) {
      await removeCartItem(itemId)
      await this.loadCart()
    },
    async removeAll(itemIds) {
      for (let id of itemIds) {
        await removeCartItem(id)
      }
      await this.loadCart()
    },
    async checkout() {
      try {
        const resp = await createOrder()
        alert('Заказ оформлен! ID заказа: ' + resp.data.order_id)
        this.$router.push('/orders')
      } catch (err) {
        if (err.response && err.response.status === 422) {
          alert('Нельзя оформить пустой заказ')
        } else {
          alert('Ошибка при оформлении заказа')
        }
      }
    },
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.cart-container {
  background-color: #fff;
  padding: 16px;
  border-radius: 6px;
}
.loading {
  font-weight: bold;
  text-align: center;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.item-info {
  max-width: 70%;
}
.item-info h4 {
  margin: 0 0 8px 0;
}
.item-actions button {
  margin-left: 6px;
}
.cart-actions {
  margin-top: 20px;
  text-align: right;
}
.checkout-btn {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.checkout-btn:hover {
  background-color: #388e3c;
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
