import axios from "axios";

const baseURL = import.meta.env.VITE_GATEWAY_URL

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    },
});


// Req Interceptors

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

// Res Interceptors

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response?.status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        window.location.href = "/login"
    }

    return Promise.reject(error)
})


