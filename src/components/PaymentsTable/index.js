import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function PaymentsTable() {
    const payments = [
        { id: 1, subject: 'Request for FARS for October 2022', date: '25/01/2023', status: 'Pendente' },
        { id: 2, subject: 'Request for project proposal fee', date: '19/01/2023', status: 'Aprovado' },
        { id: 3, subject: 'Request for FARS for October 2022', date: '10/01/2023', status: 'Aprovado' },
        { id: 4, subject: 'Request for project proposal fee', date: '03/01/2023', status: 'Pendente' },
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Pagamentos</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Assunto</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.id}</TableCell>
                                <TableCell>{payment.subject}</TableCell>
                                <TableCell>{payment.date}</TableCell>
                                <TableCell>{payment.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default PaymentsTable;
