import { useState, useEffect } from "react";
import BookShelf3D, { BOOKS_COLLECTION, type BookItem } from "./components/BookShelf3D";
import ChapterView from "./components/ChapterView";
import TimelineView from "./components/TimelineView";
import ComparisonView from "./components/ComparisonView";
import QuizView from "./components/QuizView";
import FlashcardsView from "./components/FlashcardsView";
import TimelineGameView from "./components/TimelineGameView";
import MockExamView from "./components/MockExamView";
import { AppButton, AppLink } from "./components/ui/app-button";
import { SegmentedControl } from "./components/ui/segmented-control";
import { SearchField } from "./components/ui/search-field";
import {
  CHAPTERS_DATA,
  MILESTONES_DATA,
  COMPARISONS_DATA
} from "./lib/lichSuDangData";
import type { StudyMode } from "./lib/types";
import {
  ExternalLink,
  ArrowLeft,
  BookOpen,
  Clock,
  Layers,
  FileCheck2,
  GripVertical,
  Timer
} from "lucide-react";

const STUDY_MODES: { mode: StudyMode; label: string; icon: typeof BookOpen }[] = [
  { mode: "read", label: "ĐỌC GIÁO TRÌNH", icon: BookOpen },
  { mode: "flashcards", label: "FLASHCARDS", icon: Layers },
  { mode: "timelineGame", label: "XẾP MỐC SỬ", icon: GripVertical },
  { mode: "mockExam", label: "THI THỬ", icon: Timer }
];

