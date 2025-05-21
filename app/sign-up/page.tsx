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
  username: z.string().min(3, "Usuario muy corto").max(20, "Usuario muy largo"),
  name: z.string().min(2, "Nombre requerido"),
  lastName: z.string().min(2, "Apellido requerido"),
  birthdate: z.string().refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      if (!(date instanceof Date) || isNaN(date.getTime())) return false;

      const age = now.getFullYear() - date.getFullYear();
      const isBirthdayPassedThisYear =
        now.getMonth() > date.getMonth() ||
        (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
      const actualAge = isBirthdayPassedThisYear ? age : age - 1;

      return (
        date < now && // debe ser en el pasado
        actualAge >= 13 && // mínimo 13 años
        actualAge <= 120 // máximo 120 años
      );
    },
    {
      message: "Ingresa una fecha válida. Debes tener entre 13 y 100 años.",
    }
  ),

  email: z.string().email("Email inválido"),
  phoneNumber: z
    .string()
    .min(9, "Mínimo 9 dígitos")
    .max(9, "Número demasiado largo"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const { logged, isInitialized, register: signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && logged) {
      router.replace("/dashboard");
    }
  }, [isInitialized, logged]);

  if (!isInitialized || logged) return null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange", // muestra errores mientras se escribe
    reValidateMode: "onChange", // vuelve a validar dinámicamente
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        role: "ROLE_ADMIN", // Fijo
      };

      const ok = await signup(payload);
      if (ok) {
        toast.success("Cuenta creada exitosamente");
        router.push("/dashboard");
      } else {
        toast.error("No se pudo crear la cuenta");
      }
    } catch (err: any) {
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
        <h2 className="text-center text-2xl font-bold">Crear cuenta</h2>

        <div>
          <input
            type="text"
            placeholder="Usuario"
            {...register("username")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Nombre"
            {...register("name")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Apellido"
            {...register("lastName")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            {...register("birthdate")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.birthdate && (
            <p className="text-sm text-red-500">{errors.birthdate.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Correo"
            {...register("email")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Teléfono"
            {...register("phoneNumber")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
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
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>

        <div className="flex justify-center text-sm text-gray-600">
          {/* <a href="/login" className="hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </a> */}
        </div>
      </form>
    </div>
  );
}
