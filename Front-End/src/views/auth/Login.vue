<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const valid = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const form = ref({
  email: "",
  password: "",
});

const rules = {
  email: [
    (v) => !!v || "Email is required",
    (v) => /.+@.+\..+/.test(v) || "Email must be valid",
  ],
  password: [
    (v) => !!v || "Password is required",
    (v) => v.length >= 6 || "Password must be at least 6 characters",
  ],
};

const submit = async () => {
  if (!valid.value) return;

  loading.value = true;

  try {
    const success = await authStore.login({
      email: form.value.email,
      password: form.value.password,
    });

    if (success) {
      toast.success("Login successful!");
      const redirect = router.currentRoute.value.query.redirect || "/dashboard";
      router.push(redirect);
    }
  } catch (error) {
    let message = "Login failed";

    if (error.response) {
      message = error.response.data.message || message;

      if (error.response.status === 401) {
        message = "Invalid email or password";
      } else if (error.response.status === 403) {
        message = "Account not verified";
      }
    }

    toast.error(message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="px-4">
          <v-card-text>
            <v-form ref="loginForm" v-model="valid" @submit.prevent="submit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    :rules="rules.email"
                    label="Email"
                    required
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    :rules="rules.password"
                    label="Password"
                    required
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <v-btn :loading="loading" block color="primary" type="submit">
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>