<script setup>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import Sidebar from "@/components/common/Sidebar.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const drawer = ref(true);
const sidebarRef = ref(null);

// Dynamically check route meta
const hideLayout = computed(() => route.meta.hideLayout);
</script>

<template>
  <v-app>
    <Header v-if="!hideLayout" />
    <Sidebar v-if="!hideLayout" ref="sidebarRef" />

    <v-main :class="{ 'with-sidebar-expanded': sidebarRef?.isHovered }">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>

    <Footer v-if="!hideLayout" />
  </v-app>
</template>
<style>
.with-sidebar-expanded {
  margin-left: 256px; /* Adjust based on expanded width of drawer */
}
</style>