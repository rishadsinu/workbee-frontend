export const AuthHelper = {
    setAuthData: (token: string, userId: string, user?: any) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    },
    
    clearAuthData: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
    },
    
    isAuthenticated: () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        return !!(token && userId);
    },
    
    getUserId: () => {
        return localStorage.getItem("userId");
    }
};
