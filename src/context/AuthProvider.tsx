"use client";

import {
  loginAPI,
  recoverAPI,
  registerAPI
} from "@/lib/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

type AuthCtx = {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  logged: boolean;
  isInitialized: boolean; // ✅ nuevo
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: {
    username: string;
    name: string;
    lastName: string;
    birthdate: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
  }) => Promise<boolean>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthCtx["user"]>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // ✅

  // Al montar, cargamos de localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsInitialized(true); // ✅ solo al final
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { token: tkn, user: usr } = await loginAPI(username, password);
      setToken(tkn);
      setUser(usr);
      localStorage.setItem("token", tkn);
      localStorage.setItem("user", JSON.stringify(usr));
      return true;
    } catch (err) {
      console.error("AuthProvider.login error:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const register = async (data: any) => {
    try {
      await registerAPI(data);
      return true;
    } catch (err) {
      console.error("AuthProvider.register error:", err);
      return false;
    }
  };

  const logged = !!token;

  return (
    <Ctx.Provider
      value={{
        user,
        token,
        logged,
        isInitialized, // ✅
        login,
        logout,
        register
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx)!;
