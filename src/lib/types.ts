export interface LessonSection {
  id: string;
  title: string;
  content: string[];
  keyPoints: string[];
  historicalEvents?: {
    date: string;
    event: string;
    significance: string;
  }[];
}

export interface Chapter {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  sections: LessonSection[];
  reviewQuestions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Milestone {
  id: string;
  year: string;
  dateStr: string;
  title: string;
  chapterCode: string;
  description: string;
  significance: string;
}

export interface DocumentComparison {
  id: string;
  title: string;
  period: string;
  aspects: {
    criteria: string;
    docA: { name: string; content: string };
    docB: { name: string; content: string };
    analysis: string;
  }[];
}

export type StudyMode = "lesson" | "read" | "flashcards" | "timelineGame" | "match" | "guess" | "mockExam" | "map" | "mindmap" | "congress" | "crossword" | "cheatsheet";
