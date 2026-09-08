import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_KEY, ADMIN_SESSION_TOKEN, ADMIN_EMAIL } from "@/lib/courses-db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY)?.value;

    if (session === ADMIN_SESSION_TOKEN) {
      return NextResponse.json({
        authenticated: true,
        user: { email: ADMIN_EMAIL, role: "admin" },
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error("Error checking auth:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
