import React from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, CssBaseline } from '@mui/material';
import Grid from "@mui/material/Grid2";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Relatorios() {
	const { user } = useAuth()
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, padding: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
					<Header user={user} />
					<Grid container spacing={3}>
						TODO: Relatórios
					</Grid>
				</Box>
			</Box>
		</>
	)
}
