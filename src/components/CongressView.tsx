import { useMemo, useState } from "react";
import { CONGRESSES } from "../lib/congresses";
import { SegmentedControl } from "./ui/segmented-control";
import { SearchField } from "./ui/search-field";

const DECADES = ["Tất cả", "1930-50", "1960-70", "1980-90", "2000-10", "2020+"] as const;

function decadeOf(year: number): (typeof DECADES)[number] {
  if (year < 1960) return "1930-50";
  if (year < 1980) return "1960-70";
  if (year < 2000) return "1980-90";
  if (year < 2020) return "2000-10";
  return "2020+";
}

/** Dòng thời gian các kỳ Đại hội đại biểu toàn quốc của Đảng, có lọc theo thập niên và từ khóa. */
export default function CongressView() {
  const [decade, setDecade] = useState<(typeof DECADES)[number]>("Tất cả");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const list = useMemo(
    () =>
      CONGRESSES.filter((c) => decade === "Tất cả" || decadeOf(c.year) === decade).filter(
        (c) =>
          q === "" ||
          [c.no, String(c.year), c.leader, c.place, c.context, ...c.keyPoints, ...c.keywords]
            .join(" ")
            .toLowerCase()
            .includes(q)
      ),
    [decade, q]
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <header className="border-b border-border pb-6 space-y-4">
        <div className="space-y-2">
          <span className="box lbl text-primary border-primary">TRA CỨU</span>
          <h1 className="font-display text-4xl font-semibold text-primary">Các kỳ Đại hội của Đảng</h1>
          <p className="text-sm text-muted-foreground">
            {CONGRESSES.length} kỳ Đại hội, từ Đại hội I (1935) đến Đại hội XIII (2021). Thử tìm: đổi mới, công nghiệp hóa, chỉnh đốn Đảng.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedControl
            ariaLabel="Lọc theo thập niên"
            items={DECADES.map((d) => ({ key: d, label: d.toUpperCase(), active: decade === d, onSelect: () => setDecade(d) }))}
          />
          <div className="w-60">
            <SearchField value={query} onChange={setQuery} placeholder="Tìm Đại hội theo từ khóa..." />
          </div>
        </div>
      </header>

      {list.length === 0 && <p className="text-sm text-muted-foreground">—  Không có Đại hội phù hợp.</p>}

      <ol className="lesson-steps">
        {list.map((c) => (
          <li key={c.no} className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="font-display text-2xl font-semibold text-primary">Đại hội {c.no}</h2>
              <span className="lbl text-primary">{c.dateStr}</span>
              <span className="text-xs text-muted-foreground">{c.place}</span>
            </div>
            <p className="text-sm text-foreground">
              <span className="lbl text-muted-foreground mr-2">NGƯỜI ĐỨNG ĐẦU ĐƯỢC BẦU</span>
              {c.leader}
            </p>
            <p className="font-body text-[15.5px] leading-[1.75] text-foreground">
              <span className="lbl text-primary mr-2">BỐI CẢNH</span>
              {c.context}
            </p>
            <ul className="space-y-1 font-body text-[15.5px] leading-[1.7] text-foreground">
              {c.keyPoints.map((k, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="lbl text-primary pt-1">—</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {c.keywords.map((k) => (
                <button key={k} onClick={() => setQuery(k)} className="box lbl text-muted-foreground hover:text-primary">
                  {k}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted-foreground">Nội dung tóm lược để ôn tập; hãy đối chiếu giáo trình và văn kiện gốc khi trích dẫn.</p>
    </div>
  );
}
