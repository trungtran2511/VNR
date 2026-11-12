import { useCallback, useEffect, useMemo, useState } from "react";
import { Layers, RotateCcw, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import type { Chapter, Milestone } from "../lib/types";
import { buildFlashcards, FLASHCARD_KIND_LABEL } from "../lib/flashcards";
import {
  applyRating,
  isDue,
  statusOf,
  type ProgressMap,
  type Rating
} from "../lib/leitner";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";

interface FlashcardsViewProps {
  chapters: Chapter[];
  milestones: Milestone[];
}

const ALL = "ALL";
const FACE =
  "absolute inset-0 flex flex-col rounded-[var(--radius-surface)] border border-[var(--border-control-strong)] bg-card p-6 md:p-8 [backface-visibility:hidden]";

export default function FlashcardsView({ chapters, milestones }: FlashcardsViewProps) {
  const cards = useMemo(() => buildFlashcards(chapters, milestones), [chapters, milestones]);
  const [progress, setProgress, resetProgress] = usePersistentState<ProgressMap>(
    "lsd.flashcards.progress.v1",
    {}
  );
  const [filter, setFilter] = useState<string>(ALL);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [introExpanded, setIntroExpanded] = useState(true);

  const chapterCodes = useMemo(
    () => Array.from(new Set(cards.map((c) => c.chapterCode))),
    [cards]
  );

  const scoped = useMemo(
    () => (filter === ALL ? cards : cards.filter((c) => c.chapterCode === filter)),
    [cards, filter]
  );

  const now = Date.now();
  const queue = useMemo(
    () =>
      scoped
        .filter((c) => isDue(progress[c.id], now))
        .sort((a, b) => (progress[a.id]?.due ?? 0) - (progress[b.id]?.due ?? 0)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scoped, progress]
  );

  const counts = useMemo(() => {
    const c = { new: 0, learning: 0, mastered: 0 };
    for (const card of scoped) c[statusOf(progress[card.id])] += 1;
    return c;
  }, [scoped, progress]);

  const current = queue[0];
  const flipped = current !== undefined && flippedId === current.id;

  const flip = useCallback(() => {
    if (!current) return;
    setFlippedId((id) => (id === current.id ? null : current.id));
  }, [current]);

  const rate = useCallback(
    (rating: Rating) => {
      if (!current || flippedId !== current.id) return;
      setProgress((prev) => ({
        ...prev,
        [current.id]: applyRating(prev[current.id], rating, Date.now())
      }));
      setFlippedId(null);
    },
    [current, flippedId, setProgress]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "1") rate("hard");
      else if (e.key === "2") rate("review");
      else if (e.key === "3") rate("known");
      else if ((e.key === " " || e.key === "Enter") && tag !== "BUTTON") {
        e.preventDefault();
        flip();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [flip, rate]);

  return (
    <div className="flex h-full min-h-0 w-full gap-3 md:gap-4">
      <aside
        className={`relative flex min-h-0 shrink-0 flex-col rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card/75 p-3 transition-[width] duration-150 ${
          sidebarCollapsed ? "w-14" : "w-[min(42vw,280px)] md:w-[260px]"
        }`}
        aria-label="Bộ lọc thẻ ghi nhớ"
      >
        <div className="flex items-center justify-between gap-2">
          {!sidebarCollapsed && <span className="lbl text-primary">FLASHCARDS</span>}
          <button
            type="button"
            onClick={() => setSidebarCollapsed((value) => !value)}
            className="ml-auto rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={sidebarCollapsed ? "Mở bộ lọc" : "Thu gọn bộ lọc"}
            title={sidebarCollapsed ? "Mở bộ lọc" : "Thu gọn bộ lọc"}
          >
            {sidebarCollapsed ? <ChevronRight className="size-4" strokeWidth={1.5} /> : <ChevronLeft className="size-4" strokeWidth={1.5} />}
          </button>
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="mt-3 border-b border-border pb-3">
              <button
                type="button"
                onClick={() => setIntroExpanded((value) => !value)}
                aria-expanded={introExpanded}
                className="flex w-full items-center justify-between gap-2 text-left"
              >
                <span className="font-semibold leading-tight text-primary">Thẻ ghi nhớ lịch sử</span>
                {introExpanded ? <ChevronUp className="size-4 shrink-0" strokeWidth={1.5} /> : <ChevronDown className="size-4 shrink-0" strokeWidth={1.5} />}
              </button>
              {introExpanded && (
                <p className="mt-2 font-body text-xs italic leading-relaxed text-muted-foreground">
                  Ôn theo lịch giãn cách, thẻ khó sẽ quay lại sớm hơn.
                </p>
              )}
            </div>

            <div className="mt-3 space-y-2">
              <p className="lbl text-muted-foreground">LỌC THEO CHƯƠNG</p>
              <div className="flex flex-col gap-1">
                {[ALL, ...chapterCodes].map((code) => {
                  const active = filter === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setFilter(code);
                        setFlippedId(null);
                      }}
                      className={`w-full rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                        active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {code === ALL ? "TẤT CẢ THẺ" : code.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto border-t border-border pt-3" aria-live="polite">
              <p className="lbl mb-2 text-muted-foreground">TIẾN ĐỘ</p>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="box lbl justify-start text-muted-foreground">MỚI {counts.new}</span>
                <span className="box lbl justify-start text-foreground">ĐANG HỌC {counts.learning}</span>
                <span className="box lbl justify-start text-success border-success">ĐÃ NHỚ {counts.mastered}</span>
                <span className="box lbl justify-start text-primary border-primary">ĐẾN HẠN {queue.length}</span>
              </div>
            </div>
          </>
        )}
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-3 md:gap-4">
        {current ? (
          <>
            <div className="flex w-full max-w-4xl items-center justify-between px-1">
              <span className="lbl text-muted-foreground">{flipped ? "MẶT ĐÁP ÁN" : "THẺ ĐANG ÔN"}</span>
              <span className="lbl text-primary">{queue.length} THẺ ĐẾN HẠN</span>
            </div>

            <button
              type="button"
              onClick={flip}
              aria-label={flipped ? "Lật về mặt trước" : "Lật thẻ xem đáp án"}
              className="block h-[min(48vh,420px)] min-h-[230px] w-full max-w-4xl [perspective:1400px] cursor-pointer rounded-[var(--radius-surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <div
                className="relative h-full w-full transition-transform duration-[400ms] motion-reduce:transition-none [transform-style:preserve-3d]"
                style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
              >
                <div className={`${FACE} items-center justify-center text-center`}>
                  <span className="box lbl mb-4 text-primary border-primary">
                    {FLASHCARD_KIND_LABEL[current.kind]} • {current.chapterCode.toUpperCase()}
                  </span>
                  <p
                    className="max-w-[42ch] font-semibold leading-snug text-foreground"
                    style={{ fontSize: "clamp(19px, 2.2vw, 30px)" }}
                  >
                    {current.front}
                  </p>
                  <span className="lbl mt-6 text-muted-foreground">NHẤN SPACE HOẶC CHẠM ĐỂ LẬT</span>
                </div>

                <div
                  className={`${FACE} overflow-y-auto bg-muted text-left`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="lbl mb-3 text-primary">ĐÁP ÁN / Ý NGHĨA</span>
                  <ul className="space-y-2.5 font-body text-sm leading-relaxed text-foreground md:text-base">
                    {current.back.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              </div>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <AppButton variant="outline" size="sm" disabled={!flipped} onClick={() => rate("hard")}>1 · KHÓ</AppButton>
              <AppButton variant="outline" size="sm" disabled={!flipped} onClick={() => rate("review")}>2 · CẦN ÔN</AppButton>
              <AppButton variant="primary" size="sm" disabled={!flipped} onClick={() => rate("known")}>3 · ĐÃ NHỚ</AppButton>
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card p-6 text-center">
            <Layers className="mx-auto size-8 text-primary" strokeWidth={1.5} />
            <h2 className="mt-3 text-lg font-semibold text-foreground">Hết thẻ đến hạn trong phạm vi này</h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Bạn đã ôn xong. Các thẻ còn lại sẽ quay lại theo lịch giãn cách.
            </p>
            <AppButton
              className="mt-4"
              variant="outline"
              size="sm"
              icon={<RotateCcw className="size-3" strokeWidth={1.5} />}
              onClick={() => {
                resetProgress();
                setFlippedId(null);
              }}
            >
              HỌC LẠI TỪ ĐẦU
            </AppButton>
          </div>
        )}
      </section>
    </div>
  );
}
