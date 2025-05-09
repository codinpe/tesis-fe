// src/app/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useAuth } from "@/src/context/AuthProvider";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FormData) => {
    try {
      const ok = await login(data.email.trim(), data.password);
      if (ok) {
        toast.success(`Bienvenido ${data.email}`);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6 relative"
      >
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
            <ClipLoader size={40} color="#2563eb" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>

        <div>
          <input
            type="email"
            placeholder="Correo corporativo"
            {...register("email")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50 transition"
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
