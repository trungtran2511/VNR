import { useMemo, useState } from "react";
import type { Milestone } from "../lib/types";
import { sortMilestonesChronologically } from "../lib/timelineGame";
import { Clock, ArrowUpRight } from "lucide-react";
import { SegmentedControl } from "./ui/segmented-control";

interface TimelineViewProps {
  milestones: Milestone[];
  onOpenChapter?: (chapterCode: string) => void;
}

const CHAPTER_FILTERS = ["ALL", "Chương 1", "Chương 2", "Chương 3"];

export default function TimelineView({ milestones, onOpenChapter }: TimelineViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filterChapter, setFilterChapter] = useState<string>("ALL");

  const sorted = useMemo(() => sortMilestonesChronologically(milestones), [milestones]);
  const filtered =
    filterChapter === "ALL" ? sorted : sorted.filter((m) => m.chapterCode === filterChapter);

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <header className="border-b border-foreground/80 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="box lbl text-primary border-primary">
              BIÊN NIÊN SỬ
            </span>
            <span className="w-8 h-px bg-primary" />
            <span className="lbl text-primary">1925 — 2021</span>
          </div>

          <h1
            className="font-display font-semibold text-primary tracking-[-0.015em] leading-[1.15]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Dòng Thời Gian Mốc Son Lịch Sử
          </h1>

          <p className="font-body text-base text-muted-foreground">
            Hệ thống hóa {milestones.length} sự kiện bước ngoặt trong tiến trình lãnh đạo cách mạng của Đảng Cộng sản Việt Nam.
          </p>
        </div>

        <SegmentedControl
          ariaLabel="Lọc mốc sử theo giai đoạn"
          className="self-start md:self-auto"
          items={CHAPTER_FILTERS.map((ch) => ({
            key: ch,
            label: ch === "ALL" ? "TẤT CẢ GIAI ĐOẠN" : ch.toUpperCase(),
            active: filterChapter === ch,
            onSelect: () => setFilterChapter(ch)
          }))}
        />
      </header>

      {/* Trục thời gian: bấm một mốc để nhảy tới nội dung */}
      <div className="tl-track" role="list" aria-label="Trục thời gian các mốc sử">
        {filtered.map((item) => (
          <button
            key={item.id}
            role="listitem"
            className="tl-dot"
            aria-current={activeId === item.id}
            onClick={() => {
              setActiveId(item.id);
              document.getElementById(`ms-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            <span className="lbl">{item.year}</span>
          </button>
        ))}
      </div>

      {/* Flat Catalogue Timeline Table */}
      <div className="border-t border-foreground/80 divide-y divide-border">
        {filtered.map((item) => (
          <article
            key={item.id}
            id={`ms-${item.id}`}
            className={`py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-muted/40 transition-colors px-2 ${activeId === item.id ? "bg-muted/60" : ""}`}
          >
            <div className="md:col-span-3 space-y-1.5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="size-3.5" strokeWidth={1.5} />
                <span className="lbl">{item.dateStr}</span>
              </div>
              <div>
                <span className="box lbl text-muted-foreground">
                  {item.chapterCode}
                </span>
              </div>
            </div>

            <div className="md:col-span-9 space-y-2">
              <h2 className="text-lg font-semibold text-primary tracking-tight">
                {item.title}
              </h2>

              <p className="font-body text-[16.5px] text-foreground leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 font-body text-sm text-muted-foreground leading-relaxed">
                <span className="lbl text-primary mr-2">Ý NGHĨA LỊCH SỬ:</span>
                <span>{item.significance}</span>
              </div>
              {onOpenChapter && (
                <button
                  onClick={() => onOpenChapter(item.chapterCode)}
                  className="inline-flex items-center gap-1 pt-1 text-xs text-primary hover:underline"
                >
                  Đọc {item.chapterCode}
                  <ArrowUpRight className="size-3" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
