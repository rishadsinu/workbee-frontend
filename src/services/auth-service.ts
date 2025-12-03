import { api } from "./axios-instance";

export const AuthService = {

    // User Api's

    // register
    register: (data: { name: string, email: string, password: string }) => {
        return api.post("/auth/register", data)
    },

    // verify otp
    verifyOtp: (data: { userId: string | null; otp: string }) => {
        return api.post("/auth/verifyOtp", data);
    },

    // login
    login: (data: { email: string, password: string }) => {
        return api.post("/auth/login", data)
    },

    // forgot Password
    forgotPassword: (data: { email: string }) => {
        return api.post("/auth/forget-password", data)
    },

    // reset Password
    resetPassword: (token: string, data: { password: string }) => {
        return api.post(`/auth/reset-password/${token}`, data);
    },

    // verify User
    verifyUser: () => api.get("/auth/verify"),


    // google Auth
    googleAuthLogin: (data: { credential: string }) => {
        return api.post("/auth/google-login", data)
    },


    // Admin Api's

    //Admin Login
    adminLogin: (data: { email: string, password: string }) => {
        return api.post("/auth/admin/login", data)
    },
    // Fetch users list
    getUsers: () => {
        return api.get("/auth/admin/get-users")
    },
    // block user
    blockUser: (id: string) => {
        return api.patch(`/auth/admin/block-user/${id}`);
    },

    // Worker Api's

    //worker Login
    workerLogin: (data: { email: string, password: string }) => {
        return api.post("/auth/worker-login", data)
    },

}




