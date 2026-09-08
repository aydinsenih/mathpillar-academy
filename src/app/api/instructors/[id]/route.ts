import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getInstructorById,
  updateInstructor,
  deleteInstructor,
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_TOKEN,
} from "@/lib/courses-db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const instructor = await getInstructorById(id);
    if (!instructor) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }
    return NextResponse.json(instructor);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return NextResponse.json({ error: "Failed to fetch instructor" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY)?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateInstructor(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating instructor:", error);
    return NextResponse.json({ error: "Failed to update instructor" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY)?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const success = await deleteInstructor(id);

    if (!success) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Instructor deleted successfully" });
  } catch (error) {
    console.error("Error deleting instructor:", error);
    return NextResponse.json({ error: "Failed to delete instructor" }, { status: 500 });
  }
}
