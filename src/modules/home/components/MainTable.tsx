"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Dessert {
  id: number;
  name: string;
  calories: number;
  fat: number;
}

import { useState } from "react";
import DataTable from "@/components/DataTable";

export default function MainTable() {
  const [rows, setrows] = useState<Dessert[]>([
    { id: 1, name: "Frozen yoghurt", calories: 159, fat: 6.0 },
    { id: 2, name: "Ice cream sandwich", calories: 237, fat: 9.0 },
    { id: 3, name: "Eclair", calories: 262, fat: 16.0 },
  ]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { field: "name", header: "Dessert (100g serving)" },
    { field: "calories", header: "Calories" },
    {
      field: "fat",
      header: "Fat (g)",
      renderCell: (row: Dessert) => <strong>{row.fat} g</strong>, // Custom rendering
    },
    {
      field: "actions",
      header: "Actions",
      renderCell: (row: Dessert) => (
        <Stack spacing={2} direction="row">
          <Button
            startIcon={<VisibilityIcon />}
            size="small"
            variant="outlined"
            onClick={() => alert(`Row ID: ${row.id}`)}
          >
            ดูชั้นสิ้
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            color="error"
            variant="contained"
            onClick={() => alert(`Row ID: ${row.id}`)}
          >
            ลบชั้นสิ้
          </Button>
        </Stack>
      ),
    },
  ];

  // Handler for selecting all rows
  const handleSelectAll = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Handler for selecting a single row
  const handleSelectRow = (id: number): void => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
  };

  return (
    <>
      <Typography
        variant="h6"
        color="inherit"
        component="div"
        sx={{ marginBottom: 2 }}
      >
        HomePage
      </Typography>
      <Box sx={{ width: "100%" }}>
        <DataTable
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={rows.length}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          onRowSelect={(row) => handleSelectRow(row.id)}
          onRowClick={handleRowClick}
          onPageChange={(newPage) => setPage(newPage)}
          onRowsPerPageChange={(newRowsPerPage) =>
            setRowsPerPage(newRowsPerPage)
          }
        />
      </Box>
    </>
  );
}
