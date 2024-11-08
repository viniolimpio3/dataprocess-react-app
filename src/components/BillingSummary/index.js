import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BillingSummary() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Despesas',
        data: [300, 500, 400, 600, 800, 700, 900, 1000, 800, 600, 700, 500],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Dívidas',
        data: [100, 200, 150, 200, 250, 300, 200, 150, 100, 200, 250, 300],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Lucros',
        data: [200, 400, 300, 500, 600, 800, 700, 900, 700, 400, 500, 700],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Resumo de Faturamento</Typography>
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </CardContent>
    </Card>
  );
}

export default BillingSummary;
