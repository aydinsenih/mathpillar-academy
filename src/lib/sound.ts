// Native Web Audio API Sound Utility for MathPillar Academy
// Generates cheerful, positive harmonic chime notes with zero external audio assets

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a sequence of pleasant, uplifting musical notes (C5 - E5 - G5 - C6 arpeggio)
 * giving positive immediate tactile feedback when exploring courses.
 */
export function playPositiveChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Frequencies for a cheerful major arpeggio: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft, bell-like sine/triangle wave blend
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.07);

      // Volume envelope: quick attack, smooth exponential decay
      const noteStart = now + index * 0.07;
      const noteEnd = noteStart + 0.35;

      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteEnd);
    });
  } catch {
    // Graceful fallback if Web Audio is unsupported or blocked by browser policy
  }
}
