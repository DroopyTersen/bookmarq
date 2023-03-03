import { Children, cloneElement, forwardRef } from "react";
import { SortProps } from "./table.types";

const CLASS_NAMES = "";

export type TableColumnsProps = React.HTMLProps<HTMLTableRowElement> &
  Partial<SortProps> & {
    children: React.ReactElement[];
  };

export const TableColumns = forwardRef<HTMLTableRowElement, TableColumnsProps>(
  function TableColumns({ sortDir, sortKey, onSort, className = "", children, ...rest }, ref) {
    const hasSorting = sortDir && sortKey && onSort;
    const headers = !hasSorting
      ? children
      : Children.map(children, (child) => {
          return cloneElement(child, {
            onSort,
            sortDir: child.props.id === sortKey ? sortDir : null,
          });
        });

    return (
      <thead>
        <tr ref={ref} {...rest} className={`${CLASS_NAMES} ${className}`}>
          {headers}
        </tr>
      </thead>
    );
  }
);
