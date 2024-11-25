import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, CssBaseline, Tab } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Grid from "@mui/material/Grid2";
import Util from "../../helpers/Util";
import StatCard from "../../components/StatCard";
import { toast } from "react-toastify";

export default function Financeiro() {
	const { user } = useAuth();
	const [value, setValue] = React.useState('1');
	const [dashInfos, setDashInfos] = useState({});

	const handleChange = (event, newValue) => {
        setValue(newValue);
    };

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar />
				<Box className="main-overflow-auto" component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
					<Header user={user} />

					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: "hidden", }} className="bg-w">
							<TabList onChange={handleChange} aria-label="lab API tabs example">
								<Tab label="Dashboard" value="1" />
								<Tab label="Entradas" value="2" />
								<Tab label="Saídas" value="3" />
							</TabList>
						</Box>
						<TabPanel value="1" className="bg-w">
							Dash
							<Grid container spacing={3}>
								<Grid item size={{ xs: 12, md: 6 }} >
									<StatCard title="Qtd. Veículos" value={dashInfos?.qtdVeiculos} subtitle="Veículos próprios e de funcionários" icon="Money" />
								</Grid>
								<Grid item size={{ xs: 12, md: 6 }} >
									<StatCard title="Gastos Totais" value={Util.BRL(dashInfos?.gastosTotais)} subtitle="Saídas, abastecimentos e mecânico" icon="People" />
								</Grid>
								<Grid item size={{ xs: 12, md: 4 }} >
									<StatCard title="Abastecimentos" value={Util.BRL(dashInfos?.gastoAbastecimento)} subtitle="" icon="Money" />
								</Grid>
								<Grid item size={{ xs: 12, md: 4 }} >
									<StatCard title="Gastos adicionais" value={Util.BRL(dashInfos?.gastosAdicionais)} subtitle="" icon="MaintenanceCar" />
								</Grid>
								<Grid item size={{ xs: 12, md: 4 }} >
									<StatCard title="Valor A Pagar" value={Util.BRL(dashInfos?.valorAPagar)} subtitle="" icon="Debt" />
								</Grid>
							</Grid>
						</TabPanel>
						<TabPanel value="2" className="bg-w">
							Entradas
							{/* <Entradas /> */}
						</TabPanel>
						<TabPanel value="3" className="bg-w">
							Saídas
							{/* <Saidas /> */}
						</TabPanel>
					</TabContext>
				</Box>
			</Box>
		</>
	)
}
