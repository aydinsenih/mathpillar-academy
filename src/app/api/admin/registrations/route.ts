import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getRegistrations,
  saveRegistrations,
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_TOKEN,
} from "@/lib/courses-db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY)?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await getRegistrations();
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY)?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    const registrations = await getRegistrations();
    const index = registrations.findIndex((r) => r.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    registrations[index].status = status;
    await saveRegistrations(registrations);

    return NextResponse.json(registrations[index]);
  } catch (error) {
    console.error("Error updating registration status:", error);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}
