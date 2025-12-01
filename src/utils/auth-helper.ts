const TOKEN = "token";
const USER = "user";
const USER_ID = "userId";

export const AuthHelper = {
  // Save token, user, and userId
  setAuth(token: string, user: any) {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
    localStorage.setItem(USER_ID, user._id || user.id);
  },

  // Token methods
  getToken() {
    return localStorage.getItem(TOKEN);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  },

  // User methods
  getUser() {
    const stored = localStorage.getItem(USER);
    return stored ? JSON.parse(stored) : null;
  },

  setUser(user: any) {
    localStorage.setItem(USER, JSON.stringify(user));
  },

  // User ID methods
  getUserId() {
    return localStorage.getItem(USER_ID);
  },

  setUserId(id: string) {
    localStorage.setItem(USER_ID, id);
  },

  // Role check (based on user object)
  getUserRole() {
    const user = this.getUser();
    return user?.role || null;
  },

  isAdmin() {
    return this.getUserRole() === "admin";
  },

  isUser() {
    return this.getUserRole() === "user";
  },

  // Clear all
  clearAuth() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(USER_ID);
  },

  // Auth check
  isLoggedIn() {
    return !!localStorage.getItem(TOKEN);
  }
};