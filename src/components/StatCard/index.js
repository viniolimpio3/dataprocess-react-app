import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const icons = {
    People: <PeopleIcon fontSize="large" style={{ color: '#ff6f61' }} />,
    Folder: <FolderIcon fontSize="large" style={{ color: '#ffc107' }} />,
    LocalShipping: <LocalShippingIcon fontSize="large" style={{ color: '#4caf50' }} />,
};

function StatCard({ title, value, subtitle, icon }) {
    return (
        <Card sx={{ transition: '0.3s', '&:hover': { boxShadow: '0 6px 12px rgba(0,0,0,0.2)' } }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    {icons[icon]}
                    <Box ml={2}>
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="h4" fontWeight="bold">{value}</Typography>
                        <Typography color="textSecondary">{subtitle}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default StatCard;
