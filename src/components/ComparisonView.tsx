import type { DocumentComparison } from "../lib/types";
import { Layers, FileText } from "lucide-react";

interface ComparisonViewProps {
  comparisons: DocumentComparison[];
}

export default function ComparisonView({ comparisons }: ComparisonViewProps) {
  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      <header className="border-b border-foreground/80 pb-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="box lbl text-primary border-primary">
            CHUYÊN ĐỀ VĂN KIỆN
          </span>
          <span className="w-8 h-px bg-primary" />
          <span className="lbl text-primary">NĂM 1930</span>
        </div>

        <h1
          className="font-semibold text-primary tracking-[-0.025em] leading-[1.08]"
          style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          Đối Chiếu Cương Lĩnh & Luận Cương 1930
        </h1>

        <p className="font-serif italic text-base text-muted-foreground">
          Bảng phân tích đối sánh khoa học giữa hai văn kiện nền tảng đầu tiên của Đảng Cộng sản Việt Nam.
        </p>
      </header>

      <div className="space-y-10">
        {comparisons.map((comp) => (
          <section key={comp.id} className="space-y-5">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <FileText className="size-4 text-primary" strokeWidth={1.5} />
              <span>{comp.title}</span>
            </h2>

            {/* Flat Edge-to-Edge Catalogue Table */}
            <div className="border border-foreground/80">
              <div className="grid grid-cols-1 md:grid-cols-12 bg-muted border-b border-foreground/80 lbl text-foreground">
                <div className="md:col-span-3 p-3.5 border-b md:border-b-0 md:border-r border-foreground/80">
                  TIÊU CHÍ ĐỐI CHIẾU
                </div>
                <div className="md:col-span-4 p-3.5 border-b md:border-b-0 md:border-r border-foreground/80 text-primary">
                  CƯƠNG LĨNH CHÍNH TRỊ (02/1930)
                </div>
                <div className="md:col-span-5 p-3.5 text-primary">
                  LUẬN CƯƠNG CHÍNH TRỊ (10/1930)
                </div>
              </div>

              <div className="divide-y divide-border">
                {comp.aspects.map((asp, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-12 hover:bg-muted/40 transition-colors"
                  >
                    <div className="md:col-span-3 p-3.5 lbl text-foreground border-b md:border-b-0 md:border-r border-border bg-muted/30">
                      {asp.criteria}
                    </div>
                    <div className="md:col-span-4 p-3.5 font-serif text-[15.5px] text-foreground border-b md:border-b-0 md:border-r border-border leading-relaxed">
                      {asp.docA.content || "—"}
                    </div>
                    <div className="md:col-span-5 p-3.5 font-serif text-[15.5px] text-foreground leading-relaxed">
                      {asp.docB.content || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytical Summary */}
            <div className="pl-5 border-l-2 border-primary py-1 space-y-1.5">
              <div className="lbl text-primary flex items-center gap-1.5">
                <Layers className="size-3.5 text-primary" strokeWidth={1.5} />
                <span>NHẬN ĐỊNH KHOA HỌC LỊCH SỬ</span>
              </div>
              <p className="font-serif text-[16px] text-foreground leading-relaxed">
                Cương lĩnh chính trị đầu tiên do Nguyễn Ái Quốc soạn thảo là một cương lĩnh giải phóng dân tộc đúng đắn, sáng tạo, kết hợp nhuần nhuyễn giữa chủ nghĩa Mác - Lênin với thực tiễn cách mạng thuộc địa. Luận cương tháng 10/1930 khẳng định nhiều vấn đề căn bản về chiến lược cách mạng nhưng còn hạn chế khi chưa đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
