import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onSelect: () => void;
}

interface AppDropdownProps {
  label: string;
  icon?: React.ReactNode;
  items: DropdownItem[];
  activeKey?: string;
  className?: string;
}

export function AppDropdown({
  label,
  icon,
  items,
  activeKey,
  className = ""
}: AppDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tìm item đang được active
  const activeItem = items.find((item) => item.key === activeKey || item.active);

  // Đóng dropdown khi bấm ra ngoài hoặc nhấn phím Escape
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "lbl inline-flex items-center justify-between gap-2 px-3 py-1.5 h-[var(--control-h-xs)] text-xs rounded-[var(--radius-control)] border transition-colors select-none cursor-pointer shrink-0",
          open
            ? "border-primary bg-primary text-primary-foreground font-semibold shadow-sm"
            : "border-[var(--border-control)] bg-card text-foreground hover:border-[var(--border-control-strong)] hover:bg-muted"
        )}
      >
        <span className="inline-flex items-center gap-1.5 truncate">
          {activeItem?.icon || icon}
          <span>{label}</span>
        </span>
        <ChevronDown
          className={cn("size-3 shrink-0 transition-transform duration-150", open && "rotate-180")}
          strokeWidth={1.5}
        />
      </button>

      {/* Menu thả xuống nổi phía trên (z-50 không bị che khuất) */}
      {open && (
        <div
          role="menu"
          className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-[220px] rounded-[var(--radius-control)] border border-[var(--border-control-strong)] bg-card shadow-2xl animate-in fade-in-50 zoom-in-95 duration-100 overflow-hidden divide-y divide-border"
        >
          <div className="lbl text-[11px] text-muted-foreground px-3 py-1.5 bg-muted font-semibold uppercase tracking-wider">
            CHỌN CHUYÊN ĐỀ
          </div>
          <div className="py-1">
            {items.map((item) => {
              const isSelected = item.key === activeKey || item.active;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    item.onSelect();
                    setOpen(false);
                  }}
                  className={cn(
                    "lbl w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors cursor-pointer select-none",
                    isSelected
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon && <span className="size-3.5 shrink-0 text-primary">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
