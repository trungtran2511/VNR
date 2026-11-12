import React, { useEffect } from "react";
import {
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  X,
  Sparkles,
  School
} from "lucide-react";
import { AppButton } from "./ui/app-button";

interface TeamInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamInfoModal({ isOpen, onClose }: TeamInfoModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in-50 duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-[var(--border-control-strong)] bg-card text-foreground shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150"
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 border-b border-border bg-muted/40 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Đóng hộp thoại"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="box lbl text-primary border-primary">BÁO CÁO SPST 2026</span>
              <span className="w-6 h-px bg-primary" />
              <span className="lbl text-muted-foreground font-semibold">LỚP IA1902</span>
            </div>
            <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-primary">
              Thông Tin Nhóm & Đề Tài SPST
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sản phẩm Sáng tạo môn học Lịch sử Đảng Cộng sản Việt Nam (Giáo trình 2026).
            </p>
          </div>
        </div>

        {/* Nội dung chi tiết */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
          {/* Khối Thông tin Lớp & Giảng viên */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Users className="size-3.5 text-primary" /> Nhóm thực hiện
              </div>
              <div className="text-sm font-bold text-foreground">Nhóm 1</div>
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <School className="size-3.5 text-primary" /> Lớp học phần
              </div>
              <div className="text-sm font-bold text-foreground">IA1902</div>
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-primary" /> Giảng viên
              </div>
              <div className="text-sm font-bold text-foreground">Cô THUYNT245</div>
            </div>
          </div>

          {/* Tên đề tài & Mục tiêu */}
          <div className="p-4 rounded-xl border border-primary/25 bg-primary/5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Đề tài Sản phẩm Sáng tạo
            </div>
            <h3 className="font-display text-base font-semibold text-foreground leading-snug">
              Số Hóa Giáo Trình & Không Gian Tương Tác 3D Lịch Sử Đảng Cộng Sản Việt Nam
            </h3>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-body text-justify">
              Dự án chuyển hóa toàn bộ kiến thức giáo trình chính thống 2026 thành hệ sinh thái học tập số trực quan,
              giúp sinh viên nắm vững tiến trình cách mạng giải phóng dân tộc (1930 - 1975) qua bản đồ chiến dịch tương tác,
              sơ đồ tư duy và hệ thống minigame phong phú.
            </p>
          </div>

          {/* Điểm sáng tạo & Thống kê sản phẩm */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Award className="size-3.5 text-primary" /> Các tính năng nổi bật của sản phẩm
            </div>
            <div className="space-y-2 text-xs text-foreground/90 font-medium">
              <div className="p-2.5 rounded-lg border border-border bg-card flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Kệ sách 3D tương tác (3D Curved Shelf) hoạt họa lật mở bìa sách retro VHS.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-card flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Bản đồ 15 mốc chiến dịch với 100% ảnh tư liệu lịch sử thật và thuyết minh âm thanh.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-card flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Hệ thống mũi tên dòng thời gian thể hiện bước ngoặt thống nhất 2 miền Nam - Bắc.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-card flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>6 Chế độ chơi: Flashcards Leitner, Xếp mốc sử, Ghép cặp, Đoán sự kiện, Ô chữ, Thi thử.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-card flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Cẩm nang ôn thi 1 trang khổ A4 và nhạc nền Mashup Còn Gì Đẹp Hơn x Nhà Tôi Có Treo Một Lá Cờ.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
          <span className="text-[11px] text-muted-foreground font-mono">
            Học kỳ Fall 2026 • Đại học FPT
          </span>
          <AppButton variant="primary" size="xs" onClick={onClose}>
            ĐÓNG
          </AppButton>
        </div>
      </div>
    </div>
  );
}
