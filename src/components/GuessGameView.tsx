import { useState, useMemo, useEffect } from "react";
import { Lightbulb, RotateCcw, Trophy, Shuffle, ArrowRight } from "lucide-react";
import type { Milestone } from "../lib/types";
import { shuffle } from "../lib/shuffle";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";
import { SegmentedControl } from "./ui/segmented-control";

const MAX_POINTS = 3;

const ROUND_OPTIONS = [
  { count: 5, label: "5 VÒNG" },
  { count: 8, label: "8 VÒNG" },
  { count: 10, label: "10 VÒNG" }
];

function buildRounds(pool: Milestone[], allMilestones: Milestone[], roundCount: number) {
  const actualCount = Math.min(roundCount, pool.length);
  const pickedTargets = shuffle(pool).slice(0, actualCount);

  return pickedTargets.map((m) => {
    // Ưu tiên lấy phương án nhiễu cùng chương để tăng độ thử thách
    const sameChapterPool = pool.filter((x) => x.id !== m.id);
    let distractors = shuffle(sameChapterPool).slice(0, 3);

    // Nếu không đủ 3 phương án cùng chương, lấy thêm từ toàn bộ kho
    if (distractors.length < 3) {
      const distractorIds = new Set([m.id, ...distractors.map((d) => d.id)]);
      const otherPool = shuffle(allMilestones.filter((x) => !distractorIds.has(x.id)));
      distractors = [...distractors, ...otherPool].slice(0, 3);
    }

    return {
      m,
      options: shuffle([m, ...distractors])
    };
  });
}

