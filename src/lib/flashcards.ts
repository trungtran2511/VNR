import type { Chapter, Milestone } from "./types";

export type FlashcardKind = "milestone" | "keypoint" | "question";

export interface Flashcard {
  id: string;
  chapterCode: string;
  kind: FlashcardKind;
  front: string;
  back: string[];
}

export const FLASHCARD_KIND_LABEL: Record<FlashcardKind, string> = {
  milestone: "MỐC SỬ",
  keypoint: "Ý CHÍNH",
  question: "CÂU HỎI"
};

/** Sinh thẻ trực tiếp từ dữ liệu giáo trình, không tự bịa nội dung. */
export function buildFlashcards(
  chapters: Chapter[],
  milestones: Milestone[]
): Flashcard[] {
  const cards: Flashcard[] = [];

  for (const m of milestones) {
    cards.push({
      id: `ms-${m.id}`,
      chapterCode: m.chapterCode,
      kind: "milestone",
      front: m.title,
      back: [`Thời điểm: ${m.dateStr}`, m.description, `Ý nghĩa: ${m.significance}`]
    });
  }

  for (const ch of chapters) {
    for (const sec of ch.sections) {
      if (sec.keyPoints.length === 0) continue;
      cards.push({
        id: `kp-${sec.id}`,
        chapterCode: ch.code,
        kind: "keypoint",
        front: sec.title,
        back: sec.keyPoints
      });
    }
    for (const q of ch.reviewQuestions) {
      cards.push({
        id: `q-${q.id}`,
        chapterCode: ch.code,
        kind: "question",
        front: q.question,
        back: [`Đáp án: ${q.options[q.correctIndex]}`, q.explanation]
      });
    }
  }

  return cards;
}
