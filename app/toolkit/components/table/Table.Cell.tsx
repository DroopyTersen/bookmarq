import { forwardRef, HTMLProps } from "react";

const CLASS_NAMES = "bg-white";

export type TableCellProps = HTMLProps<HTMLTableCellElement> & {
  as?: "td" | "th";
};

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className = "", as, children, ...rest },
  ref
) {
  let Cell = as || "td";
  return (
    <Cell ref={ref} className={`${CLASS_NAMES} ${className}`} {...rest}>
      {children}
    </Cell>
  );
});