/** Đoán sự kiện từ gợi ý: càng dùng ít gợi ý càng nhiều điểm, hỗ trợ chọn chương và random liên tục. */
export default function GuessGameView({ milestones }: { milestones: Milestone[] }) {
  const [chapterFilter, setChapterFilter] = useState<string>("ALL");
  const [roundCount, setRoundCount] = useState<number>(8);

  const pool = useMemo(() => {
    if (chapterFilter === "ALL") return milestones;
    return milestones.filter((m) => m.chapterCode === chapterFilter);
  }, [milestones, chapterFilter]);

  const [game, setGame] = useState(() => buildRounds(pool, milestones, roundCount));
  const [idx, setIdx] = useState(0);
  const [clues, setClues] = useState(1);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [bestRecords, setBestRecords] = usePersistentState<Record<string, number>>("vnr-guess-best-records", {});

  const currentKey = `${chapterFilter}-${roundCount}`;
  const currentBest = bestRecords[currentKey] ?? 0;

  // Tự động sinh bộ câu hỏi mới khi đổi bộ lọc chương hoặc số vòng
  useEffect(() => {
    setGame(buildRounds(pool, milestones, roundCount));
    setIdx(0);
    setClues(1);
    setAnswer(null);
    setScore(0);
  }, [pool, milestones, roundCount]);

  const finished = idx >= game.length;
  const round = game[idx];

  const pick = (id: string) => {
    if (answer || !round) return;
    setAnswer(id);
    if (id === round.m.id) {
      setScore((s) => s + (MAX_POINTS - clues + 1));
    }
  };

  const next = () => {
    const isLast = idx + 1 >= game.length;
    if (isLast) {
      setBestRecords((prev) => ({
        ...prev,
        [currentKey]: Math.max(prev[currentKey] ?? 0, score)
      }));
    }
    setIdx((i) => i + 1);
    setClues(1);
    setAnswer(null);
  };

  const newGame = () => {
    setGame(buildRounds(pool, milestones, roundCount));
    setIdx(0);
    setClues(1);
    setAnswer(null);
    setScore(0);
  };

  const restartCurrentGame = () => {
    setIdx(0);
    setClues(1);
    setAnswer(null);
    setScore(0);
  };

  const clueTexts = round
    ? [
        `Ý nghĩa: ${round.m.significance}`,
        `Diễn biến: ${round.m.description}`,
        `Thời điểm: ${round.m.dateStr} (${round.m.chapterCode})`
      ]
    : [];

  const maxTotalScore = game.length * MAX_POINTS;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      <header className="border-b border-border pb-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
            <h1 className="font-display text-4xl font-semibold text-primary">Đoán sự kiện</h1>
            <p className="text-sm text-muted-foreground">
              Đoán đúng ngay gợi ý đầu được 3 điểm, mỗi gợi ý thêm trừ 1 điểm (kho {pool.length} sự kiện, ngẫu nhiên mỗi ván).
            </p>
          </div>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <span>Điểm: <strong className="text-foreground">{score}</strong> / {maxTotalScore}</span>
            <span>Kỷ lục: <strong className="text-foreground">{currentBest === 0 ? "—" : currentBest}</strong></span>
          </div>
        </div>

        {/* Bảng điều khiển bộ lọc & số vòng */}
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
              ariaLabel="Số vòng chơi"
              items={ROUND_OPTIONS.map((opt) => ({
                key: String(opt.count),
                label: opt.label,
                active: roundCount === opt.count,
                onSelect: () => setRoundCount(opt.count)
              }))}
            />
          </div>

          <div className="flex items-center gap-2">
            <AppButton variant="outline" size="xs" onClick={restartCurrentGame} icon={<RotateCcw className="size-3" strokeWidth={1.5} />}>
              CHƠI LẠI
            </AppButton>
            <AppButton variant="primary" size="xs" onClick={newGame} icon={<Shuffle className="size-3" strokeWidth={1.5} />}>
              VÁN MỚI
            </AppButton>
          </div>
        </div>
      </header>

      {!finished && round && (
        <div key={idx} className="view-enter space-y-6">
          <div className="flex items-center justify-between">
            <div className="lbl text-muted-foreground">VÒNG {idx + 1} / {game.length}</div>
            <div className="text-xs text-muted-foreground">
              Số điểm tối đa câu này: <strong className="text-foreground">{MAX_POINTS - clues + 1} điểm</strong>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card/60 p-4 space-y-3">
            <div className="lbl text-xs text-primary">GỢI Ý LỊCH SỬ ({clues}/3)</div>
            <ul className="space-y-3">
              {clueTexts.slice(0, clues).map((t, i) => (
                <li key={i} className="flex gap-3 font-body text-[16px] leading-[1.6] text-foreground">
                  <Lightbulb className="size-4 mt-1 shrink-0 text-primary" strokeWidth={1.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2.5">
            {round.options.map((o) => {
              const correct = o.id === round.m.id;
              const chosen = answer === o.id;
              const tone = !answer
                ? "border-border hover:border-foreground bg-card hover:bg-accent/40"
                : correct
                  ? "border-emerald-600 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-medium"
                  : chosen
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border opacity-50";

              return (
                <button
                  key={o.id}
                  disabled={!!answer}
                  onClick={() => pick(o.id)}
                  className={`w-full text-left px-4 py-3 rounded-md border text-sm transition-colors ${tone}`}
                >
                  <span className="font-medium mr-2">{o.title}</span>
                  {answer && <span className="text-xs opacity-75">({o.dateStr})</span>}
                </button>
              );
            })}
          </div>

          {answer && (
            <div className="p-4 rounded-md border border-border bg-accent/30 space-y-2 text-sm">
              <div className="lbl text-primary text-xs">THÔNG TIN SỰ KIỆN ĐÁP ÁN:</div>
              <p className="font-semibold text-foreground">{round.m.title} ({round.m.dateStr})</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{round.m.description}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            {!answer && clues < clueTexts.length && (
              <AppButton variant="outline" size="sm" onClick={() => setClues((c) => c + 1)} icon={<Lightbulb className="size-3.5" strokeWidth={1.5} />}>
                GỢI Ý THÊM (−1 ĐIỂM)
              </AppButton>
            )}
            {answer && (
              <AppButton variant="primary" size="sm" onClick={next} icon={<ArrowRight className="size-3.5" strokeWidth={1.5} />}>
                {idx + 1 >= game.length ? "XEM KẾT QUẢ" : "VÒNG TIẾP THEO"}
              </AppButton>
            )}
          </div>
        </div>
      )}

      {finished && (
        <div className="p-6 border border-primary bg-accent space-y-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Trophy className="size-8 text-primary shrink-0" strokeWidth={1.5} />
            <div>
              <div className="lbl text-primary">HOÀN THÀNH TẤT CẢ CÁC VÒNG!</div>
              <div className="text-lg font-semibold text-foreground">
                Tổng điểm: {score} / {maxTotalScore} điểm
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {score >= maxTotalScore * 0.8
                  ? "Kiến thức lịch sử xuất sắc! Bạn nắm rất vững các mốc sự kiện quan trọng."
                  : score >= maxTotalScore * 0.5
                    ? "Khá tốt! Bạn đã trả lời đúng nhiều mốc lịch sử quan trọng."
                    : "Hãy tiếp tục luyện tập thêm để ghi nhớ các mốc sự kiện lịch sử Đảng nhé!"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <AppButton variant="outline" size="sm" onClick={restartCurrentGame} icon={<RotateCcw className="size-3.5" strokeWidth={1.5} />}>
              CHƠI LẠI BỘ NÀY
            </AppButton>
            <AppButton variant="primary" size="sm" onClick={newGame} icon={<Shuffle className="size-3.5" strokeWidth={1.5} />}>
              BỐC BỘ CÂU HỎI MỚI
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}
