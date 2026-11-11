import type { Milestone } from "./types";

/** Chuyển "03/02/1930" | "12/1986" | "1930" thành khóa so sánh năm→tháng→ngày. */
export function milestoneSortKey(dateStr: string): number {
  const parts = dateStr.split("/").map((p) => Number.parseInt(p, 10));
  let day = 0;
  let month = 0;
  let year = 0;
  if (parts.length === 3) [day, month, year] = parts;
  else if (parts.length === 2) [month, year] = parts;
  else [year] = parts;
  return year * 10000 + (month || 0) * 100 + (day || 0);
}

export function sortMilestonesChronologically(milestones: Milestone[]): Milestone[] {
  return milestones
    .slice()
    .sort((a, b) => milestoneSortKey(a.dateStr) - milestoneSortKey(b.dateStr));
}

export interface TimelineGameStats {
  best: number;
  rounds: number;
  perfect: number;
}

export const INITIAL_TIMELINE_STATS: TimelineGameStats = {
  best: 0,
  rounds: 0,
  perfect: 0
};
