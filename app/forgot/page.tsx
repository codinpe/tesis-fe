'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { recoverAPI } from '@/lib/api';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function RecoverPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await recoverAPI(data);
      toast.success('Contraseña actualizada con éxito');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Error al recuperar contraseña');
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
        <h2 className="text-2xl font-bold text-center">Recuperar contraseña</h2>

        <div>
          <input
            type="email"
            placeholder="Correo registrado"
            {...register('email')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Nueva contraseña"
            {...register('password')}
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
          {isSubmitting ? 'Procesando...' : 'Actualizar'}
        </button>
      </form>
    </div>
  );
}
