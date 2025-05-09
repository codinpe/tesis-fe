// src/app/forgot/page.tsx
"use client";

import { recoverAPI } from "@/lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function ForgotPage() {
  const { register, handleSubmit, formState } = useForm<{ email: string }>();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: { email: string }) => {
    try {
      await recoverAPI(data.email.trim());
      toast.success("Correo de recuperación enviado");
    } catch {
      toast.error("Error al enviar correo");
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
        <h2 className="text-2xl font-bold text-center">Recuperar Contraseña</h2>
        <div>
          <input
            type="email"
            placeholder="Correo corporativo"
            {...register("email", { required: "Email obligatorio" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white py-2 rounded hover:opacity-90 disabled:opacity-50 transition"
        >
          {isSubmitting ? "Enviando..." : "Enviar correo"}
        </button>
      </form>
    </div>
  );
}
