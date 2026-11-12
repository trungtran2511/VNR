import { useState, useEffect, useRef } from "react";
import BookShelf3D, { BOOKS_COLLECTION, type BookItem } from "./components/BookShelf3D";
import ChapterView from "./components/ChapterView";
import TimelineView from "./components/TimelineView";
import ComparisonView from "./components/ComparisonView";
import QuizView from "./components/QuizView";
import FlashcardsView from "./components/FlashcardsView";
import TimelineGameView from "./components/TimelineGameView";
import MockExamView from "./components/MockExamView";
import EventLessonView from "./components/EventLessonView";
import MapView from "./components/MapView";
import MindmapView from "./components/MindmapView";
import CongressView from "./components/CongressView";
import CrosswordView from "./components/CrosswordView";
import CheatSheetView from "./components/CheatSheetView";
import MatchGameView from "./components/MatchGameView";
import GuessGameView from "./components/GuessGameView";
import { EVENT_LESSONS } from "./lib/eventLessons";
import { AppButton, AppLink } from "./components/ui/app-button";
import { SegmentedControl } from "./components/ui/segmented-control";
import { SearchField } from "./components/ui/search-field";
import {
  CHAPTERS_DATA,
  MILESTONES_DATA,
  COMPARISONS_DATA
} from "./lib/lichSuDangData";
import type { StudyMode } from "./lib/types";
import { applyMotionPref, getMotionPref } from "./lib/motion";
import {
  ExternalLink,
  ArrowLeft,
  BookOpen,
  Clock,
  Layers,
  FileCheck2,
  GripVertical,
  ScrollText,
  Puzzle,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Network,
  Landmark,
  Grid3x3,
  Printer,
  Timer,
  Sparkles
} from "lucide-react";

// Mỗi cuốn trên kệ mở thẳng tới mục kiến thức riêng của nó.
const BOOK_FOCUS: Record<string, string> = {
  intro: "intro-1",
  "ch1-founding": "ch1-1",
  "ch1-democracy": "ch1-3",
  "ch1-vietminh": "ch1-4",
  ch1: "ch1-5",
  ch2: "ch2-1",
  "ch2-tworegions": "ch2-2",
  "ch2-1975": "ch2-3",
  ch3: "ch3-2"
};

type ModeDef = { mode: StudyMode; label: string; icon: typeof BookOpen };

const TOOL_MODES: ModeDef[] = [
  { mode: "map", label: "BẢN ĐỒ", icon: MapPin },
  { mode: "mindmap", label: "SƠ ĐỒ TƯ DUY", icon: Network },
  { mode: "congress", label: "ĐẠI HỘI", icon: Landmark },
  { mode: "cheatsheet", label: "CẨM NANG", icon: Printer }
];

const PLAY_MODES: ModeDef[] = [
  { mode: "flashcards", label: "FLASHCARDS", icon: Layers },
  { mode: "timelineGame", label: "XẾP MỐC SỬ", icon: GripVertical },
  { mode: "match", label: "GHÉP CẶP", icon: Puzzle },
  { mode: "guess", label: "ĐOÁN SỰ KIỆN", icon: Search },
  { mode: "crossword", label: "Ô CHỮ", icon: Grid3x3 },
  { mode: "mockExam", label: "THI THỬ", icon: Timer }
];

