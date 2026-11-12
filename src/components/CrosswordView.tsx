import { useMemo, useState } from "react";
import { Lightbulb, Check, Trophy } from "lucide-react";
import { CROSSWORDS } from "../lib/crosswordData";
import { playChime } from "../lib/sound";
import { usePersistentState } from "../lib/usePersistentState";
import { SegmentedControl } from "./ui/segmented-control";
import { AppButton } from "./ui/app-button";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toUpperCase().replace(/[^A-Z]/g, "");

/** Ô chữ: các hàng ngang cắt cột từ khóa dọc ở giữa. */
export default function CrosswordView() {
  const [pid, setPid] = useState(CROSSWORDS[0].id);
  const puzzle = CROSSWORDS.find((p) => p.id === pid) ?? CROSSWORDS[0];

  const [state, setState] = useState<Record<string, { solved: boolean[]; hinted: string[][]; keySolved: boolean }>>({});
  const [active, setActive] = useState(0);
  const [input, setInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [msg, setMsg] = useState("");
  const [best, setBest] = usePersistentState<Record<string, number>>("vnr-crossword-best", {});

  const cur = state[pid] ?? {
    solved: puzzle.rows.map(() => false),
    hinted: puzzle.rows.map((r) => Array<string>(r.answer.length).fill("")),
    keySolved: false
  };
  const update = (next: typeof cur) => setState((s) => ({ ...s, [pid]: next }));

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
    setBest((b) => ({ ...b, [pid]: Math.max(b[pid] ?? 0, s) }));
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
      setMsg("Đúng từ khóa! Chúc mừng bạn.");
      finish({ ...cur, keySolved: true });
    } else setMsg("Từ khóa chưa đúng.");
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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <header className="border-b border-border pb-6 space-y-4">
        <div className="space-y-2">
          <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
          <h1 className="font-display text-4xl font-semibold text-primary">Ô chữ lịch sử</h1>
          <p className="text-sm text-muted-foreground">Điền các hàng ngang để lộ từ khóa ở cột tô đậm. Mỗi hàng đúng +10, từ khóa +30, mỗi chữ gợi ý −2.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <SegmentedControl
            ariaLabel="Chọn ô chữ"
            items={CROSSWORDS.map((p, i) => ({ key: p.id, label: `CHƯƠNG ${i + 1}`, active: pid === p.id, onSelect: () => { setPid(p.id); setActive(0); setInput(""); setMsg(""); } }))}
          />
          <span className="text-sm text-muted-foreground">Điểm: <strong className="text-foreground">{score}</strong> · Cao nhất: <strong className="text-foreground">{best[pid] ?? "—"}</strong></span>
        </div>
        <p className="text-sm text-foreground">{puzzle.title}</p>
      </header>

      <div className="overflow-x-auto">
        <div className="cw-grid" style={{ ["--cw-cols" as string]: width }}>
          {rowsView.map(({ r, i, offset }) => (
            <div key={i} className={`cw-row ${active === i ? "is-active" : ""}`} onClick={() => { setActive(i); setMsg(""); }}>
              <span className="cw-num lbl">{i + 1}</span>
              {Array.from({ length: width }, (_, c) => {
                const idx = c - offset;
                if (idx < 0 || idx >= r.answer.length) return <span key={c} className="cw-cell cw-empty" />;
                const ch = letterAt(i, idx) || (idx === r.keyIndex && cur.keySolved ? puzzle.keyword[i] : "");
                return (
                  <span key={c} className={`cw-cell ${idx === r.keyIndex ? "cw-key" : ""} ${cur.solved[i] ? "cw-solved" : ""}`}>
                    {ch}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-body text-[16px] text-foreground">
          <span className="lbl text-primary mr-2">HÀNG {active + 1} · {puzzle.rows[active].answer.length} CHỮ</span>
          {puzzle.rows[active].clue}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitRow()}
            disabled={cur.solved[active]}
            placeholder="Nhập đáp án (không dấu cũng được)"
            className="h-9 w-72 rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-primary"
          />
          <AppButton variant="primary" size="sm" onClick={submitRow} disabled={cur.solved[active]} icon={<Check className="size-3.5" strokeWidth={1.5} />}>KIỂM TRA</AppButton>
          <AppButton variant="outline" size="sm" onClick={hint} disabled={cur.solved[active]} icon={<Lightbulb className="size-3.5" strokeWidth={1.5} />}>GỢI Ý CHỮ</AppButton>
        </div>
        {msg && <p className="text-sm text-primary" role="status">{msg}</p>}
      </div>

      {(allRows || cur.keySolved) && (
        <div className="p-5 border border-primary bg-accent space-y-3">
          <div className="flex items-center gap-2 lbl text-primary"><Trophy className="size-4" strokeWidth={1.5} /> TỪ KHÓA HÀNG DỌC</div>
          <div className="flex gap-1">{keyShown.map((l, i) => <span key={i} className="cw-cell cw-key cw-solved">{l}</span>)}</div>
          <p className="font-body text-sm text-foreground">{puzzle.keywordClue}</p>
          {!cur.keySolved && (
            <div className="flex flex-wrap gap-2">
              <input value={keyInput} onChange={(e) => setKeyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitKey()} placeholder="Nhập từ khóa" className="h-9 w-56 rounded-md border border-border bg-card px-3 text-sm focus-visible:outline-primary" />
              <AppButton variant="primary" size="sm" onClick={submitKey}>XÁC NHẬN TỪ KHÓA</AppButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
