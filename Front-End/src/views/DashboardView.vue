<template>
  <v-container v-if="isAuthenticated">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout" icon>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-toolbar>
          
          <v-card-text>
            <h2 class="text-h4 mb-4">Welcome, {{ user.name }}!</h2>
            
            <v-alert v-if="isAdmin" type="warning" class="mb-4">
              <v-icon left>mdi-shield-account</v-icon>
              You have administrator privileges
            </v-alert>
            
            <v-row>
              <v-col cols="12" md="4" v-for="(item, i) in stats" :key="i">
                <v-card hover @click="item.action && item.action()">
                  <v-card-text class="text-center">
                    <div class="text-h5">{{ item.value }}</div>
                    <div class="text-subtitle-1">{{ item.title }}</div>
                    <v-icon large class="mt-2">{{ item.icon }}</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
  <v-container v-else>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-alert type="error" prominent>
          <v-row align="center">
            <v-col class="grow">
              You must be logged in to view this page
            </v-col>
            <v-col class="shrink">
              <v-btn color="error" @click="redirectToLogin">Login Now</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isAuthenticated = computed(() => !!authStore.token)
const user = computed(() => authStore.user || { name: 'Guest' })
const isAdmin = computed(() => user.value.role === 'admin')

const stats = [
  { 
    title: 'Total Projects', 
    value: '24', 
    icon: 'mdi-folder',
    action: () => router.push('/projects')
  },
  { 
    title: 'Tasks Completed', 
    value: '78%', 
    icon: 'mdi-check-all',
    action: () => router.push('/tasks')
  },
  { 
    title: 'Notifications', 
    value: '5', 
    icon: 'mdi-bell',
    action: () => router.push('/notifications')
  }
]

onMounted(() => {
  if (!isAuthenticated.value) {
    toast.warning('Please login to access the dashboard')
  }
})

const logout = async () => {
  try {
    await authStore.logout()
    toast.success('Logged out successfully')
    router.push('/login')
  } catch (error) {
    toast.error('Logout failed: ' + error.message)
  }
}

const redirectToLogin = () => {
  router.push({ 
    name: 'login',
    query: { redirect: router.currentRoute.value.fullPath }
  })
}
</script>

<style scoped>
.v-card {
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.12);
}

.text-h4 {
  color: var(--v-primary-darken2);
}
</style>