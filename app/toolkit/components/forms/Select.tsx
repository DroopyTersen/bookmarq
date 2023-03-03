import { forwardRef } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  // eslint-disable-next-line
  function Select({ className, children, ...rest }, ref) {
    return (
      <select className={getSelectClasses(className)} ref={ref} {...rest}>
        {children}
      </select>
    );
  }
);

export type SelectProps = React.HTMLProps<HTMLSelectElement> & {
  className?: string;
  children: React.ReactNode;
};

// mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md
let getSelectClasses = (className = "") =>
  [
    "select focus:select-accent select-bordered text-white bg-transparent w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");
