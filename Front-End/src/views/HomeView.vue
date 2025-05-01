<template>
  <div class="home">
    <v-btn color="primary">Hello</v-btn>
    <!-- <h1>Auth user: {{ getUserName(useAuth.users) }}</h1> -->
    <div>
      <Counter />
    </div>
    <div class="buttons">
      <button @click="storeCounter.decrement">-</button>
      <button @click="storeCounter.increment">+</button>
    </div>
    <hr>
    <div>
      The counter is: odd/even
    </div>
    <h1>{{ storeCounter.oddOrEven }}</h1>
    <h3>Edit counter:</h3>
    <div>
      <input type="number" v-model="storeCounter.count">
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useCounterStore } from '@/stores/counter.js';
// import { useAuthStore } from '@/stores/auth.js';
import Counter from '@/components/Counter.vue';
// const useAuth = useAuthStore();
const storeCounter = useCounterStore();

// function getUserName(users) {
 
//   return users.map(user => user.username).join(', ');
// }

</script>
<style>
  .count {
    font-size: 60px;
    margin: 20px;
  }
  .buttons button {
    font-size: 40px;
    margin: 10px;
  }
</style>