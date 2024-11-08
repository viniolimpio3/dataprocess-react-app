import React from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Header({user}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
                <Typography variant="h5" fontWeight="bold">Bem vindo, {user.nome}</Typography>
                <Typography color="textSecondary">12 Setembro 2024</Typography>
            </Box>
            <Box>
                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>
                <IconButton onClick={handleMenuOpen}>
                    <Avatar alt="{user.nome}" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem>Perfil</MenuItem>
                    <MenuItem>Configurações</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

export default Header;
