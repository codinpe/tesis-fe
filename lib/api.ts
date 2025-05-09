// src/lib/api.ts
// src/lib/api.ts
export async function loginAPI(email: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  // { success: true, token, user }
  return json as { token: string; user: { id: string; name: string; email: string } };
}

export async function recoverAPI(email: string) {
  const res = await fetch("/api/forgot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Error al enviar correo");
}

  export async function validateAPI(files: FileList) {
    const fd = new FormData();
    Array.from(files).forEach(f => fd.append("file", f));
    const res = await fetch("/api/validate", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
  }
  
  export async function analyzeAPI(files: FileList) {
    const fd = new FormData();
    Array.from(files).forEach(f => fd.append("file", f));
    const res = await fetch("/api/analyze", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.data as any[];
  }
  