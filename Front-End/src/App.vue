<script setup>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import Sidebar from "@/components/common/Sidebar.vue";
import { ref } from "vue";
import { onMounted } from "vue";

const drawer = ref(true);
const sidebarRef = ref(null);
</script>

<template>
  <v-app>
    <Header />
    <Sidebar ref="sidebarRef" />
    <v-main :class="{ 'with-sidebar-expanded': sidebarRef?.isHovered }">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
.with-sidebar-expanded {
  margin-left: 256px; /* Adjust based on expanded width of drawer */
}
</style>
