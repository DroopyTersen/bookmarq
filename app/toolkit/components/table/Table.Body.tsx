import { forwardRef, HTMLProps } from "react";

const CLASS_NAMES = "";

export type TableBodyProps = HTMLProps<HTMLTableSectionElement>;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className = "", children, ...rest },
  ref
) {
  return (
    <tbody ref={ref} className={`${CLASS_NAMES} ${className}`} {...rest}>
      {children}
    </tbody>
  );
});
