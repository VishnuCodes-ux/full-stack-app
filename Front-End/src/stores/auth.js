import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        users: [
            { username: "admin", password: "admin" },
            { username: "user", password: "user" },
        ],
        isAuthenticated: false,
    }),
    // getters: {
    //     getUsers: (state) => state.users,
    //     isLoggedIn: (state) => state.isAuthenticated,
    // },
})