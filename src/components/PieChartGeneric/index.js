import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Util from '../../helpers/Util';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartGeneric({ labels, data, title, sx = {} }) {
    const _data = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: labels.map(f => Util.generateColor())
            },
        ],
    };

    return (
        <Card sx={sx}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>

                <Pie data={_data} options={{ plugins: { legend: { position: 'top' } } }} />
            </CardContent>
        </Card>
    );
}

export default PieChartGeneric;
