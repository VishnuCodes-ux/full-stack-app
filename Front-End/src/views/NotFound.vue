<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <v-card class="elevation-12 pa-8">
            <v-icon size="120" color="error">mdi-alert-circle-outline</v-icon>
            
            <h1 class="text-h3 my-4">404 - Page Not Found</h1>
            
            <p class="text-body-1 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <v-btn
              color="primary"
              size="large"
              @click="goHome"
              prepend-icon="mdi-home"
            >
              Return Home
            </v-btn>
            
            <v-btn
              class="ml-4"
              variant="outlined"
              size="large"
              @click="goBack"
              prepend-icon="mdi-arrow-left"
            >
              Go Back
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goHome = () => {
    router.push('/')
  }
  
  const goBack = () => {
    router.go(-1)
  }
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  
  .v-card {
    border-radius: 12px;
  }
  </style>