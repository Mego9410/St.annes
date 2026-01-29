import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder = "Choose...", className, onValueChange, ...props }, ref) => {
    return (
      <div className={cn("relative inline-block w-full min-w-[200px]", className)}>
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full appearance-none items-center justify-between rounded-lg border border-input bg-background px-4 py-2 pr-10 text-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&>option]:bg-background"
          )}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
          aria-hidden
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
