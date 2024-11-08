import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const items = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Recursos Humanos', icon: <PeopleIcon /> },
    { text: 'Gestão de Fretes', icon: <LocalShippingIcon /> },
    { text: 'Financeiro', icon: <AttachMoneyIcon /> },
];

function Sidebar() {
    return (
        <Drawer variant="permanent" sx={{ width: 240, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#2C2C2E', color: '#FFFFFF' } }}>
            <Box p={2} textAlign="center">
                <Typography variant="h6" fontWeight="bold">Data Process</Typography>
            </Box>
            <List>
                {items.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon sx={{ color: '#FFFFFF' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
