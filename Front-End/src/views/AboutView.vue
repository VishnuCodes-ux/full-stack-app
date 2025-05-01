<template>
  <div class="about">
    <h1>About</h1>
    <button @click="storeCounter.increment">
      {{ storeCounter.count }}
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import api from '@/services/api'

const storeCounter = useCounterStore()

const login = async () => {
  alert('Logging in...')
  try {
    const res = await api.post('/auth/login', {
      username: 'admin',
      password: '1234'
    })
    console.log('Login Response:', res.data)
  } catch (err) {
    console.error('Login failed:', err)
  }
}

onMounted(() => {
  login()
})
</script>
