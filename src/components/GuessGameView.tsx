import { useState } from "react";
import { Lightbulb, RotateCcw, Trophy } from "lucide-react";
import type { Milestone } from "../lib/types";
import { shuffle } from "../lib/shuffle";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";

const ROUNDS = 8;
const MAX_POINTS = 3;

function newGame(milestones: Milestone[]) {
  return shuffle(milestones).slice(0, ROUNDS).map((m) => ({
    m,
    options: shuffle([m, ...shuffle(milestones.filter((x) => x.id !== m.id)).slice(0, 3)])
  }));
}

/** Đoán sự kiện từ gợi ý: càng dùng ít gợi ý càng nhiều điểm. */
export default function GuessGameView({ milestones }: { milestones: Milestone[] }) {
  const [game, setGame] = useState(() => newGame(milestones));
  const [idx, setIdx] = useState(0);
  const [clues, setClues] = useState(1);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = usePersistentState<number>("vnr-guess-best", 0);

  const finished = idx >= game.length;
  const round = game[idx];

  const pick = (id: string) => {
    if (answer || !round) return;
    setAnswer(id);
    if (id === round.m.id) setScore((s) => s + (MAX_POINTS - clues + 1));
  };

  const next = () => {
    const last = idx + 1 >= game.length;
    if (last) setBest((b) => Math.max(b, score));
    setIdx((i) => i + 1);
    setClues(1);
    setAnswer(null);
  };

  const restart = () => {
    setGame(newGame(milestones));
    setIdx(0);
    setClues(1);
    setAnswer(null);
    setScore(0);
  };

  const clueTexts = round
    ? [`Ý nghĩa: ${round.m.significance}`, `Diễn biến: ${round.m.description}`, `Thời điểm: ${round.m.dateStr} (${round.m.chapterCode})`]
    : [];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <header className="border-b border-border pb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
          <h1 className="font-display text-4xl font-semibold text-primary">Đoán sự kiện</h1>
          <p className="text-sm text-muted-foreground">Đoán đúng ngay gợi ý đầu được 3 điểm, mỗi gợi ý thêm trừ 1 điểm.</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span>Điểm: <strong className="text-foreground">{score}</strong> / {ROUNDS * MAX_POINTS}</span>
          <span>Kỷ lục: <strong className="text-foreground">{best === 0 ? "—" : best}</strong></span>
        </div>
      </header>

      {!finished && round && (
        <div key={idx} className="view-enter space-y-6">
          <div className="lbl text-muted-foreground">VÒNG {idx + 1} / {game.length}</div>

          <ul className="space-y-3">
            {clueTexts.slice(0, clues).map((t, i) => (
              <li key={i} className="flex gap-3 font-body text-[17px] leading-[1.7] text-foreground">
                <Lightbulb className="size-4 mt-1.5 shrink-0 text-primary" strokeWidth={1.5} />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="grid gap-2">
            {round.options.map((o) => {
              const correct = o.id === round.m.id;
              const chosen = answer === o.id;
              const tone = !answer
                ? "border-border hover:border-foreground"
                : correct
                  ? "border-success bg-success-soft text-success font-semibold"
                  : chosen
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border opacity-60";
              return (
                <button
                  key={o.id}
                  disabled={!!answer}
                  onClick={() => pick(o.id)}
                  className={`w-full text-left px-4 py-3 rounded-md border text-sm transition-colors ${tone}`}
                >
                  {o.title}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {!answer && clues < clueTexts.length && (
              <AppButton variant="outline" size="sm" onClick={() => setClues((c) => c + 1)}>
                GỢI Ý THÊM (−1 ĐIỂM)
              </AppButton>
            )}
            {answer && (
              <AppButton variant="primary" size="sm" onClick={next}>
                {idx + 1 >= game.length ? "XEM KẾT QUẢ" : "VÒNG TIẾP"}
              </AppButton>
            )}
          </div>
        </div>
      )}

      {finished && (
        <div className="p-5 border border-primary bg-accent flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="size-5 text-primary" strokeWidth={1.5} />
            <div>
              <div className="lbl text-primary">KẾT QUẢ</div>
              <div className="text-sm text-foreground">Bạn đạt {score} / {ROUNDS * MAX_POINTS} điểm.</div>
            </div>
          </div>
          <AppButton variant="primary" size="sm" onClick={restart} icon={<RotateCcw className="size-3" strokeWidth={1.5} />}>
            CHƠI LẠI
          </AppButton>
        </div>
      )}
    </div>
  );
}
