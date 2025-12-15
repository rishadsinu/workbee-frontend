import { AuthHelper } from "@/utils/auth-helper";
import axios from "axios";

const baseURL = import.meta.env.VITE_GATEWAY_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getAccessToken();
    
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
  async (error) => {
    const originalRequest = error.config;

    // Handle both 401 and 403 errors (token expired/invalid)
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      
      // Check if error is specifically about invalid/expired token
      const isTokenError = error.response?.data?.error?.includes('token') || 
                          error.response?.data?.error?.includes('Token') ||
                          error.response?.data?.message?.includes('token') ||
                          error.response?.data?.message?.includes('Token');

      if (!isTokenError) {
        // Not a token error, just reject
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = AuthHelper.getRefreshToken();

      if (!refreshToken) {
        console.log("No refresh token available, redirecting to login");
        AuthHelper.clearAuth();
        
        // Get user role to redirect appropriately
        const userRole = AuthHelper.getUserRole();
        if (userRole === 'admin') {
          window.location.href = "/admin";
        } else if (userRole === 'worker') {
          window.location.href = "/worker/worker-login";
        } else {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        console.log("Access token expired, refreshing...");
        
        // Call refresh token endpoint
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {
          refreshToken
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        console.log("Token refreshed successfully");

        // Update tokens
        AuthHelper.setAccessToken(accessToken);
        AuthHelper.setRefreshToken(newRefreshToken);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        // Process queued requests
        processQueue(null, accessToken);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError: any) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError, null);
        
        // Get user role before clearing auth
        const userRole = AuthHelper.getUserRole();
        
        AuthHelper.clearAuth();
        
        // Redirect based on role
        if (userRole === 'admin') {
          window.location.href = "/admin";
        } else if (userRole === 'worker') {
          window.location.href = "/worker/worker-login";
        } else {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);