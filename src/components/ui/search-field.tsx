import { Search, X } from "lucide-react";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export function SearchField({
  value,
  onChange,
  placeholder,
  className = ""
}: SearchFieldProps) {
  return (
    <label
      className={`flex items-center gap-2 h-[var(--control-h-xs)] px-3 rounded-[var(--radius-control)] border border-[var(--border-control)] bg-card/70 transition-colors focus-within:border-primary hover:border-[var(--border-control-strong)] ${className}`}
    >
      <Search className="size-3.5 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Xóa nội dung tìm kiếm"
          onClick={() => onChange("")}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" strokeWidth={1.5} />
        </button>
      )}
    </label>
  );
}
