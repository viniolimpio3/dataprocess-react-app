import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function EmployeeList() {
    const employees = [
        { id: 1, name: 'Abubakar Ismaila Goje', function: 'Admin', designation: 'Human Resource Dept.' },
        { id: 2, name: 'Ifeanyi Obinna', function: 'Admin', designation: 'Management' },
        { id: 3, name: 'Bankole Olanrewaju', function: 'HOD IT', designation: 'Peoples and Operation' },
        { id: 4, name: 'Chidinma Ebere', function: 'HOD Account', designation: 'Accounts' },
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Lista de Funcionários</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Função</TableCell>
                            <TableCell>Designação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.function}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default EmployeeList;
