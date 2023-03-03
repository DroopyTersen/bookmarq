import React from "react";

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  // eslint-disable-next-line
  function Radio({ children, value, className, ...rest }, ref) {
    const cssClass = ["form-check", "align-middle", className]
      .filter(Boolean)
      .join(" ");
    return (
      <div className={cssClass}>
        <input
          className="form-check-input"
          type="radio"
          id={value}
          value={value}
          ref={ref}
          {...rest}
        />
        <label className="cursor-pointer form-check-label" htmlFor={value}>
          {children}
        </label>
      </div>
    );
  }
);
export type RadioProps = React.HTMLProps<HTMLInputElement> & {
  value: string;
  children: React.ReactNode;
  className?: string;
};
