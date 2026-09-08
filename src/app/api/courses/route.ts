import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getCourses,
  createCourse,
  getActiveTerm,
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_TOKEN,
} from "@/lib/courses-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("all") === "true";
    const courses = await getCourses();

    if (includeInactive) {
      return NextResponse.json(courses);
    }

    // Default to active courses in the currently active term for public views
    const activeTerm = await getActiveTerm();
    const publicCourses = courses.filter(
      (c) => c.active && c.term.toLowerCase() === activeTerm.toLowerCase(),
    );

    return NextResponse.json(publicCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY)?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.price) {
      return NextResponse.json({ error: "Title and price are required" }, { status: 400 });
    }

    const created = await createCourse(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
