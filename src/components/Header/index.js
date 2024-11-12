import React from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

function Header({user}) {
    const _nav = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dateF = new Intl.DateTimeFormat('pt-BR', {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        _nav('/logout');
    }

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
                <Typography variant="h5" fontWeight="bold">Bem vindo, {user.nome}</Typography>
                <Typography color="textSecondary">{dateF.format(new Date())}</Typography>
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
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

export default Header;