export default function App() {
  const [activeReadingBook, setActiveBook] = useState<BookItem | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>("read");
  const setActiveReadingBook = (book: BookItem | null) => {
    setStudyMode("read");
    setActiveBook(book);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchResults =
    searchQuery.trim() === ""
      ? []
      : CHAPTERS_DATA.flatMap((ch) =>
          ch.sections
            .filter(
              (sec) =>
                sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sec.content.some((c) =>
                  c.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                sec.keyPoints.some((kp) =>
                  kp.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
            .map((sec) => ({
              chapterId: ch.id,
              chapterCode: ch.code,
              sectionTitle: sec.title,
              snippet: sec.content[0] || ""
            }))
        );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeReadingBook) {
        setActiveReadingBook(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeReadingBook]);

  const currentChapter =
    activeReadingBook && activeReadingBook.category === "chapter"
      ? CHAPTERS_DATA.find((c) => c.id === activeReadingBook.chapterId) ||
        CHAPTERS_DATA[0]
      : CHAPTERS_DATA[0];

  // When on the 3D Curved VHS Archive hero, render full-screen without extra chrome
  if (!activeReadingBook) {
    return <BookShelf3D onOpenBook={(book) => setActiveReadingBook(book)} />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground antialiased select-text">
      {/* Background Lưới (Grid) chung theo ảnh mẫu & Quầng sáng ánh nâu ấm trầm đồng bộ Dashboard */}
      <div aria-hidden="true" className="screen-archive-grid-bg" />
      <div aria-hidden="true" className="screen-archive-vintage-tint" />
      <div aria-hidden="true" className="screen-archive-radial-glow" />
      <div aria-hidden="true" className="cinematic-vignette opacity-50 pointer-events-none" />
      {/* Paper Grain Overlay */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
        style={{ mixBlendMode: "multiply", opacity: 0.45 }}
      >
        <filter id="reader-paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.22 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#reader-paper-grain)" />
      </svg>

      {/* Editorial Catalogue Top Bar */}
      <header className="h-[68px] border-b border-border bg-card px-3 md:px-5 flex items-center justify-between gap-3 flex-shrink-0 z-30">
        <AppButton
          onClick={() => setActiveReadingBook(null)}
          variant="outline"
          size="xs"
          className="shrink-0"
          icon={<ArrowLeft className="size-3" strokeWidth={1.5} />}
        >
          KỆ 3D
        </AppButton>

        {/* Catalogue Chapter & Mode Switcher */}
        <SegmentedControl
          ariaLabel="Chuyển chương và chế độ học"
          items={[
            { label: "NHẬP MÔN", bookIdx: 0, icon: BookOpen },
            { label: "CHƯƠNG 1", bookIdx: 5, icon: BookOpen },
            { label: "CHƯƠNG 2", bookIdx: 6, icon: BookOpen },
            { label: "CHƯƠNG 3", bookIdx: 9, icon: BookOpen },
            { label: "NIÊN BIỂU", bookIdx: 10, icon: Clock },
            { label: "TRẮC NGHIỆM", bookIdx: 11, icon: FileCheck2 }
          ].map((item) => {
            const target = BOOKS_COLLECTION[item.bookIdx];
            const Icon = item.icon;
            return {
              key: item.label,
              label: item.label,
              icon: <Icon className="size-3" strokeWidth={1.5} />,
              active:
                studyMode === "read" &&
                activeReadingBook.category === target.category &&
                (target.category !== "chapter" ||
                  activeReadingBook.chapterId === target.chapterId),
              onSelect: () => setActiveReadingBook(target)
            };
          })}
          className="hidden xl:inline-flex shrink-0 [&_button]:px-2 [&_button]:gap-1.5"
        />

        {/* Search & PDF Link */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-40 md:w-52">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Tra cứu thuật ngữ, mốc sử..."
            />

            {searchResults.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] right-0 w-80 md:w-96 max-h-80 overflow-y-auto rounded-[var(--radius-surface)] border border-[var(--border-control-strong)] bg-card z-50 divide-y divide-border">
                <div className="lbl text-muted-foreground px-3 py-2 bg-muted">
                  TÌM THẤY {searchResults.length} KẾT QUẢ TRONG GIÁO TRÌNH
                </div>
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const matched =
                        BOOKS_COLLECTION.find(
                          (b) =>
                            b.category === "chapter" &&
                            b.chapterId === res.chapterId
                        ) || BOOKS_COLLECTION[0];
                      setActiveReadingBook(matched);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-3 hover:bg-muted transition-colors space-y-1"
                  >
                    <div className="lbl text-primary">{res.chapterCode}</div>
                    <div className="text-xs font-semibold text-foreground">
                      {res.sectionTitle}
                    </div>
                    <div className="text-xs font-serif text-muted-foreground line-clamp-2">
                      {res.snippet}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <AppLink
            href="/LỊCH SỬ ĐẢNG 221TR - 2026.pdf"
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="xs"
            className="hidden sm:inline-flex"
            iconRight={<ExternalLink className="size-3" strokeWidth={1.5} />}
          >
            PDF GỐC
          </AppLink>
        </div>
      </header>

      {/* Study Mode Bar: Đọc / Flashcards / Kéo thả / Thi thử */}
      <div className="h-[var(--control-h-lg)] border-b border-border bg-card/60 px-4 md:px-9 flex items-center gap-3 overflow-x-auto flex-shrink-0 z-30">
        <span className="lbl text-muted-foreground hidden md:inline">CHẾ ĐỘ HỌC</span>
        <SegmentedControl
          ariaLabel="Chọn chế độ học"
          items={STUDY_MODES.map((m) => {
            const Icon = m.icon;
            return {
              key: m.mode,
              label: m.label,
              icon: <Icon className="size-3" strokeWidth={1.5} />,
              active: studyMode === m.mode,
              onSelect: () => setStudyMode(m.mode)
            };
          })}
        />
      </div>

      {/* Nội dung học: Flashcards chiếm trọn vùng còn lại, không cuộn trang */}
      <main
        className={
          studyMode === "flashcards"
            ? "flex-1 min-h-0 overflow-hidden p-2 md:p-4 z-20"
            : "flex-1 overflow-y-auto px-4 md:px-10 py-8 md:py-12 z-20"
        }
      >
        {studyMode === "flashcards" && (
          <FlashcardsView chapters={CHAPTERS_DATA} milestones={MILESTONES_DATA} />
        )}

        {studyMode === "timelineGame" && <TimelineGameView milestones={MILESTONES_DATA} />}

        {studyMode === "mockExam" && <MockExamView chapters={CHAPTERS_DATA} />}

        {studyMode === "read" && activeReadingBook.category === "chapter" && (
          <ChapterView chapter={currentChapter} />
        )}

        {studyMode === "read" && activeReadingBook.category === "timeline" && (
          <TimelineView milestones={MILESTONES_DATA} />
        )}

        {studyMode === "read" && activeReadingBook.category === "compare" && (
          <ComparisonView comparisons={COMPARISONS_DATA} />
        )}

        {studyMode === "read" && activeReadingBook.category === "quiz" && (
          <QuizView chapters={CHAPTERS_DATA} />
        )}
      </main>
    </div>
  );
}
