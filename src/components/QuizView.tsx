import { useEffect, useState } from "react";
import { usePersistentState } from "../lib/usePersistentState";
import type { Chapter } from "../lib/types";
import { RotateCcw, CheckCircle2, XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { AppButton } from "./ui/app-button";

interface QuizViewProps {
  chapters: Chapter[];
}

export default function QuizView({ chapters }: QuizViewProps) {
  const allQuestions = chapters.flatMap((ch) =>
    ch.reviewQuestions.map((q) => ({ ...q, chapterCode: ch.code }))
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [best, setBest] = usePersistentState<number>("vnr-quiz-best-pct", 0);
  const currentQ = allQuestions[currentIdx];
  const total = allQuestions.length;

  const handleSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ans]) => {
    return acc + (allQuestions[Number(qIdx)].correctIndex === ans ? 1 : 0);
  }, 0);

  const pct = Math.round((score / total) * 100);
  useEffect(() => {
    if (isSubmitted) setBest((b) => Math.max(b, pct));
  }, [isSubmitted, pct, setBest]);

  return (
    <div className="space-y-10 max-w-3xl mx-auto pb-16">
      <header className="border-b border-foreground/80 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="box lbl text-primary border-primary">
              NGÂN HÀNG ĐỀ THI
            </span>
            <span className="w-8 h-px bg-primary" />
            <span className="lbl text-primary">CHUẨN BỘ GD&ĐT 2026</span>
          </div>

          <h1
            className="font-display font-semibold text-primary tracking-[-0.015em] leading-[1.15]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Luyện Thi Trắc Nghiệm Lịch Sử Đảng
          </h1>

          <p className="font-body text-base text-muted-foreground">
            Hệ thống câu hỏi ôn tập trọng tâm kèm giải thích đối chiếu trực tiếp từ giáo trình.
          </p>
        </div>

        <AppButton
          onClick={handleReset}
          variant="outline"
          size="xs"
          icon={<RotateCcw className="size-3" strokeWidth={1.5} />}
          className="self-start md:self-auto"
        >
          LÀM LẠI TỪ ĐẦU
        </AppButton>
      </header>

      {/* Progress Ruler */}
      <div className="space-y-2">
        <div className="flex items-center justify-between lbl text-muted-foreground">
          <span>
            CÂU HỎI 0{currentIdx + 1} / 0{total}
          </span>
          <span>
            ĐÃ CHỌN: {Object.keys(selectedAnswers).length} / {total}
          </span>
        </div>
        <div className="w-full h-[3px] bg-border">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Sheet */}
      {currentQ && (
        <div className="border border-foreground/80 p-6 md:p-8 space-y-6 bg-background">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="box lbl text-primary border-primary">
              {currentQ.chapterCode}
            </span>

            {isSubmitted && (
              <span
                className={`lbl flex items-center gap-1.5 ${
                  selectedAnswers[currentIdx] === currentQ.correctIndex
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {selectedAnswers[currentIdx] === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="size-3.5" strokeWidth={1.5} />
                    <span>CHÍNH XÁC</span>
                  </>
                ) : (
                  <>
                    <XCircle className="size-3.5" strokeWidth={1.5} />
                    <span>CHƯA ĐÚNG</span>
                  </>
                )}
              </span>
            )}
          </div>

          <h2 className="font-body text-xl text-foreground leading-snug">
            {currentQ.question}
          </h2>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;

              let btnClass =
                "border-border hover:border-foreground text-foreground bg-card";

              if (isSubmitted) {
                if (isCorrect) {
                  btnClass =
                    "border-success bg-success-soft text-success font-semibold";
                } else if (isSelected && !isCorrect) {
                  btnClass =
                    "border-destructive bg-destructive/10 text-destructive";
                }
              } else if (isSelected) {
                btnClass =
                  "border-primary bg-accent text-primary font-semibold";
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  disabled={isSubmitted}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center justify-between shadow-2xs ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2
                      className="size-4 text-success flex-shrink-0"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="p-4 bg-muted border-l-2 border-primary font-body text-sm text-foreground leading-relaxed">
              <span className="lbl text-primary mr-2">
                GIẢI THÍCH GIÁO TRÌNH:
              </span>
              {currentQ.explanation}
            </div>
          )}

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <AppButton
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="size-3.5" strokeWidth={1.5} />}
            >
              CÂU TRƯỚC
            </AppButton>

            <div className="flex items-center gap-2">
              {!isSubmitted && (
                <AppButton
                  onClick={() => setIsSubmitted(true)}
                  variant="primary"
                  size="sm"
                >
                  CHẤM ĐIỂM BÀI LÀM
                </AppButton>
              )}

              {currentIdx < total - 1 && (
                <AppButton
                  onClick={() =>
                    setCurrentIdx((prev) => Math.min(total - 1, prev + 1))
                  }
                  variant="primary"
                  size="sm"
                  iconRight={<ArrowRight className="size-3.5" strokeWidth={1.5} />}
                >
                  CÂU TIẾP THEO
                </AppButton>
              )}
            </div>
          </div>
        </div>
      )}

      {isSubmitted && (
        <div className="p-5 border border-primary bg-accent flex items-center justify-between">
          <div className="space-y-1">
            <div className="lbl text-primary">KẾT QUẢ TỔNG KẾT</div>
            <div className="font-body text-lg text-foreground">
              Đạt <strong>{score}</strong> / {total} câu đúng (
              {Math.round((score / total) * 100)}%) · Cao nhất: {best}%
            </div>
          </div>
          <button
            onClick={handleReset}
            className="h-[36px] px-5 border border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary transition-colors lbl"
          >
            LUYỆN THI LẠI
          </button>
        </div>
      )}
    </div>
  );
}
