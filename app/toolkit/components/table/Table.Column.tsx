import { forwardRef, HTMLProps } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SortProps } from "./table.types";

const CLASS_NAMES = "relative flex items-center gap-1 pr-4";

export type TableColumnProps = HTMLProps<HTMLTableCellElement> &
  Partial<SortProps> & {
    id?: string;
    as?: "td" | "th";
  };

export const TableColumn = forwardRef<HTMLTableCellElement, TableColumnProps>(function TableColumn(
  { sortDir, id, onSort, className = "", as = "th", children, ...rest },
  ref
) {
  const SortIcon = sortDir === "asc" ? FaChevronDown : sortDir === "desc" ? FaChevronUp : null;
  const isSortable = onSort && id;
  const sortableClassNames = isSortable ? "cursor-pointer" : "";
  let Cell = as || "th";

  return (
    <Cell
      ref={ref}
      role={isSortable ? "button" : undefined}
      onClick={isSortable ? (e) => onSort(id) : undefined}
      className={`${isSortable ? "sortable" : ""} ${className}`}
      {...rest}
    >
      <div className={`${CLASS_NAMES} ${sortableClassNames}`}>
        <div>{children}</div>
        {SortIcon && <SortIcon className="absolute top-0 right-0 h-full" />}
      </div>
    </Cell>
  );
});
