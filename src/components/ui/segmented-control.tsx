import React from "react";
import { AppButton, type ControlSize } from "./app-button";
import { cn } from "../../lib/utils";

export interface SegmentItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onSelect: () => void;
}

interface SegmentedControlProps {
  items: SegmentItem[];
  size?: ControlSize;
  ariaLabel: string;
  className?: string;
}

export function SegmentedControl({
  items,
  size = "xs",
  ariaLabel,
  className = ""
}: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("inline-flex items-stretch overflow-hidden rounded-[var(--radius-control)] border border-[var(--border-control)] bg-card/70 divide-x divide-[var(--border-control)]", className)}
    >
      {items.map((item) => (
        <AppButton
          key={item.key}
          variant="segment"
          size={size}
          active={item.active}
          icon={item.icon}
          onClick={item.onSelect}
        >
          {item.label}
        </AppButton>
      ))}
    </div>
  );
}
