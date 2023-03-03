import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  // eslint-disable-next-line
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} {...rest} className={getInputClasses(className)} />;
  }
);

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  className?: string;
};

export const getInputClasses = (className = "") =>
  [
    "input w-full focus:input-accent input-bordered text-white bg-transparent disabled:text-white/70 disabled:bg-white/10",
    className,
  ]
    .filter(Boolean)
    .join(" ");
