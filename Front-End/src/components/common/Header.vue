<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>My App</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

function logout() {
  auth.logout()
}
</script>
