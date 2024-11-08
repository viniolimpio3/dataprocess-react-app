import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ContractsPieChart() {
    const data = {
        labels: ['Pendente', 'Aprovado', 'Rejeitado'],
        datasets: [
            {
                label: '# de Contratos',
                data: [80, 370, 50],
                backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Contratos</Typography>
                <Pie data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </CardContent>
        </Card>
    );
}

export default ContractsPieChart;
