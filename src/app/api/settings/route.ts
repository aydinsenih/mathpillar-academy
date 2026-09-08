import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSettings,
  saveSettings,
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_TOKEN,
  AppSettings,
} from "@/lib/courses-db";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error reading settings:", error);
    return NextResponse.json(
      {
        activeTerm: "Fall",
        countdownTag: "Upcoming Term",
        countdownTitle: "FALL COURSES",
        countdownSubtitle: "STARTING SEPTEMBER 8, 2026",
        countdownTargetDate: "2026-09-08T00:00:00",
      },
      { status: 500 },
    );
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
    const updates: Partial<AppSettings> = {};

    if (typeof body.activeTerm === "string" && body.activeTerm.trim()) {
      updates.activeTerm = body.activeTerm.trim();
    }
    if (typeof body.countdownTag === "string") {
      updates.countdownTag = body.countdownTag.trim();
    }
    if (typeof body.countdownTitle === "string") {
      updates.countdownTitle = body.countdownTitle.trim();
    }
    if (typeof body.countdownSubtitle === "string") {
      updates.countdownSubtitle = body.countdownSubtitle.trim();
    }
    if (typeof body.countdownTargetDate === "string") {
      updates.countdownTargetDate = body.countdownTargetDate.trim();
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid settings fields provided" }, { status: 400 });
    }

    const updated = await saveSettings(updates);

    return NextResponse.json({
      success: true,
      settings: updated,
      activeTerm: updated.activeTerm,
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
