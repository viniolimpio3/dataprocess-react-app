import React from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, Grid2 as Grid, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Relatorios() {
	const { user } = useAuth()
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
					<Header user={user} />
					<Grid container spacing={3}>
						TODO: Relatórios
					</Grid>
				</Box>
			</Box>
		</>
	)
}
