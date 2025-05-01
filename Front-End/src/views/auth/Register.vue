<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Create Account</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="formData.name"
                :rules="nameRules"
                label="Full Name"
                prepend-icon="mdi-account"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="Email"
                prepend-icon="mdi-email"
                required
                type="email"
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
                :rules="passwordRules"
                label="Password"
                prepend-icon="mdi-lock"
                required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                counter
              ></v-text-field>

              <v-text-field
                v-model="formData.confirmPassword"
                :rules="confirmPasswordRules"
                label="Confirm Password"
                prepend-icon="mdi-lock-check"
                required
                type="password"
              ></v-text-field>

              <v-select
                v-model="formData.role"
                :items="roles"
                label="Role"
                prepend-icon="mdi-account-circle"
                required
                @update:modelValue="toggleStudentIdField"
              ></v-select>

              <v-text-field
                v-if="showStudentIdField"
                v-model="formData.studentId"
                :rules="studentIdRules"
                label="Student ID"
                prepend-icon="mdi-identifier"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submit"
              size="large"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>

        <div class="text-center mt-4">
          <router-link to="/login"
            >Already have an account? Sign in</router-link
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from '@/services/api'

const router = useRouter();
const toast = useToast();
const form = ref(null);

const valid = ref(true);
const showPassword = ref(false);
const showStudentIdField = ref(true);

const formData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "student",
  studentId: "",
});

const roles = [
  { title: "Student", value: "student" },
  { title: "Teacher", value: "teacher" },
  { title: "Administrator", value: "admin" },
];


const nameRules = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length >= 3) || "Name must be at least 3 characters",
];

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
];

const confirmPasswordRules = computed(() => [
  (v) => !!v || "Please confirm your password",
  (v) => v === formData.value.password || "Passwords do not match",
]);

const studentIdRules = [
  (v) => !!v || "Student ID is required",
  (v) => (v && v.length >= 5) || "Student ID must be at least 5 characters",
];

const toggleStudentIdField = () => {
  showStudentIdField.value = formData.value.role === "student";
  if (!showStudentIdField.value) {
    formData.value.studentId = "";
  }
};

const submit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const userData = {
        name: formData.value.name,
        email: formData.value.email,
        password: formData.value.password,
        role: formData.value.role,
      };

      if (formData.value.role === "student") {
        userData.studentId = formData.value.studentId;
      }

      const response = await api.post('/auth/register', userData);
        if (response.status === 201) {
            toast.success("Registration successful! Please login.");
        } else {
            toast.error("Registration failed. Please try again.");
        }


      router.push("/login");
      toast.success("Registration successful! Please login.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("Registration error:", error);
    }
  }
};
</script>
  
  <style scoped>
.v-card {
  border-radius: 8px;
}

.v-toolbar {
  border-radius: 8px 8px 0 0;
}

a {
  text-decoration: none;
  color: var(--v-primary-base);
}
</style>