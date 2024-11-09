import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, Grid2 as Grid, CssBaseline, CardContent } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';
import EmployeeList from '../../components/EmployeeList';
import BillingSummary from '../../components/BillingSummary';
import PaymentsTable from '../../components/PaymentsTable';
import ContractsPieChart from '../../components/ContractsPieChart';


import { Container, SideBar, MainContent, FilterContainer } from "./styles.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const { user } = useAuth()
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
					<Header user={user} />
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							<StatCard title="Total de colaboradores" value="250" subtitle="+12% do que nos últimos 3 meses" icon="People" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<StatCard title="Contratos" value="100" subtitle="-2% do que nos últimos 3 meses" icon="Folder" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<StatCard title="Entregas" value="10" subtitle="+20% do que nos últimos 3 meses" icon="LocalShipping" /></Grid>
						<Grid item xs={12} md={8}>
							<EmployeeList />
						</Grid>
						<Grid item xs={12} md={4}>
							<BillingSummary />
						</Grid>
						<Grid item xs={12} md={6}>
							<PaymentsTable />
						</Grid>
						<Grid item xs={12} md={6}>
							<ContractsPieChart />
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	)
}
