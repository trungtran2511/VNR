import { useEffect, useState, useMemo } from "react";
import { RotateCcw, Trophy, Shuffle } from "lucide-react";
import type { Milestone } from "../lib/types";
import { shuffle } from "../lib/shuffle";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";
import { SegmentedControl } from "./ui/segmented-control";

interface Card {
  id: string;
  pair: string;
  kind: "year" | "event";
  text: string;
}

const PAIR_OPTIONS = [
  { count: 6, label: "6 CẶP (12 THẺ)" },
  { count: 8, label: "8 CẶP (16 THẺ)" },
  { count: 10, label: "10 CẶP (20 THẺ)" }
];

function deal(milestones: Milestone[], pairCount: number): Card[] {
  const seen = new Set<string>();
  // Ưu tiên các mốc có năm phân biệt để dễ nhận diện
  let picks = shuffle(milestones).filter((m) => {
    if (seen.has(m.year)) return false;
    seen.add(m.year);
    return true;
  });

  // Nếu số năm phân biệt chưa đủ, nạp thêm các mốc khác
  if (picks.length < pairCount) {
    const pickIds = new Set(picks.map((m) => m.id));
    const remaining = shuffle(milestones.filter((m) => !pickIds.has(m.id)));
    picks = [...picks, ...remaining].slice(0, pairCount);
  } else {
    picks = picks.slice(0, pairCount);
  }

  // Nếu có mốc trùng năm, hiển thị dateStr (tháng/năm hoặc ngày/tháng/năm) để không nhầm
  const yearCounts = picks.reduce<Record<string, number>>((acc, m) => {
    acc[m.year] = (acc[m.year] || 0) + 1;
    return acc;
  }, {});

  return shuffle(
    picks.flatMap<Card>((m) => {
      const yearText = yearCounts[m.year] > 1 ? m.dateStr : m.year;
      return [
        { id: `${m.id}-y`, pair: m.id, kind: "year", text: yearText },
        { id: `${m.id}-e`, pair: m.id, kind: "event", text: m.title }
      ];
    })
  );
}

