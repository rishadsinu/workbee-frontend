const ADMIN_TOKEN = "adminToken";

export const AdminAuthHelper = {
  setToken(token: string) {
    localStorage.setItem(ADMIN_TOKEN, token);
  },

  getToken() {
    return localStorage.getItem(ADMIN_TOKEN);
  },

  clearAuth() {
    localStorage.removeItem(ADMIN_TOKEN);
  },

  isLoggedIn() {
    return !!localStorage.getItem(ADMIN_TOKEN);
  }
};
