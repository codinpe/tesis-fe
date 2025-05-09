// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { randomDelay } from "@/src/helpers";
import { users } from "@/src/lib/users";

export async function POST(req: NextRequest) {
  await randomDelay(300, 800);
  const { email, password } = await req.json();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Email o contraseña incorrectos" },
      { status: 401 }
    );
  }

  const token = `token-${user.id}-${Date.now()}`;
  const res = NextResponse.json(
    { success: true, token, user: { id: user.id, name: user.name, email: user.email } },
    { status: 200 }
  );

  // Escribimos cookie HttpOnly para middleware
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 día
  });

  return res;
}
