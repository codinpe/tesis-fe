// src/app/login/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import * as z from "zod";

const schema = z.object({
  username: z.string(),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const { logged, isInitialized, login } = useAuth();
  const router = useRouter();

  // ✅ Evita mostrar login si ya está logueado
  useEffect(() => {
    if (isInitialized && logged) {
      router.replace("/dashboard");
    }
  }, [isInitialized, logged]);

  if (!isInitialized || logged) return null;

  const onSubmit = async (data: FormData) => {
    try {
      const ok = await login(data.username.trim(), data.password);
      if (ok) {
        toast.success(`Bienvenido ${data.username}`);
        router.push("/dashboard");
      } else {
        // login devuelve false si credenciales invalidas
        toast.error("Email o contraseña incorrectos");
      }
    } catch (err: any) {
      // por si loginAPI lanza otro error de red
      toast.error(err.message || "Error desconocido");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
      >
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70">
            <ClipLoader size={40} color="#2563eb" />
          </div>
        )}
        <h2 className="text-center text-2xl font-bold">Iniciar sesión</h2>

        <div>
          <input
            placeholder="Nombre de usuario"
            {...register("username")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-primary py-2 text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Procesando..." : "Entrar"}
        </button>

        <div className="flex justify-between text-sm text-gray-600">
          {/* <a href="/forgot" className="hover:underline">
            ¿Olvidaste tu contraseña?
          </a> */}
          {/* <a href="/register" className="hover:underline">
            Crear cuenta
          </a> */}
        </div>
      </form>
    </div>
  );
}
