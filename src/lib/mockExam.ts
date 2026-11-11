import type { Chapter } from "./types";
import { shuffle } from "./shuffle";

export const MAX_EXAM_QUESTIONS = 40;
export const SECONDS_PER_QUESTION = 60;

export interface ExamOption {
  text: string;
  isCorrect: boolean;
}

export interface ExamQuestion {
  id: string;
  chapterCode: string;
  question: string;
  options: ExamOption[];
  explanation: string;
}

export function buildExam(chapters: Chapter[]): ExamQuestion[] {
  const all = chapters.flatMap((ch) =>
    ch.reviewQuestions.map<ExamQuestion>((q) => ({
      id: q.id,
      chapterCode: ch.code,
      question: q.question,
      explanation: q.explanation,
      options: shuffle(
        q.options.map((text, i) => ({ text, isCorrect: i === q.correctIndex }))
      )
    }))
  );
  return shuffle(all).slice(0, MAX_EXAM_QUESTIONS);
}

export interface ChapterBreakdown {
  chapterCode: string;
  correct: number;
  total: number;
}

export interface ExamResult {
  correct: number;
  total: number;
  /** Thang điểm 10, làm tròn 1 chữ số. */
  score10: number;
  breakdown: ChapterBreakdown[];
}

export function gradeExam(
  questions: ExamQuestion[],
  answers: Record<number, number>
): ExamResult {
  const map = new Map<string, ChapterBreakdown>();
  let correct = 0;

  questions.forEach((q, i) => {
    const row =
      map.get(q.chapterCode) ?? { chapterCode: q.chapterCode, correct: 0, total: 0 };
    row.total += 1;
    const chosen = answers[i];
    if (chosen !== undefined && q.options[chosen]?.isCorrect) {
      row.correct += 1;
      correct += 1;
    }
    map.set(q.chapterCode, row);
  });

  const total = questions.length;
  return {
    correct,
    total,
    score10: total === 0 ? 0 : Math.round((correct / total) * 100) / 10,
    breakdown: Array.from(map.values())
  };
}

export interface ExamAttempt {
  at: number;
  score10: number;
  correct: number;
  total: number;
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}
