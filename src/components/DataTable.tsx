import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TablePagination,
  Box,
} from "@mui/material";

interface Column<T = Record<string, any>> {
  field: keyof T | string; // Keys of the row type or a custom string
  header: string;
  renderCell?: (row: T) => React.ReactNode; // Custom cell renderer
}

interface DataTableProps<T = Record<string, any>> {
  columns: Column<T>[];
  rows: T[];
  page: number;
  rowsPerPage: number;
  totalRows: number;
  selectedRows?: number[]; // Array of selected rows
  onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for select all checkbox
  onRowSelect?: (row: T) => void;
  onRowClick?: (row: T) => void; // Handler for row click
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  rows,
  page,
  rowsPerPage,
  totalRows,
  selectedRows = [],
  onSelectAll,
  onRowSelect,
  onRowClick,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps<T>) => {
  const isAllSelected =
    rows.length > 0 && rows.every((row) => selectedRows.includes(row.id));

  const isIndeterminate =
    rows.some((row) => selectedRows.includes(row.id)) && !isAllSelected;

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {onRowSelect && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={onSelectAll}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.field as string}>
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                onClick={() => onRowClick && onRowClick(row)} // Trigger the onRowClick callback
                style={{ cursor: onRowClick ? "pointer" : "default" }} // Change cursor style if onRowClick is defined
              >
                {onRowSelect && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => onRowSelect(row)}
                    />
                  </TableCell>
                )}
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    {column.renderCell
                      ? column.renderCell(row)
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
};
export default DataTable;
