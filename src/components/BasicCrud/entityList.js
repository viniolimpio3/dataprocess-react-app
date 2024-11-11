import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    TablePagination,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

function EntityList({ entities, columns, onEdit, onDelete }) {
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
                            {columns.map((col) => (
                                <TableCell key={col.name}>{col.label}</TableCell>
                            ))}
                            <TableCell align="right">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map((entity) => (
                            <TableRow key={entity.id}>
                                {columns.map((col) => (
                                    <TableCell key={col.name}>{entity[col.name]}</TableCell>
                                ))}
                                <TableCell align="right" sx={{display: "flex", flexDirection: "row"}}>
                                    <Button onClick={() => onEdit(entity)} variant="outlined" color="primary">
                                        <EditOutlined />
                                    </Button>

                                    <Button
                                        onClick={() => onDelete(entity.id)}
                                        variant="outlined"
                                        color="secondary"
                                        style={{ marginLeft: '5px' }}
                                    >
                                        <DeleteOutlined />
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
                count={entities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default EntityList;
