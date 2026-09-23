"use client";

import { useEffect } from "react";
import { playPositiveChime } from "@/lib/sound";

export function CourseDetailAudioTrigger() {
  useEffect(() => {
    // Play positive cheerful notes upon opening course details
    const timer = setTimeout(() => {
      playPositiveChime();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
