import { useState } from "react";
import type { Chapter } from "../lib/types";
import { BookOpen, CheckCircle, HelpCircle, Calendar, Bookmark } from "lucide-react";
import { AppButton } from "./ui/app-button";

interface ChapterViewProps {
  chapter: Chapter;
}

export default function ChapterView({ chapter }: ChapterViewProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckAnswer = (questionId: string) => {
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* Editorial Chapter Header */}
      <header className="border-b border-foreground/80 pb-8 space-y-4">
        <div className="flex items-center gap-3">
          <span className="box lbl text-primary border-primary">
            {chapter.code}
          </span>
          <span className="w-8 h-px bg-primary" />
          <span className="lbl text-primary">{chapter.period}</span>
        </div>

        <h1
          className="font-semibold text-primary tracking-[-0.025em] leading-[1.08]"
          style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          {chapter.title}
        </h1>

        <p className="font-serif italic text-lg text-muted-foreground leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="pt-2 border-t border-border text-sm font-serif text-foreground leading-relaxed">
          <span className="lbl text-primary mr-2">TÓM LƯỢC CỐT LÕI:</span>
          {chapter.summary}
        </div>
      </header>

      {/* Chapter Sections */}
      <div className="space-y-12">
        {chapter.sections.map((sec, sIdx) => (
          <article key={sec.id} className="space-y-6">
            <div className="border-b border-border pb-3 flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-primary flex items-center gap-2.5">
                <BookOpen className="size-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                <span>{sec.title}</span>
              </h2>
              <span className="lbl text-muted-foreground flex-shrink-0">
                MỤC 0{sIdx + 1}
              </span>
            </div>

            {/* Editorial Serif Paragraphs */}
            <div className="space-y-4 font-serif text-[17px] text-foreground leading-[1.72]">
              {sec.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            {sec.keyPoints.length > 0 && (
              <div className="pl-5 border-l-2 border-primary space-y-2.5 py-1">
                <div className="lbl text-primary flex items-center gap-1.5">
                  <Bookmark className="size-3.5 text-primary" strokeWidth={1.5} />
                  <span>LUẬN ĐIỂM CỐT LÕI CẦN GHI NHỚ</span>
                </div>
                <ul className="space-y-2 font-serif text-[15.5px] text-foreground">
                  {sec.keyPoints.map((kp, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2.5">
                      <span className="lbl text-primary mt-1">—</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Historical Events Flat Catalogue Table */}
            {sec.historicalEvents && sec.historicalEvents.length > 0 && (
              <div className="border border-foreground/80">
                <div className="px-4 py-2.5 bg-muted border-b border-foreground/80 lbl text-foreground flex items-center gap-2">
                  <Calendar className="size-3.5 text-primary" strokeWidth={1.5} />
                  <span>NIÊN BIỂU SỰ KIỆN LỊCH SỬ TRỌNG YẾU</span>
                </div>
                <div className="divide-y divide-border">
                  {sec.historicalEvents.map((evt, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-32 flex-shrink-0 lbl text-primary">
                        {evt.date}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-semibold text-foreground">
                          {evt.event}
                        </div>
                        <div className="font-serif text-sm text-muted-foreground leading-relaxed">
                          {evt.significance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Chapter Review Questions */}
      <section className="pt-8 border-t border-foreground/80 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-primary flex items-center gap-2">
            <HelpCircle className="size-4 text-primary" strokeWidth={1.5} />
            <span>CÂU HỎI ÔN TẬP & KIỂM TRA CHƯƠNG</span>
          </h2>
          <span className="box lbl text-foreground">
            {chapter.reviewQuestions.length} CÂU HỎI
          </span>
        </div>

        <div className="divide-y divide-border border-t border-b border-border">
          {chapter.reviewQuestions.map((q, qIndex) => {
            const hasChecked = showResults[q.id];
            const chosen = selectedAnswers[q.id];

            return (
              <div key={q.id} className="py-6 space-y-4">
                <div className="text-sm font-semibold text-foreground leading-snug">
                  <span className="lbl text-primary mr-2">
                    CÂU 0{qIndex + 1} /
                  </span>
                  {q.question}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let optionClass =
                      "border-border hover:border-foreground text-foreground bg-transparent";
                    if (hasChecked) {
                      if (isCorrect) {
                        optionClass =
                          "border-success bg-success-soft text-success font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optionClass =
                          "border-destructive bg-destructive/10 text-destructive";
                      }
                    } else if (isSelected) {
                      optionClass =
                        "border-primary bg-accent text-primary font-semibold";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasChecked}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left px-4 py-2.5 rounded-md border text-xs transition-all flex items-center justify-between shadow-2xs ${optionClass}`}
                      >
                        <span>{opt}</span>
                        {hasChecked && isCorrect && (
                          <CheckCircle
                            className="size-4 text-success flex-shrink-0"
                            strokeWidth={1.5}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1">
                  {!hasChecked ? (
                    <AppButton
                      disabled={chosen === undefined}
                      onClick={() => handleCheckAnswer(q.id)}
                      variant="primary"
                      size="sm"
                    >
                      ĐỐI CHIẾU ĐÁP ÁN
                    </AppButton>
                  ) : (
                    <div className="p-3.5 bg-muted border-l-2 border-primary font-serif text-sm text-foreground leading-relaxed">
                      <span className="lbl text-primary mr-2">
                        GIẢI THÍCH GIÁO TRÌNH:
                      </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
