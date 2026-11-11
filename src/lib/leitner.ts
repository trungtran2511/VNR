/** Lặp lại ngắt quãng kiểu Leitner: 5 hộp, thẻ đúng thì lên hộp và giãn lịch ôn. */

export type Rating = "hard" | "review" | "known";

export interface CardProgress {
  box: number;
  due: number;
}

export type ProgressMap = Record<string, CardProgress>;

export const MAX_BOX = 4;
const DAY_MS = 24 * 60 * 60 * 1000;
/** Số ngày chờ tương ứng hộp 0..4. */
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 14];

export function applyRating(
  prev: CardProgress | undefined,
  rating: Rating,
  now: number
): CardProgress {
  const box = prev?.box ?? 0;

  if (rating === "hard") return { box: 0, due: now };
  if (rating === "review") {
    const next = Math.max(1, box);
    return { box: next, due: now + BOX_INTERVAL_DAYS[next] * DAY_MS };
  }
  const next = Math.min(MAX_BOX, box + 1);
  return { box: next, due: now + BOX_INTERVAL_DAYS[next] * DAY_MS };
}

export function isDue(p: CardProgress | undefined, now: number): boolean {
  return !p || p.due <= now;
}

export type CardStatus = "new" | "learning" | "mastered";

export function statusOf(p: CardProgress | undefined): CardStatus {
  if (!p) return "new";
  return p.box >= 3 ? "mastered" : "learning";
}
