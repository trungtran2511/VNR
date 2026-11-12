import { useEffect, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import type { Milestone } from "../lib/types";
import { shuffle } from "../lib/shuffle";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";

interface Card {
  id: string;
  pair: string;
  kind: "year" | "event";
  text: string;
}

const PAIRS = 6;

function deal(milestones: Milestone[]): Card[] {
  const seen = new Set<string>();
  const picks = shuffle(milestones).filter((m) => (seen.has(m.year) ? false : (seen.add(m.year), true))).slice(0, PAIRS);
  return shuffle(
    picks.flatMap<Card>((m) => [
      { id: `${m.id}-y`, pair: m.id, kind: "year", text: m.year },
      { id: `${m.id}-e`, pair: m.id, kind: "event", text: m.title }
    ])
  );
}

/** Trò chơi lật thẻ: ghép năm với sự kiện đúng. */
export default function MatchGameView({ milestones }: { milestones: Milestone[] }) {
  const [cards, setCards] = useState(() => deal(milestones));
  const [open, setOpen] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [best, setBest] = usePersistentState<number>("vnr-match-best-moves", 0);

  const finished = done.length === cards.length && cards.length > 0;

  useEffect(() => {
    if (finished) return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [finished]);

  useEffect(() => {
    if (finished) setBest((b) => (b === 0 ? moves : Math.min(b, moves)));
  }, [finished, moves, setBest]);

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

  const restart = () => {
    setCards(deal(milestones));
    setOpen([]);
    setDone([]);
    setMoves(0);
    setSeconds(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <header className="border-b border-border pb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
          <h1 className="font-display text-4xl font-semibold text-primary">Ghép cặp năm - sự kiện</h1>
          <p className="text-sm text-muted-foreground">Lật hai thẻ để ghép năm với sự kiện tương ứng.</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span>Lượt: <strong className="text-foreground">{moves}</strong></span>
          <span>Thời gian: <strong className="text-foreground">{seconds}s</strong></span>
          <span>Kỷ lục: <strong className="text-foreground">{best === 0 ? "—" : `${best} lượt`}</strong></span>
          <AppButton variant="outline" size="xs" onClick={restart} icon={<RotateCcw className="size-3" strokeWidth={1.5} />}>
            CHIA LẠI
          </AppButton>
        </div>
      </header>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
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
                <span className={`match-card-back ${c.kind === "year" ? "font-display text-2xl font-semibold" : "text-xs font-medium leading-snug"}`}>
                  {c.text}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {finished && (
        <div className="p-5 border border-primary bg-accent flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="size-5 text-primary" strokeWidth={1.5} />
            <div>
              <div className="lbl text-primary">HOÀN THÀNH</div>
              <div className="text-sm text-foreground">{moves} lượt trong {seconds} giây.</div>
            </div>
          </div>
          <AppButton variant="primary" size="sm" onClick={restart}>CHƠI VÁN MỚI</AppButton>
        </div>
      )}
    </div>
  );
}
