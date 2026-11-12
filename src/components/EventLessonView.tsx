import type { EventLesson } from "../lib/eventLessons";
import { Calendar, Landmark, Lightbulb, Users } from "lucide-react";

interface EventLessonViewProps {
  lesson: EventLesson;
  bookTitle: string;
  onOpenSummary: () => void;
}

/** Bài học chi tiết cho đúng một sự kiện/mốc thời gian của cuốn sách đang mở. */
export default function EventLessonView({ lesson, bookTitle, onOpenSummary }: EventLessonViewProps) {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      <header className="border-b border-border pb-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="box lbl text-primary border-primary">BÀI HỌC CHI TIẾT</span>
          <span className="w-8 h-px bg-primary" />
          <span className="lbl text-primary">{lesson.era}</span>
        </div>
        <h1
          className="font-display font-semibold text-primary tracking-[-0.015em] leading-[1.15]"
          style={{ fontSize: "clamp(36px, 4.6vw, 58px)" }}
        >
          {lesson.heading}
        </h1>
        <p className="text-xs text-muted-foreground">Thuộc cuốn: {bookTitle}</p>
      </header>

      <section className="reader-section reader-content font-body text-foreground">
        <p>{lesson.overview}</p>
      </section>

      <section className="reader-section space-y-4">
        <h2 className="reader-section-title text-primary flex items-center gap-2.5">
          <Landmark className="size-4" strokeWidth={1.5} />
          <span>Bối cảnh</span>
        </h2>
        <ul className="space-y-2.5 font-body text-[16px] leading-[1.8] text-foreground">
          {lesson.background.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="lbl text-primary pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="reader-section space-y-4">
        <h2 className="reader-section-title text-primary flex items-center gap-2.5">
          <Calendar className="size-4" strokeWidth={1.5} />
          <span>Diễn biến chính</span>
        </h2>
        <ol className="lesson-steps">
          {lesson.events.map((e, i) => (
            <li key={i}>
              <span className="lbl text-primary">{e.date}</span>
              <p className="font-body text-[16px] leading-[1.75] text-foreground">{e.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="reader-section space-y-4">
        <h2 className="reader-section-title text-primary flex items-center gap-2.5">
          <Lightbulb className="size-4" strokeWidth={1.5} />
          <span>Ý nghĩa lịch sử</span>
        </h2>
        <ul className="space-y-2.5 font-body text-[16px] leading-[1.8] text-foreground">
          {lesson.significance.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="lbl text-primary pt-1.5">—</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {lesson.figures.length > 0 && (
        <section className="reader-section space-y-4">
          <h2 className="reader-section-title text-primary flex items-center gap-2.5">
            <Users className="size-4" strokeWidth={1.5} />
            <span>Nhân vật tiêu biểu</span>
          </h2>
          <dl className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {lesson.figures.map((f) => (
              <div key={f.name} className="border-t border-border pt-3">
                <dt className="text-sm font-semibold text-foreground">{f.name}</dt>
                <dd className="font-body text-sm leading-relaxed text-muted-foreground">{f.role}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="reader-section pl-5 border-l-2 border-primary space-y-2.5 py-1">
        <div className="lbl text-primary">GHI NHỚ NHANH</div>
        <ul className="space-y-2 font-body text-[15.5px] text-foreground">
          {lesson.remember.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        Cần đối chiếu theo giáo trình?{" "}
        <button onClick={onOpenSummary} className="text-primary hover:underline">
          Xem tóm lược chương
        </button>
        . Nội dung bài học là bản tóm tắt để ôn tập, hãy đối chiếu với giáo trình gốc khi trích dẫn.
      </p>
    </div>
  );
}
