import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_TOKEN = "portfolio-admin-session";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = Buffer.from(`${Date.now()}-${ADMIN_PASSWORD}`).toString(
    "base64"
  );

  const cookieStore = await cookies();
  cookieStore.set(SESSION_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN);
  return NextResponse.json({ success: true });
}
