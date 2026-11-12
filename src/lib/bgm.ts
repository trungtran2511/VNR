/**
 * Quản lý phát nhạc nền BGM xuyên suốt ứng dụng
 * Bài hát: Mashup Còn Gì Đẹp Hơn x Nhà Tôi Có Treo Một Lá Cờ - Noo Phước Thịnh x DTAP (Làn Sóng Xanh)
 * Đảm bảo Singleton 100% trên window để không bao giờ bị chèn 2 bài cùng lúc.
 */

declare global {
  interface Window {
    __VNR_BGM_AUDIO__?: HTMLAudioElement;
  }
}

const listeners = new Set<(playing: boolean) => void>();

function getOrCreateAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!window.__VNR_BGM_AUDIO__) {
    const audio = new Audio("/audio/bgm-con-gi-dep-hon.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.addEventListener("play", () => {
      listeners.forEach((fn) => fn(true));
    });
    audio.addEventListener("pause", () => {
      listeners.forEach((fn) => fn(false));
    });
    audio.addEventListener("ended", () => {
      listeners.forEach((fn) => fn(false));
    });
    window.__VNR_BGM_AUDIO__ = audio;
  }
  return window.__VNR_BGM_AUDIO__;
}

export function getBgmState(): boolean {
  if (typeof window === "undefined" || !window.__VNR_BGM_AUDIO__) return false;
  return !window.__VNR_BGM_AUDIO__.paused;
}

export function toggleBgm(): boolean {
  const audio = getOrCreateAudio();
  if (!audio) return false;

  if (!audio.paused) {
    audio.pause();
    listeners.forEach((fn) => fn(false));
    return false;
  } else {
    // Tạm dừng mọi audio khác nếu có
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((a) => {
      if (a !== audio) a.pause();
    });

    audio.play().catch(() => {
      listeners.forEach((fn) => fn(false));
    });
    listeners.forEach((fn) => fn(true));
    return true;
  }
}

export function subscribeBgm(fn: (playing: boolean) => void): () => void {
  listeners.add(fn);
  fn(getBgmState());
  return () => {
    listeners.delete(fn);
  };
}
