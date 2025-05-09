// src/components/Navbar.tsx
"use client";

import { useAuth } from "@/src/context/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const path = usePathname();
  const { logged, logout, user } = useAuth();

  return (
    <nav className="w-full bg-primary text-white px-4 py-3 flex items-center">
      <Link href="/" className="font-bold text-lg">
        Accounting AML
      </Link>
      <div className="flex-1" />
      {logged ? (
        <>
          <span className="mr-4">Hola, {user?.name}</span>
          <Button onClick={logout} variant="secondary">
            Salir
          </Button>
        </>
      ) : (
        path !== "/login" && (
          <Link href="/login" className="hover:underline">
            Iniciar sesión
          </Link>
        )
      )}
    </nav>
  );
}
