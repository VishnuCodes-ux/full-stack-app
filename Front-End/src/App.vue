<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script setup>

import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import Sidebar from "@/components/common/Sidebar.vue";
import { ref } from "vue";
const drawer = ref(true);
</script>

<style>

@import '@/assets/main.css';
</style>
