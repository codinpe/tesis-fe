const BASE_URL = 'https://codin-tesis-back.onrender.com';

export async function loginAPI(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/v1/authentication/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Error al iniciar sesión');
  }

  // Esperado:
  // {
  //   "userId": 2,
  //   "accessToken": "..."
  // }

  return {
    token: json.accessToken,
    user: {
      id: String(json.userId),
      name: username, // no devuelve name, usamos username como fallback
      email: '', // backend no devuelve email, puedes adaptarlo luego
    },
  };
}

export async function registerAPI(payload: {
  username: string;
  name: string;
  lastName: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${BASE_URL}/api/v1/authentication/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Error al registrar');
  }

  // Esperado:
  // {
  //   "username": "string",
  //   "password": "ey..."
  // }

  return json;
}

export async function recoverAPI(payload: { email: string; password: string }) {
  const res = await fetch(`https://codin-tesis-back.onrender.com/api/v1/authentication/recover-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Error al recuperar contraseña');
  }

  return json;
}


export async function validateAPI(files: FileList) {
  const fd = new FormData();
  Array.from(files).forEach((f) => fd.append('file', f));
  const res = await fetch('/api/validate', { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
}

export async function analyzeAPI(files: FileList) {
  const fd = new FormData();
  Array.from(files).forEach((f) => fd.append('file', f));
  const res = await fetch('/api/analyze', { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json.data as any[];
}



