import { forwardRef, HTMLProps } from "react";

const CLASS_NAMES = "";

export type TableRowProps = HTMLProps<HTMLTableRowElement>;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className = "", children, ...rest },
  ref
) {
  return (
    <tr ref={ref} className={`${CLASS_NAMES} ${className}`} {...rest}>
      {children}
    </tr>
  );
});
