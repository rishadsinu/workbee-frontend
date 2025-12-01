import { AuthHelper } from "@/utils/auth-helper";
import axios from "axios";

const baseURL = import.meta.env.VITE_GATEWAY_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      AuthHelper.clearAuth();
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);
