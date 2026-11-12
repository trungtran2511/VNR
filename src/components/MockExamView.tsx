import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Timer, XCircle } from "lucide-react";
import type { Chapter } from "../lib/types";
import {
  SECONDS_PER_QUESTION,
  buildExam,
  formatClock,
  gradeExam,
  type ExamAttempt,
  type ExamQuestion
} from "../lib/mockExam";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";

interface MockExamViewProps {
  chapters: Chapter[];
}

type Phase = "intro" | "running" | "result";

export default function MockExamView({ chapters }: MockExamViewProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const endAtRef = useRef(0);
  const [history, setHistory] = usePersistentState<ExamAttempt[]>(
    "lsd.mockExam.history.v1",
    []
  );

  const availableCount = useMemo(
    () => chapters.reduce((n, ch) => n + ch.reviewQuestions.length, 0),
    [chapters]
  );

  const result = useMemo(
    () => (phase === "result" ? gradeExam(questions, answers) : null),
    [phase, questions, answers]
  );

  const submit = useCallback(
    (finalAnswers: Record<number, number>, qs: ExamQuestion[]) => {
      const graded = gradeExam(qs, finalAnswers);
      setHistory((prev) =>
        [
          { at: Date.now(), score10: graded.score10, correct: graded.correct, total: graded.total },
          ...prev
        ].slice(0, 5)
      );
      setPhase("result");
    },
    [setHistory]
  );

  const start = () => {
    const qs = buildExam(chapters);
    const secs = qs.length * SECONDS_PER_QUESTION;
    endAtRef.current = Date.now() + secs * 1000;
    setQuestions(qs);
    setAnswers({});
    setIdx(0);
    setTotalSeconds(secs);
    setRemaining(secs);
    setPhase("running");
  };

  useEffect(() => {
    if (phase !== "running") return;
    const timer = window.setInterval(() => {
      const left = (endAtRef.current - Date.now()) / 1000;
      if (left <= 0) {
        window.clearInterval(timer);
        setRemaining(0);
        submit(answers, questions);
      } else {
        setRemaining(left);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [phase, answers, questions, submit]);

  if (phase === "intro") {
    const qCount = Math.min(availableCount, 40);
    return (
      <div className="space-y-8 max-w-3xl mx-auto pb-16">
        <header className="border-b border-foreground/80 pb-8 space-y-3">
          <div className="flex items-center gap-3">
            <span className="box lbl text-primary border-primary">THI THỬ</span>
            <span className="w-8 h-px bg-primary" />
            <span className="lbl text-primary">BẤM GIỜ</span>
          </div>
          <h1
            className="font-display font-semibold text-primary tracking-[-0.015em] leading-[1.15]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Phòng Thi Thử
          </h1>
          <p className="font-body text-base text-muted-foreground">
            Đề trộn ngẫu nhiên từ ngân hàng câu hỏi. Hết giờ hệ thống tự nộp bài.
          </p>
        </header>

        <dl className="grid grid-cols-2 gap-4">
          <div className="rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card p-5">
            <dt className="lbl text-muted-foreground">SỐ CÂU</dt>
            <dd className="mt-2 text-3xl font-semibold text-primary">{qCount}</dd>
          </div>
          <div className="rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card p-5">
            <dt className="lbl text-muted-foreground">THỜI GIAN</dt>
            <dd className="mt-2 text-3xl font-semibold text-primary">
              {formatClock(qCount * SECONDS_PER_QUESTION)}
            </dd>
          </div>
        </dl>

        {availableCount < 40 && (
          <p className="font-body text-sm text-muted-foreground">
            Ngân hàng hiện có {availableCount} câu nên đề thi gồm {availableCount} câu. Đề sẽ
            đủ 40 câu khi bổ sung thêm câu hỏi vào dữ liệu giáo trình.
          </p>
        )}

        <AppButton variant="primary" size="lg" icon={<Timer className="size-4" strokeWidth={1.5} />} onClick={start} disabled={availableCount === 0}>
          BẮT ĐẦU LÀM BÀI
        </AppButton>

        {history.length > 0 && (
          <section className="space-y-3 border-t border-border pt-6">
            <h2 className="lbl text-muted-foreground">5 LẦN THI GẦN NHẤT</h2>
            <ul className="space-y-2">
              {history.map((h) => (
                <li
                  key={h.at}
                  className="flex items-center justify-between rounded-[var(--radius-control)] border border-[var(--border-control)] bg-card/70 px-4 h-[var(--control-h-md)] text-sm"
                >
                  <span className="text-muted-foreground">
                    {new Date(h.at).toLocaleString("vi-VN")}
                  </span>
                  <span className="font-semibold text-foreground">
                    {h.score10.toFixed(1)}/10 • {h.correct}/{h.total} câu
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  if (phase === "running") {
    const q = questions[idx];
    const urgent = remaining <= totalSeconds * 0.2;
    const answered = Object.keys(answers).length;

    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-16">
        <div className="sticky top-0 z-10 -mx-1 flex items-center justify-between gap-4 rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card px-4 h-[var(--control-h-lg)]">
          <span className="lbl text-muted-foreground">
            ĐÃ TRẢ LỜI {answered}/{questions.length}
          </span>
          <span
            role="timer"
            className={`flex items-center gap-2 font-semibold tabular-nums ${
              urgent ? "text-destructive" : "text-primary"
            }`}
          >
            <Timer className="size-4" strokeWidth={1.5} />
            {formatClock(remaining)}
            {urgent && <span className="lbl">SẮP HẾT GIỜ</span>}
          </span>
        </div>

        <nav aria-label="Danh sách câu hỏi" className="flex flex-wrap gap-2">
          {questions.map((_, i) => (
            <AppButton
              key={i}
              variant={i === idx ? "primary" : "outline"}
              size="sm"
              aria-label={`Câu ${i + 1}${answers[i] !== undefined ? " (đã trả lời)" : ""}`}
              className={`!px-0 w-[var(--control-h-sm)] ${
                i !== idx && answers[i] !== undefined ? "!border-primary !text-primary" : ""
              }`}
              onClick={() => setIdx(i)}
            >
              {i + 1}
            </AppButton>
          ))}
        </nav>

        <section className="rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="box lbl text-primary border-primary">
              {q.chapterCode.toUpperCase()}
            </span>
            <span className="lbl text-muted-foreground">
              CÂU {idx + 1}/{questions.length}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-foreground leading-snug">{q.question}</h2>
          <div className="space-y-3" role="radiogroup" aria-label="Các phương án">
            {q.options.map((opt, oi) => {
              const chosen = answers[idx] === oi;
              return (
                <button
                  key={oi}
                  type="button"
                  role="radio"
                  aria-checked={chosen}
                  onClick={() => setAnswers((prev) => ({ ...prev, [idx]: oi }))}
                  className={`w-full text-left rounded-[var(--radius-control)] border px-4 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    chosen
                      ? "border-primary bg-primary/10 text-foreground font-medium"
                      : "border-[var(--border-control)] bg-card/70 text-foreground hover:border-[var(--border-control-strong)]"
                  }`}
                >
                  <span className="lbl text-primary mr-3">{String.fromCharCode(65 + oi)}</span>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex items-center justify-between gap-3">
          <AppButton
            variant="outline"
            size="sm"
            disabled={idx === 0}
            icon={<ArrowLeft className="size-3.5" strokeWidth={1.5} />}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            CÂU TRƯỚC
          </AppButton>
          {idx < questions.length - 1 ? (
            <AppButton
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="size-3.5" strokeWidth={1.5} />}
              onClick={() => setIdx((i) => i + 1)}
            >
              CÂU SAU
            </AppButton>
          ) : (
            <AppButton variant="primary" size="sm" onClick={() => submit(answers, questions)}>
              NỘP BÀI
            </AppButton>
          )}
        </div>
        {idx < questions.length - 1 && (
          <div className="flex justify-end">
            <AppButton variant="ghost" size="xs" onClick={() => submit(answers, questions)}>
              NỘP BÀI SỚM
            </AppButton>
          </div>
        )}
      </div>
    );
  }

  // phase === "result"
  const r = result!;
  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16">
      <header className="border-b border-foreground/80 pb-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="box lbl text-primary border-primary">KẾT QUẢ</span>
          <span className="w-8 h-px bg-primary" />
          <span className="lbl text-primary">THI THỬ</span>
        </div>
        <div className="flex items-end gap-4">
          <span className="text-6xl font-semibold text-primary leading-none">
            {r.score10.toFixed(1)}
          </span>
          <span className="lbl text-muted-foreground pb-1">
            /10 • ĐÚNG {r.correct}/{r.total} CÂU
          </span>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="lbl text-muted-foreground">PHÂN TÍCH THEO CHƯƠNG</h2>
        {r.breakdown.map((b) => {
          const pct = Math.round((b.correct / b.total) * 100);
          const weak = pct < 60;
          return (
            <div key={b.chapterCode} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{b.chapterCode}</span>
                <span className={weak ? "text-destructive font-semibold" : "text-foreground"}>
                  {b.correct}/{b.total} • {pct}%{weak ? " • CẦN ÔN THÊM" : ""}
                </span>
              </div>
              <div className="h-2 rounded-[var(--radius-control)] bg-muted overflow-hidden">
                <div
                  className={weak ? "h-full bg-destructive" : "h-full bg-success"}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="lbl text-muted-foreground">XEM LẠI LỜI GIẢI</h2>
        {questions.map((q, i) => {
          const chosen = answers[i];
          const ok = chosen !== undefined && q.options[chosen]?.isCorrect;
          return (
            <article
              key={q.id}
              className="rounded-[var(--radius-surface)] border border-[var(--border-control)] bg-card p-5 space-y-3"
            >
              <div className="flex items-start gap-3">
                {ok ? (
                  <CheckCircle2 className="size-5 flex-shrink-0 text-success" strokeWidth={1.5} aria-label="Đúng" />
                ) : (
                  <XCircle className="size-5 flex-shrink-0 text-destructive" strokeWidth={1.5} aria-label="Sai hoặc bỏ trống" />
                )}
                <h3 className="font-semibold text-foreground">
                  Câu {i + 1}. {q.question}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Bạn chọn:{" "}
                <span className={ok ? "text-success" : "text-destructive"}>
                  {chosen === undefined ? "Chưa trả lời" : q.options[chosen].text}
                </span>
              </p>
              {!ok && (
                <p className="text-sm text-foreground">
                  Đáp án đúng: {q.options.find((o) => o.isCorrect)?.text}
                </p>
              )}
              <p className="font-body text-sm text-muted-foreground">{q.explanation}</p>
            </article>
          );
        })}
      </section>

      <AppButton
        variant="primary"
        size="md"
        icon={<RotateCcw className="size-3" strokeWidth={1.5} />}
        onClick={() => setPhase("intro")}
      >
        THI LẠI
      </AppButton>
    </div>
  );
}
