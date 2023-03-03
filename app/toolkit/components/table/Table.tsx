import { forwardRef, HTMLProps } from "react";
import { TableBody } from "./Table.Body";
import { TableCell } from "./Table.Cell";
import { TableColumn } from "./Table.Column";
import { TableColumns } from "./Table.Columns";
import { TableRow } from "./Table.Row";

const CLASS_NAMES = "table w-full";

type TableProps = HTMLProps<HTMLTableElement>;

function TableComponent({ className = "overflow-x-auto", children, ...rest }, ref) {
  return (
    <div className="relative mt-4 overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
      <table ref={ref} className={`${CLASS_NAMES} ${className}`} {...rest}>
        {children}
      </table>
    </div>
  );
}

type CompoundComponents = {
  Row: typeof TableRow;
  Columns: typeof TableColumns;
  Column: typeof TableColumn;
  Body: typeof TableBody;
  Cell: typeof TableCell;
};

export let Table: typeof TableComponent & CompoundComponents = forwardRef<
  HTMLTableElement,
  TableProps
>(TableComponent) as any;

Table.Row = TableRow;
Table.Columns = TableColumns;
Table.Column = TableColumn;
Table.Body = TableBody;
Table.Cell = TableCell;
