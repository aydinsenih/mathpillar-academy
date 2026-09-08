import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_KEY } from "@/lib/courses-db";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_KEY);
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