/** Trò chơi lật thẻ: ghép năm với sự kiện đúng, có random liên tục và chọn chương. */
export default function MatchGameView({ milestones }: { milestones: Milestone[] }) {
  const [chapterFilter, setChapterFilter] = useState<string>("ALL");
  const [pairCount, setPairCount] = useState<number>(6);

  const pool = useMemo(() => {
    if (chapterFilter === "ALL") return milestones;
    return milestones.filter((m) => m.chapterCode === chapterFilter);
  }, [milestones, chapterFilter]);

  const [cards, setCards] = useState(() => deal(pool, pairCount));
  const [open, setOpen] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bestRecords, setBestRecords] = usePersistentState<Record<string, number>>("vnr-match-best-by-pairs", {});

  const currentBest = bestRecords[`${chapterFilter}-${pairCount}`] ?? 0;
  const finished = done.length === cards.length && cards.length > 0;

  // Tự động sinh ván mới khi đổi bộ lọc chương hoặc số lượng cặp
  useEffect(() => {
    setCards(deal(pool, pairCount));
    setOpen([]);
    setDone([]);
    setMoves(0);
    setSeconds(0);
  }, [pool, pairCount]);

  useEffect(() => {
    if (finished) return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [finished]);

  useEffect(() => {
    if (finished) {
      setBestRecords((prev) => {
        const key = `${chapterFilter}-${pairCount}`;
        const prevBest = prev[key] ?? 0;
        return {
          ...prev,
          [key]: prevBest === 0 ? moves : Math.min(prevBest, moves)
        };
      });
    }
  }, [finished, moves, chapterFilter, pairCount, setBestRecords]);

  const pick = (card: Card) => {
    if (open.length === 2 || open.includes(card.id) || done.includes(card.id)) return;
    const next = [...open, card.id];
    setOpen(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    const [a, b] = next.map((id) => cards.find((c) => c.id === id)!);
    if (a.pair === b.pair) {
      window.setTimeout(() => {
        setDone((d) => [...d, a.id, b.id]);
        setOpen([]);
      }, 350);
    } else {
      window.setTimeout(() => setOpen([]), 800);
    }
  };

  const newGame = () => {
    setCards(deal(pool, pairCount));
    setOpen([]);
    setDone([]);
    setMoves(0);
    setSeconds(0);
  };

  const restartCurrent = () => {
    // Giữ nguyên bộ thẻ nhưng úp lại và xáo trộn vị trí
    setCards(shuffle(cards));
    setOpen([]);
    setDone([]);
    setMoves(0);
    setSeconds(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <header className="border-b border-border pb-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
            <h1 className="font-display text-4xl font-semibold text-primary">Ghép cặp năm - sự kiện</h1>
            <p className="text-sm text-muted-foreground">
              Lật hai thẻ để ghép mốc thời gian với sự kiện lịch sử tương ứng (kho {pool.length} mốc, xáo ngẫu nhiên).
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Lượt: <strong className="text-foreground">{moves}</strong></span>
            <span>Thời gian: <strong className="text-foreground">{seconds}s</strong></span>
            <span>Kỷ lục: <strong className="text-foreground">{currentBest === 0 ? "—" : `${currentBest} lượt`}</strong></span>
          </div>
        </div>

        {/* Bảng điều khiển bộ lọc & độ khó */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <SegmentedControl
              ariaLabel="Lọc theo chương"
              items={[
                { key: "ALL", label: "TẤT CẢ", active: chapterFilter === "ALL", onSelect: () => setChapterFilter("ALL") },
                { key: "Chương 1", label: "CHƯƠNG 1", active: chapterFilter === "Chương 1", onSelect: () => setChapterFilter("Chương 1") },
                { key: "Chương 2", label: "CHƯƠNG 2", active: chapterFilter === "Chương 2", onSelect: () => setChapterFilter("Chương 2") },
                { key: "Chương 3", label: "CHƯƠNG 3", active: chapterFilter === "Chương 3", onSelect: () => setChapterFilter("Chương 3") }
              ]}
            />
            <SegmentedControl
              ariaLabel="Số cặp thẻ"
              items={PAIR_OPTIONS.map((opt) => ({
                key: String(opt.count),
                label: opt.label,
                active: pairCount === opt.count,
                onSelect: () => setPairCount(opt.count)
              }))}
            />
          </div>

          <div className="flex items-center gap-2">
            <AppButton variant="outline" size="xs" onClick={restartCurrent} icon={<RotateCcw className="size-3" strokeWidth={1.5} />}>
              CHIA LẠI
            </AppButton>
            <AppButton variant="primary" size="xs" onClick={newGame} icon={<Shuffle className="size-3" strokeWidth={1.5} />}>
              VÁN MỚI
            </AppButton>
          </div>
        </div>
      </header>

      <div className={`grid gap-3 ${pairCount === 10 ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-5" : pairCount === 8 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 md:grid-cols-4"}`}>
        {cards.map((c) => {
          const isDone = done.includes(c.id);
          const faceUp = isDone || open.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => pick(c)}
              aria-label={faceUp ? c.text : "Thẻ úp"}
              className={`match-card ${faceUp ? "is-up" : ""} ${isDone ? "is-done" : ""}`}
            >
              <span className="match-card-inner">
                <span className="match-card-front lbl">?</span>
                <span className={`match-card-back ${c.kind === "year" ? "font-display text-xl sm:text-2xl font-semibold text-primary" : "text-xs font-medium leading-snug p-2 text-foreground"}`}>
                  {c.text}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {finished && (
        <div className="p-5 border border-primary bg-accent flex flex-wrap items-center justify-between gap-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Trophy className="size-6 text-primary shrink-0" strokeWidth={1.5} />
            <div>
              <div className="lbl text-primary">XUẤT SẮC HOÀN THÀNH!</div>
              <div className="text-sm text-foreground">Bạn đã ghép đúng {pairCount} cặp sự kiện trong {moves} lượt ({seconds} giây).</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AppButton variant="outline" size="sm" onClick={restartCurrent}>CHƠI LẠI VÁN NÀY</AppButton>
            <AppButton variant="primary" size="sm" onClick={newGame} icon={<Shuffle className="size-3.5" strokeWidth={1.5} />}>
              BỐC VÁN MỚI
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}
