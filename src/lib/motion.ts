const KEY = "vnr-motion";

/** "full" = người dùng chủ động bật hiệu ứng, kể cả khi hệ điều hành bật giảm chuyển động. */
export function getMotionPref(): "full" | "auto" {
  try {
    return window.localStorage.getItem(KEY) === "full" ? "full" : "auto";
  } catch {
    return "auto";
  }
}

export function applyMotionPref(pref: "full" | "auto") {
  if (pref === "full") document.documentElement.dataset.motion = "full";
  else delete document.documentElement.dataset.motion;
  try {
    window.localStorage.setItem(KEY, pref);
  } catch {
    /* bỏ qua */
  }
}

export function prefersReducedMotion(): boolean {
  if (document.documentElement.dataset.motion === "full") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
