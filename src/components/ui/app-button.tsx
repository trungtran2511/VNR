import React from "react";

export type ControlVariant = "primary" | "outline" | "ghost" | "segment";
export type ControlSize = "xs" | "sm" | "md" | "lg";

interface ControlStyleOptions {
  variant: ControlVariant;
  size: ControlSize;
  active: boolean;
  className: string;
}

const SIZE_CLASS: Record<ControlSize, string> = {
  xs: "h-[var(--control-h-xs)] px-3 text-[11px]",
  sm: "h-[var(--control-h-sm)] px-4 text-xs",
  md: "h-[var(--control-h-md)] px-4 text-xs",
  lg: "h-[var(--control-h-lg)] px-6 text-sm"
};

const VARIANT_CLASS: Record<Exclude<ControlVariant, "segment">, string> = {
  primary:
    "rounded-[var(--radius-control)] border border-primary bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "rounded-[var(--radius-control)] border border-[var(--border-control)] bg-card/70 text-foreground hover:border-[var(--border-control-strong)] hover:bg-muted",
  ghost:
    "rounded-[var(--radius-control)] border border-transparent bg-transparent text-foreground hover:bg-muted/60"
};

/** Segment: không tự có viền/bo góc — viền ngoài và bo góc do SegmentedControl đảm nhiệm. */
const SEGMENT_CLASS = {
  active: "rounded-none border-0 bg-primary text-primary-foreground",
  idle: "rounded-none border-0 bg-transparent text-foreground hover:bg-muted"
};

export function controlClassName({
  variant,
  size,
  active,
  className
}: ControlStyleOptions): string {
  const variantClass =
    variant === "segment"
      ? active
        ? SEGMENT_CLASS.active
        : SEGMENT_CLASS.idle
      : VARIANT_CLASS[variant];

  return [
    "lbl inline-flex items-center justify-center gap-2 whitespace-nowrap select-none cursor-pointer",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:opacity-35 disabled:cursor-not-allowed",
    SIZE_CLASS[size],
    variantClass,
    className
  ]
    .filter(Boolean)
    .join(" ");
}

interface ControlBaseProps {
  variant?: ControlVariant;
  size?: ControlSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  active?: boolean;
}

export interface AppButtonProps
  extends ControlBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface AppLinkProps
  extends ControlBaseProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function ControlContent({
  icon,
  iconRight,
  children
}: Pick<ControlBaseProps, "icon" | "iconRight"> & { children?: React.ReactNode }) {
  return (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  );
}

export function AppButton({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  active = false,
  className = "",
  children,
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={variant === "segment" ? active : undefined}
      className={controlClassName({ variant, size, active, className })}
      {...props}
    >
      <ControlContent icon={icon} iconRight={iconRight}>
        {children}
      </ControlContent>
    </button>
  );
}

/** Liên kết trông giống hệt AppButton (PDF gốc, mở tab mới...). */
export function AppLink({
  variant = "outline",
  size = "md",
  icon,
  iconRight,
  active = false,
  className = "",
  children,
  ...props
}: AppLinkProps) {
  return (
    <a className={controlClassName({ variant, size, active, className })} {...props}>
      <ControlContent icon={icon} iconRight={iconRight}>
        {children}
      </ControlContent>
    </a>
  );
}