export default function App() {
  const [activeReadingBook, setActiveBook] = useState<BookItem | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>("read");
  const [motionFull, setMotionFull] = useState(() => getMotionPref() === "full");
  useEffect(() => {
    applyMotionPref(motionFull ? "full" : "auto");
  }, [motionFull]);
  const [openingCover, setOpeningCover] = useState<BookItem | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [focusSection, setFocusSection] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const viewKey = `${studyMode}-${activeReadingBook?.id ?? ""}`;
  useEffect(() => {
    if (!focusSection) mainRef.current?.scrollTo({ top: 0 });
  }, [viewKey, focusSection]);
  const setActiveReadingBook = (book: BookItem | null, focus: string | null = null) => {
    setStudyMode(book && EVENT_LESSONS[book.id] ? "lesson" : "read");
    setFocusSection(focus);
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
              sectionId: sec.id,
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

  const bookIndex = activeReadingBook
    ? BOOKS_COLLECTION.findIndex((b) => b.id === activeReadingBook.id)
    : -1;
  const goBook = (delta: number) => {
    if (bookIndex < 0) return;
    const n = BOOKS_COLLECTION.length;
    setActiveReadingBook(BOOKS_COLLECTION[(bookIndex + delta + n) % n]);
  };
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onArrow = (e: KeyboardEvent) => {
      if (bookIndex < 0 || (studyMode !== "lesson" && studyMode !== "read")) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const n = BOOKS_COLLECTION.length;
      const delta = e.key === "ArrowRight" ? 1 : -1;
      setActiveReadingBook(BOOKS_COLLECTION[(bookIndex + delta + n) % n]);
    };
    window.addEventListener("keydown", onArrow);
    return () => window.removeEventListener("keydown", onArrow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIndex, studyMode]);

  const currentChapter =
    activeReadingBook && activeReadingBook.category === "chapter"
      ? CHAPTERS_DATA.find((c) => c.id === activeReadingBook.chapterId) ||
        CHAPTERS_DATA[0]
      : CHAPTERS_DATA[0];

  // When on the 3D Curved VHS Archive hero, render full-screen without extra chrome
  if (!activeReadingBook) {
    return (
      <>
        <BookShelf3D
          onOpenBook={(book) => {
            setOpeningCover(book);
            setActiveReadingBook(book, BOOK_FOCUS[book.id] ?? null);
          }}
        />
        </>
    );
  }

  return (
    <div className="app-shell relative h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground antialiased select-text">
      {/* Background Lưới (Grid) chung theo ảnh mẫu & Quầng sáng ánh nâu ấm trầm đồng bộ Dashboard */}
      <div aria-hidden="true" className="screen-archive-grid-bg" />
      <div aria-hidden="true" className="screen-archive-vintage-tint" />
      <div aria-hidden="true" className="screen-archive-radial-glow" />
      <div aria-hidden="true" className="cinematic-vignette opacity-50 pointer-events-none" />
      {/* Paper Grain Overlay */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
        style={{ mixBlendMode: "multiply", opacity: 0.1 }}
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

      {/* Bìa sách lật mở khi vào trang đọc */}
      {openingCover && (
        <div
          aria-hidden="true"
          className="book-open-cover"
          style={{ background: `linear-gradient(90deg, ${openingCover.themeBgDark}, ${openingCover.themeBg})`, color: openingCover.themePaper }}
          onAnimationEnd={() => setOpeningCover(null)}
        >
          <span className="font-display text-3xl md:text-5xl font-semibold px-8 text-center">{openingCover.title}</span>
        </div>
      )}

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
                      setActiveReadingBook(matched, res.sectionId);
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

          <AppButton
            variant={motionFull ? "primary" : "outline"}
            size="xs"
            className="hidden sm:inline-flex"
            aria-pressed={motionFull}
            title="Bật hiệu ứng chuyển động, kể cả khi hệ điều hành đang tắt animation"
            onClick={() => setMotionFull((v) => !v)}
            icon={<Sparkles className="size-3" strokeWidth={1.5} />}
          >
            HIỆU ỨNG
          </AppButton>

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

      <div className="reading-progress" aria-hidden="true"><div ref={progressRef} /></div>

      <div className="xl:hidden flex-shrink-0 border-b border-border bg-card/80 px-4 py-2 z-30">
        <label className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="shrink-0">Đang xem</span>
          <select
            aria-label="Chọn chương hoặc chuyên mục"
            value={activeReadingBook.category === "chapter" ? activeReadingBook.chapterId : activeReadingBook.category}
            onChange={(event) => {
              const book = BOOKS_COLLECTION.find((item) => item.category === "chapter" ? item.chapterId === event.target.value : item.category === event.target.value);
              if (book) setActiveReadingBook(book);
            }}
            className="min-w-0 flex-1 rounded-md border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-primary"
          >
            {CHAPTERS_DATA.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.code} — {chapter.title}</option>)}
            <option value="timeline">Biên niên sử</option>
            <option value="compare">Đối chiếu văn kiện</option>
            <option value="quiz">Trắc nghiệm</option>
          </select>
        </label>
      </div>

      {/* Study Mode Bar: Đọc / Flashcards / Kéo thả / Thi thử */}
      <div className="h-[var(--control-h-lg)] border-b border-border bg-card/60 px-4 md:px-9 flex items-center gap-3 overflow-x-auto flex-shrink-0 z-30">
        <span className="lbl text-muted-foreground hidden xl:inline">HỌC</span>
        {(() => {
          const toItems = (defs: ModeDef[]) =>
            defs.map((m) => {
              const Icon = m.icon;
              return {
                key: m.mode,
                label: m.label,
                icon: <Icon className="size-3" strokeWidth={1.5} />,
                active: studyMode === m.mode,
                onSelect: () => setStudyMode(m.mode)
              };
            });
          const learn: ModeDef[] = [
            ...(EVENT_LESSONS[activeReadingBook.id]
              ? [{ mode: "lesson" as StudyMode, label: "BÀI CHI TIẾT", icon: ScrollText }]
              : []),
            { mode: "read" as StudyMode, label: activeReadingBook.category === "chapter" ? "TÓM LƯỢC CHƯƠNG" : "ĐỌC", icon: BookOpen }
          ];
          return (
            <>
              <SegmentedControl ariaLabel="Học" items={toItems(learn)} className="shrink-0" />
              <span className="lbl text-muted-foreground hidden lg:inline">TRA CỨU</span>
              <SegmentedControl ariaLabel="Tra cứu" items={toItems(TOOL_MODES)} className="shrink-0" />
              <span className="lbl text-muted-foreground hidden lg:inline">CHƠI</span>
              <SegmentedControl ariaLabel="Chơi và luyện tập" items={toItems(PLAY_MODES)} className="shrink-0" />
            </>
          );
        })()}

        <div className="ml-auto flex items-center gap-1 shrink-0">
          <AppButton
            variant="outline"
            size="xs"
            onClick={() => goBook(-1)}
            title="Cuốn trước (phím ←)"
            aria-label="Cuốn trước"
            icon={<ChevronLeft className="size-3" strokeWidth={1.5} />}
          />
          <span className="lbl text-muted-foreground px-1.5 tabular-nums">
            {bookIndex + 1}/{BOOKS_COLLECTION.length}
          </span>
          <AppButton
            variant="outline"
            size="xs"
            onClick={() => goBook(1)}
            title="Cuốn kế (phím →)"
            aria-label="Cuốn kế"
            icon={<ChevronRight className="size-3" strokeWidth={1.5} />}
          />
        </div>
      </div>

      {/* Nội dung học: Flashcards chiếm trọn vùng còn lại, không cuộn trang */}
      <main
        ref={mainRef}
        onTouchStart={(e) => {
          touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const s0 = touchStart.current;
          touchStart.current = null;
          if (!s0 || (studyMode !== "lesson" && studyMode !== "read")) return;
          const dx = e.changedTouches[0].clientX - s0.x;
          const dy = e.changedTouches[0].clientY - s0.y;
          if (Math.abs(dx) > 90 && Math.abs(dy) < 60) goBook(dx < 0 ? 1 : -1);
        }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const max = el.scrollHeight - el.clientHeight;
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
        }}
        className={
          studyMode === "flashcards"
            ? "flex-1 min-h-0 overflow-hidden p-2 md:p-4 z-20"
            : "flex-1 overflow-y-auto px-4 md:px-10 py-8 md:py-12 z-20"
        }
      >
        <div key={`${studyMode}-${activeReadingBook.id}`} className="view-enter h-full">
        {studyMode === "flashcards" && (
          <FlashcardsView chapters={CHAPTERS_DATA} milestones={MILESTONES_DATA} />
        )}

        {studyMode === "lesson" && EVENT_LESSONS[activeReadingBook.id] && (
          <EventLessonView
            lesson={EVENT_LESSONS[activeReadingBook.id]}
            bookTitle={activeReadingBook.title}
            onOpenSummary={() => {
              setFocusSection(EVENT_LESSONS[activeReadingBook.id].sectionId ?? null);
              setStudyMode("read");
            }}
          />
        )}

        {studyMode === "map" && <MapView />}

        {studyMode === "mindmap" && <MindmapView />}

        {studyMode === "congress" && <CongressView />}

        {studyMode === "crossword" && <CrosswordView />}

        {studyMode === "cheatsheet" && <CheatSheetView milestones={MILESTONES_DATA} />}

        {studyMode === "match" && <MatchGameView milestones={MILESTONES_DATA} />}

        {studyMode === "guess" && <GuessGameView milestones={MILESTONES_DATA} />}

        {studyMode === "timelineGame" && <TimelineGameView milestones={MILESTONES_DATA} />}

        {studyMode === "mockExam" && <MockExamView chapters={CHAPTERS_DATA} />}

        {studyMode === "read" && activeReadingBook.category === "chapter" && (
          <ChapterView chapter={currentChapter} focusSectionId={focusSection} />
        )}

        {studyMode === "read" && activeReadingBook.category === "timeline" && (
          <TimelineView
            milestones={MILESTONES_DATA}
            onOpenChapter={(code) => {
              const id = { "Chương 1": "ch1", "Chương 2": "ch2", "Chương 3": "ch3" }[code];
              const book = BOOKS_COLLECTION.find((b) => b.category === "chapter" && b.chapterId === id);
              if (book) setActiveReadingBook(book);
            }}
          />
        )}

        {studyMode === "read" && activeReadingBook.category === "compare" && (
          <ComparisonView comparisons={COMPARISONS_DATA} />
        )}

        {studyMode === "read" && activeReadingBook.category === "quiz" && (
          <QuizView chapters={CHAPTERS_DATA} />
        )}
        </div>
      </main>
    </div>
  );
}
