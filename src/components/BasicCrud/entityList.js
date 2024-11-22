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

function EntityList({ entities, columns, onEdit, onDelete, action = true, customAction }) {
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
        <Paper sx={{ width: '100%'}}>
            <TableContainer component={Paper} 
                sx={{ 
                    maxHeight: 500,
                    maxWidth: '100% !important',
                    overflowX: 'auto'
                }}
            >
                <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 750 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => {
                                if (col.hidden !== true)
                                    return (
                                        <TableCell
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                            key={col.name}
                                        >
                                            {col.label}
                                        </TableCell>
                                    )
                            })}
                            {action &&
                                <TableCell align="right">Ação</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map((entity) => (
                            <TableRow key={entity.id}>
                                {columns.map((col) => {
                                    if (col.hidden !== true)
                                        return (
                                            <TableCell 
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }} 
                                                key={col.name}
                                            >
                                                {entity[col.name]}
                                            </TableCell>
                                        )
                                })}
                                {action &&
                                    <TableCell align="right" sx={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
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
                                }
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
