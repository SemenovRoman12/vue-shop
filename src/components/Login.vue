<template>
  <div class="form-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-control">
        <label>Email</label>
        <input v-model="email" type="email" />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>

      <div class="form-control">
        <label>Пароль</label>
        <input v-model="password" type="password" />
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>

      <button type="submit" class="btn primary">Войти</button>
      <button type="button" class="btn secondary" @click="goBack">Назад</button>
    </form>

    <div v-if="commonError" class="common-error">
      {{ commonError }}
    </div>
  </div>
</template>

<script>
import { login } from '@/services/auth'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      commonError: ''
    }
  },
  methods: {
    async handleLogin() {
      this.errors = {}
      this.commonError = ''
      try {
        const { data } = await login(this.email, this.password)
        localStorage.setItem('user_token', data.user_token)
        this.$router.push('/')
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            this.commonError = 'Неверный логин или пароль'
          } else if (err.response.status === 422) {
            const data = err.response.data
            if (data.errors) {
              for (const key in data.errors) {
                this.errors[key] = data.errors[key].join(', ')
              }
            }
          } else {
            this.commonError = 'Произошла ошибка при входе'
          }
        } else {
          this.commonError = 'Сетевая ошибка'
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
.form-container {
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
}
.form-container h2 {
  margin-top: 0;
  text-align: center;
}

.form-control {
  margin-bottom: 16px;
}
.form-control label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
.form-control input {
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.error {
  color: #c62828;
  font-size: 0.9em;
  margin-top: 4px;
}

.common-error {
  color: red;
  margin-top: 20px;
  text-align: center;
}

.btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.btn.primary {
  background-color: #2196f3;
  color: #fff;
  margin-right: 8px;
}
.btn.primary:hover {
  background-color: #1976d2;
}
.btn.secondary {
  background-color: #bdbdbd;
  color: #000;
}
.btn.secondary:hover {
  background-color: #9e9e9e;
}
</style>
