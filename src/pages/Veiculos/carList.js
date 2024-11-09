import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, TablePagination } from "@mui/material";
import { DeleteOutline, DeleteOutlined, Edit, EditOutlined } from "@mui/icons-material";

function CarList({ carros, onEdit, onDelete }) {
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Ano</TableCell>
                            <TableCell>Cor</TableCell>
                            <TableCell>Placa</TableCell>
                            <TableCell>Renavam</TableCell>
                            <TableCell align="right">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carros.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.modelo}</TableCell>
                                <TableCell>{car.ano}</TableCell>
                                <TableCell>{car.cor}</TableCell>
                                <TableCell>{car.placa}</TableCell>
                                <TableCell>{car.renavam}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => onEdit(car)} variant="outlined" color="primary">
                                        <EditOutlined /> Editar
                                    </Button>
                                    <Button onClick={() => onDelete(car.id)} variant="outlined" color="secondary" style={{ marginLeft: '5px' }}>
                                        <DeleteOutlined />
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={carros.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default CarList;
