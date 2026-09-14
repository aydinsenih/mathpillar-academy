import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_TOKEN,
} from "@/lib/courses-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (
      String(email).trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      String(password).trim() === ADMIN_PASSWORD
    ) {
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_SESSION_KEY, ADMIN_SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        user: { email: ADMIN_EMAIL, role: "admin" },
      });
    }

    return NextResponse.json({ error: "Invalid admin email or password" }, { status: 401 });
  } catch (error) {
    console.error("Error during admin login:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
