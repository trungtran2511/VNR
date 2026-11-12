import { useMemo } from "react";
import { Printer } from "lucide-react";
import type { Milestone } from "../lib/types";
import { sortMilestonesChronologically } from "../lib/timelineGame";
import { CONGRESSES } from "../lib/congresses";
import { AppButton } from "./ui/app-button";

/** Cẩm nang ôn thi gọn, bố cục sẵn cho in A4 hoặc lưu thành PDF. */
export default function CheatSheetView({ milestones }: { milestones: Milestone[] }) {
  const sorted = useMemo(() => sortMilestonesChronologically(milestones), [milestones]);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="no-print flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6 mb-8">
        <div className="space-y-2">
          <span className="box lbl text-primary border-primary">XUẤT TÀI LIỆU</span>
          <h1 className="font-display text-4xl font-semibold text-primary">Cẩm nang ôn thi 1 trang</h1>
          <p className="text-sm text-muted-foreground">Bấm in rồi chọn “Lưu dưới dạng PDF” để tải về, hoặc in trực tiếp ra giấy A4.</p>
        </div>
        <AppButton variant="primary" size="sm" onClick={() => window.print()} icon={<Printer className="size-3.5" strokeWidth={1.5} />}>
          IN / LƯU PDF
        </AppButton>
      </div>

      <section className="cheat-sheet">
        <h2 className="cheat-title">Lịch sử Đảng Cộng sản Việt Nam: mốc sử và ý nghĩa</h2>
        <table>
          <thead>
            <tr><th>Thời điểm</th><th>Sự kiện</th><th>Ý nghĩa</th></tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id}>
                <td>{m.dateStr}</td>
                <td>{m.title}</td>
                <td>{m.significance}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="cheat-title">Các kỳ Đại hội của Đảng</h2>
        <table>
          <thead>
            <tr><th>Đại hội</th><th>Thời điểm</th><th>Người đứng đầu được bầu</th><th>Nội dung then chốt</th></tr>
          </thead>
          <tbody>
            {CONGRESSES.map((c) => (
              <tr key={c.no}>
                <td>{c.no}</td>
                <td>{c.dateStr}</td>
                <td>{c.leader}</td>
                <td>{c.keyPoints[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="cheat-foot">Tài liệu ôn tập tóm lược. Đối chiếu giáo trình Lịch sử Đảng Cộng sản Việt Nam khi trích dẫn.</p>
      </section>
    </div>
  );
}
