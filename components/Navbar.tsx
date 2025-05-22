"use client";

import { useAuth } from "@/src/context/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const path = usePathname();
  const { logged, logout, user } = useAuth();

  const isLoginPage = path === "/login";
  const isSignupPage = path === "/sign-up";
  const router = useRouter();

  const history = () => {
    router.push("/history");
  };
  return (
    <nav className="w-full bg-primary text-white px-4 py-3 flex items-center">
      <Link href="/" className="font-bold text-lg">
        Accounting AML
      </Link>
      <div className="flex-1" />
      {logged ? (
        <>
          <span className="mr-4">Hola, {user?.name}</span>
          <Button onClick={history} variant="secondary">
            Historial
          </Button>
          <Button onClick={logout} variant="secondary">
            Salir
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-4 text-sm">
          {!isLoginPage && (
            <Link href="/login" className="hover:underline">
              Iniciar sesión
            </Link>
          )}
          {!isSignupPage && (
            <Link href="/sign-up" className="hover:underline">
              Registrarse
            </Link>
          )}
          <Link href="/forgot" className="hover:underline">Recuperar contraseña</Link>

        </div>
      )}
    </nav>
  );
}
