// src/context/AuthProvider.tsx
"use client";

import { loginAPI, recoverAPI } from "@/lib/api";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthCtx = {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  logged: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  recover: (email: string) => Promise<void>;
};
const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthCtx["user"]>(null);
  const [token, setToken] = useState<string | null>(null);

  // Al montar, cargamos de localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const { token: tkn, user: usr } = await loginAPI(email, pass);
      setToken(tkn);
      setUser(usr);
      // Persistimos
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

  const recover = (email: string) => recoverAPI(email);

  return (
    <Ctx.Provider
      value={{
        user,
        token,
        logged: Boolean(token),
        login,
        logout,
        recover,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx)!;
