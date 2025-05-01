<template>
    <v-navigation-drawer app v-model="drawer" permanent>
      <v-list>
        <v-list-item link to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { ref, defineExpose } from 'vue'
  
  const drawer = ref(true)
  defineExpose({ drawer })
  </script>
  