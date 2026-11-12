/** Quản lý phát nhạc nền hào hùng (BGM) xuyên suốt ứng dụng */
let audioInstance: HTMLAudioElement | null = null;
let isPlaying = false;
const listeners = new Set<(playing: boolean) => void>();

export function getBgmState(): boolean {
  return isPlaying;
}

export function toggleBgm(): boolean {
  if (typeof window === "undefined") return false;
  if (!audioInstance) {
    audioInstance = new Audio("/audio/bgm-heroic.ogg");
    audioInstance.loop = true;
    audioInstance.volume = 0.4;
  }

  if (isPlaying) {
    audioInstance.pause();
    isPlaying = false;
  } else {
    audioInstance.play().catch(() => {
      // Trình duyệt có thể chặn autoplay nếu chưa có tương tác người dùng
      isPlaying = false;
    });
    isPlaying = true;
  }

  listeners.forEach((fn) => fn(isPlaying));
  return isPlaying;
}

export function subscribeBgm(fn: (playing: boolean) => void): () => void {
  listeners.add(fn);
  fn(isPlaying);
  return () => {
    listeners.delete(fn);
  };
}
