import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // Token expires in 7 days
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const setUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUser();
};

export const logout = () => {
  removeToken();
  removeUser();
  window.location.href = '/auth/login';
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}; 