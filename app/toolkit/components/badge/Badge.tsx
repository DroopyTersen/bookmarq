import { Link } from "@remix-run/react";

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
  showBullet?: boolean;
  onRemove?: () => void;
  as?: "button" | "div" | typeof Link;
  [key: string]: any;
}

const colors = {
  yellow: "text-yellow-800 bg-yellow-200",
  primary: "text-primary-800 bg-primary-200",
  gray: "text-gray-800 bg-gray-200",
};

const sizes = {
  sm: "text-sm",
  base: "",
  lg: "text-lg",
};

export function Badge({
  children,
  className = "",
  color = "primary",
  size = "base",
  showBullet = true,
  onRemove,
  as,
  ...rest
}: BadgeProps) {
  let Elem: any = as || (rest?.onClick ? "button" : "div");
  return (
    <Elem
      className={`${
        onRemove ? "pl-4 pr-0" : "px-4"
      } py-[.25rem] shadow-sm relative inline-flex box-border text-bas items-center  font-medium rounded-full w-fits ${
        colors[color]
      } ${sizes[size]} ${className}`}
      {...rest}
    >
      {showBullet !== false && (
        <span>
          <svg
            className={`-ml-1 mr-1.5 h-2 w-[8px] opacity-60`}
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
        </span>
      )}

      {children}
      {onRemove && (
        <button
          type="button"
          className={`flex items-center justify-center ml-1 -my-1 rounded-full cursor-pointer ${
            size === "sm" ? "w-6 h-6" : "w-7 h-7"
          } hover:bg-gray-100/20 active:bg-gray-100/40`}
          onClick={() => onRemove()}
        >
          <span className="sr-only">Remove</span>
          <svg className="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </Elem>
  );
}
