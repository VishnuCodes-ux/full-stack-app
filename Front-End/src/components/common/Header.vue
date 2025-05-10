<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>My App</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{
        isDark ? "mdi-weather-night" : "mdi-white-balance-sunny"
      }}</v-icon>
    </v-btn>

    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useTheme } from "vuetify";
import { ref } from "vue";
const auth = useAuthStore();
const theme = useTheme();

function logout() {
  auth.logout();
}
const isDark = ref(theme.global.name.value === 'dark');

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'dark' : 'light';
};
</script>
