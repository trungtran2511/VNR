/** Âm báo ngắn tạo bằng Web Audio (không cần file âm thanh). */
export function playChime(kind: "ok" | "win") {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const notes = kind === "win" ? [523.25, 659.25, 783.99, 1046.5] : [660];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      const t = ctx.currentTime + i * 0.14;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.32);
    });
    window.setTimeout(() => void ctx.close(), 1500);
  } catch {
    /* trình duyệt chặn âm thanh: bỏ qua */
  }
}
