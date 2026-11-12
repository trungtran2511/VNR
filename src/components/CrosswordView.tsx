import { useMemo, useState } from "react";
import { Lightbulb, Check, Trophy, RotateCcw, Shuffle, ArrowRight } from "lucide-react";
import { CROSSWORDS, type Crossword } from "../lib/crosswordData";
import { playChime } from "../lib/sound";
import { usePersistentState } from "../lib/usePersistentState";
import { SegmentedControl } from "./ui/segmented-control";
import { AppButton } from "./ui/app-button";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toUpperCase().replace(/[^A-Z]/g, "");

/** Ô chữ lịch sử: Hỗ trợ 9 bộ đề đa dạng cho 3 chương, random đề và làm lại. */
export default function CrosswordView() {
  const [selectedChapter, setSelectedChapter] = useState<"Chương 1" | "Chương 2" | "Chương 3">("Chương 1");
  const chapterPuzzles = useMemo(
    () => CROSSWORDS.filter((p) => p.chapterCode === selectedChapter),
    [selectedChapter]
  );

  const [pid, setPid] = useState(chapterPuzzles[0].id);

  // Đảm bảo pid luôn thuộc chapter được chọn
  const puzzle: Crossword = useMemo(() => {
    const found = CROSSWORDS.find((p) => p.id === pid);
    if (found && found.chapterCode === selectedChapter) return found;
    return chapterPuzzles[0] || CROSSWORDS[0];
  }, [pid, selectedChapter, chapterPuzzles]);

  const [state, setState] = useState<Record<string, { solved: boolean[]; hinted: string[][]; keySolved: boolean }>>({});
  const [active, setActive] = useState(0);
  const [input, setInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [msg, setMsg] = useState("");
  const [best, setBest] = usePersistentState<Record<string, number>>("vnr-crossword-best", {});

  const cur = state[puzzle.id] ?? {
    solved: puzzle.rows.map(() => false),
    hinted: puzzle.rows.map((r) => Array<string>(r.answer.length).fill("")),
    keySolved: false
  };

  const update = (next: typeof cur) => setState((s) => ({ ...s, [puzzle.id]: next }));

  const maxKey = Math.max(...puzzle.rows.map((r) => r.keyIndex));
  const width = Math.max(...puzzle.rows.map((r) => maxKey - r.keyIndex + r.answer.length));

  const hintsUsed = cur.hinted.reduce((a, row) => a + row.filter(Boolean).length, 0);
  const rowScore = cur.solved.filter(Boolean).length * 10;
  const score = Math.max(0, rowScore + (cur.keySolved ? 30 : 0) - hintsUsed * 2);
  const allRows = cur.solved.every(Boolean);

  const finish = (next: typeof cur) => {
    update(next);
    playChime("win");
    const s = Math.max(0, next.solved.filter(Boolean).length * 10 + 30 - next.hinted.reduce((a, r) => a + r.filter(Boolean).length, 0) * 2);
    setBest((b) => ({ ...b, [puzzle.id]: Math.max(b[puzzle.id] ?? 0, s) }));
  };

  const submitRow = () => {
    const row = puzzle.rows[active];
    if (norm(input) !== row.answer) {
      setMsg("Chưa đúng, thử lại hoặc dùng gợi ý chữ cái.");
      return;
    }
    const solved = cur.solved.slice();
    solved[active] = true;
    setMsg("Chính xác!");
    setInput("");
    playChime("ok");
    const next = { ...cur, solved };
    update(next);
    const firstOpen = solved.findIndex((x) => !x);
    if (firstOpen >= 0) setActive(firstOpen);
  };

  const hint = () => {
    const row = puzzle.rows[active];
    if (cur.solved[active]) return;
    const hinted = cur.hinted.map((r) => r.slice());
    const idx = hinted[active].findIndex((x) => x === "");
    if (idx < 0) return;
    hinted[active][idx] = row.answer[idx];
    update({ ...cur, hinted });
  };

  const submitKey = () => {
    if (norm(keyInput) === puzzle.keyword) {
      setMsg("Đúng từ khóa! Chúc mừng bạn đã giải mã thành công.");
      finish({ ...cur, keySolved: true });
    } else {
      setMsg("Từ khóa chưa đúng, hãy quan sát các chữ cái đã lộ.");
    }
  };

  // Làm lại ô chữ hiện tại (xóa tiến trình của ô chữ này)
  const resetCurrentPuzzle = () => {
    update({
      solved: puzzle.rows.map(() => false),
      hinted: puzzle.rows.map((r) => Array<string>(r.answer.length).fill("")),
      keySolved: false
    });
    setActive(0);
    setInput("");
    setKeyInput("");
    setMsg("Đã làm mới bảng ô chữ.");
  };

  // Đổi ngẫu nhiên một bộ đề khác
  const pickRandomPuzzle = () => {
    const otherPuzzles = CROSSWORDS.filter((p) => p.id !== puzzle.id);
    const nextP = otherPuzzles[Math.floor(Math.random() * otherPuzzles.length)];
    if (nextP) {
      setSelectedChapter(nextP.chapterCode);
      setPid(nextP.id);
      setActive(0);
      setInput("");
      setKeyInput("");
      setMsg("");
    }
  };

  // Chuyển sang bộ đề kế tiếp
  const pickNextPuzzle = () => {
    const curIdx = CROSSWORDS.findIndex((p) => p.id === puzzle.id);
    const nextP = CROSSWORDS[(curIdx + 1) % CROSSWORDS.length];
    setSelectedChapter(nextP.chapterCode);
    setPid(nextP.id);
    setActive(0);
    setInput("");
    setKeyInput("");
    setMsg("");
  };

  const rowsView = useMemo(
    () =>
      puzzle.rows.map((r, i) => {
        const offset = maxKey - r.keyIndex;
        return { r, i, offset };
      }),
    [puzzle, maxKey]
  );

  const letterAt = (i: number, c: number) =>
    cur.solved[i] ? puzzle.rows[i].answer[c] : cur.hinted[i][c] || "";

  const keyShown = puzzle.rows.map((r, i) => letterAt(i, r.keyIndex) || (cur.keySolved ? puzzle.keyword[i] : ""));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <header className="border-b border-border pb-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
            <h1 className="font-display text-4xl font-semibold text-primary">Ô chữ lịch sử</h1>
            <p className="text-sm text-muted-foreground">
              Điền các hàng ngang để giải mã từ khóa ở cột tô đậm. Mỗi hàng đúng +10, từ khóa +30, mỗi gợi ý −2.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Điểm: <strong className="text-foreground">{score}</strong></span>
            <span>Cao nhất đề này: <strong className="text-foreground">{best[puzzle.id] ?? "—"}</strong></span>
          </div>
        </div>

        {/* Bảng chọn Chương & Đề */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <SegmentedControl
              ariaLabel="Chọn chương"
              items={[
                {
                  key: "Chương 1",
                  label: "CHƯƠNG 1",
                  active: selectedChapter === "Chương 1",
                  onSelect: () => {
                    setSelectedChapter("Chương 1");
                    const p = CROSSWORDS.find((x) => x.chapterCode === "Chương 1");
                    if (p) setPid(p.id);
                    setActive(0);
                    setInput("");
                    setMsg("");
                  }
                },
                {
                  key: "Chương 2",
                  label: "CHƯƠNG 2",
                  active: selectedChapter === "Chương 2",
                  onSelect: () => {
                    setSelectedChapter("Chương 2");
                    const p = CROSSWORDS.find((x) => x.chapterCode === "Chương 2");
                    if (p) setPid(p.id);
                    setActive(0);
                    setInput("");
                    setMsg("");
                  }
                },
                {
                  key: "Chương 3",
                  label: "CHƯƠNG 3",
                  active: selectedChapter === "Chương 3",
                  onSelect: () => {
                    setSelectedChapter("Chương 3");
                    const p = CROSSWORDS.find((x) => x.chapterCode === "Chương 3");
                    if (p) setPid(p.id);
                    setActive(0);
                    setInput("");
                    setMsg("");
                  }
                }
              ]}
            />

            <SegmentedControl
              ariaLabel="Chọn bộ đề"
              items={chapterPuzzles.map((p, idx) => ({
                key: p.id,
                label: `ĐỀ ${idx + 1} (${p.keyword.length} CHỮ)`,
                active: puzzle.id === p.id,
                onSelect: () => {
                  setPid(p.id);
                  setActive(0);
                  setInput("");
                  setMsg("");
                }
              }))}
            />
          </div>

          <div className="flex items-center gap-2">
            <AppButton variant="outline" size="xs" onClick={resetCurrentPuzzle} icon={<RotateCcw className="size-3" strokeWidth={1.5} />}>
              LÀM LẠI ĐỀ NÀY
            </AppButton>
            <AppButton variant="primary" size="xs" onClick={pickRandomPuzzle} icon={<Shuffle className="size-3" strokeWidth={1.5} />}>
              ĐỔI ĐỀ NGẪU NHIÊN
            </AppButton>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>{puzzle.title}</span>
          <span className="lbl text-primary">{puzzle.rows.length} HÀNG NGANG · TỪ KHÓA: {puzzle.keyword.length} KÝ TỰ</span>
        </div>
      </header>

      {/* Lưới ô chữ */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card/40 p-4">
        <div className="cw-grid mx-auto" style={{ ["--cw-cols" as string]: width }}>
          {rowsView.map(({ r, i, offset }) => (
            <div
              key={i}
              className={`cw-row ${active === i ? "is-active" : ""}`}
              onClick={() => {
                setActive(i);
                setMsg("");
              }}
            >
              <span className="cw-num lbl">{i + 1}</span>
              {Array.from({ length: width }, (_, c) => {
                const idx = c - offset;
                if (idx < 0 || idx >= r.answer.length) {
                  return <span key={c} className="cw-cell cw-empty" />;
                }
                const ch = letterAt(i, idx) || (idx === r.keyIndex && cur.keySolved ? puzzle.keyword[i] : "");
                return (
                  <span
                    key={c}
                    className={`cw-cell ${idx === r.keyIndex ? "cw-key" : ""} ${cur.solved[i] ? "cw-solved" : ""}`}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Khu vực trả lời hàng ngang */}
      <div className="space-y-3 rounded-lg border border-border bg-card/60 p-4">
        <div className="flex items-center justify-between">
          <span className="lbl text-primary">
            HÀNG {active + 1} · {puzzle.rows[active].answer.length} CHỮ CÁI
          </span>
          {cur.solved[active] && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Đã giải đúng (+10 điểm)</span>
          )}
        </div>
        <p className="font-body text-[16px] text-foreground leading-relaxed">
          {puzzle.rows[active].clue}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitRow()}
            disabled={cur.solved[active]}
            placeholder="Nhập đáp án (không dấu cũng được)"
            className="h-9 w-72 rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-primary disabled:opacity-50"
          />
          <AppButton
            variant="primary"
            size="sm"
            onClick={submitRow}
            disabled={cur.solved[active]}
            icon={<Check className="size-3.5" strokeWidth={1.5} />}
          >
            KIỂM TRA
          </AppButton>
          <AppButton
            variant="outline"
            size="sm"
            onClick={hint}
            disabled={cur.solved[active]}
            icon={<Lightbulb className="size-3.5" strokeWidth={1.5} />}
          >
            GỢI Ý CHỮ (−2 ĐIỂM)
          </AppButton>
        </div>
        {msg && <p className="text-sm font-medium text-primary" role="status">{msg}</p>}
      </div>

      {/* Khu vực từ khóa hàng dọc */}
      {(allRows || cur.keySolved) && (
        <div className="p-5 border border-primary bg-accent space-y-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lbl text-primary">
              <Trophy className="size-4" strokeWidth={1.5} /> TỪ KHÓA HÀNG DỌC ({puzzle.keyword.length} CHỮ)
            </div>
            {cur.keySolved && (
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                ★ ĐÃ GIẢI MÃ THÀNH CÔNG (+30 ĐIỂM)
              </span>
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto py-1">
            {keyShown.map((l, i) => (
              <span key={i} className="cw-cell cw-key cw-solved font-bold text-base">
                {l}
              </span>
            ))}
          </div>

          <p className="font-body text-sm text-foreground">
            <strong className="text-primary mr-1">Gợi ý từ khóa:</strong>
            {puzzle.keywordClue}
          </p>

          {!cur.keySolved ? (
            <div className="flex flex-wrap gap-2">
              <input
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitKey()}
                placeholder="Nhập từ khóa chính xác"
                className="h-9 w-64 rounded-md border border-border bg-card px-3 text-sm focus-visible:outline-primary"
              />
              <AppButton variant="primary" size="sm" onClick={submitKey}>
                XÁC NHẬN TỪ KHÓA
              </AppButton>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <AppButton variant="outline" size="sm" onClick={pickNextPuzzle} icon={<ArrowRight className="size-3.5" strokeWidth={1.5} />}>
                SANG BỘ ĐỀ TIẾP THEO
              </AppButton>
              <AppButton variant="primary" size="sm" onClick={pickRandomPuzzle} icon={<Shuffle className="size-3.5" strokeWidth={1.5} />}>
                BỐC BỘ ĐỀ NGẪU NHIÊN KHÁC
              </AppButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
