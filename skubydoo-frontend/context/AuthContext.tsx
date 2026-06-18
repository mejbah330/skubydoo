"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  username: string;
  full_name: string | null;
  role: "customer" | "admin";
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAdmin: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("skubydoo_token");
    if (savedToken) {
      setToken(savedToken);
      fetchMe(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMe = async (authToken: string) => {
    try {
      const data = await api.get<{ id: string; email: string; username: string; full_name: string | null; role: string; is_active: boolean }>("/auth/me", authToken);
      setUser({
        id: data.id,
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        role: data.role as "customer" | "admin",
        is_active: data.is_active,
      });
    } catch {
      localStorage.removeItem("skubydoo_token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.post<{ access_token: string; token_type: string }>("/auth/login", { email, password });
    const authToken = data.access_token;
    localStorage.setItem("skubydoo_token", authToken);
    setToken(authToken);
    await fetchMe(authToken);
  }, []);

  const register = useCallback(async (username: string, email: string, password: string, fullName: string) => {
    await api.post("/auth/register", {
      email,
      username,
      password,
      full_name: fullName,
    });
    await login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem("skubydoo_token");
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
