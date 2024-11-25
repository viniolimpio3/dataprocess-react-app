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
import Entradas from "./Entradas";
import Saidas from "./Saidas";

export default function Financeiro() {
	const { user } = useAuth();
	const [value, setValue] = React.useState('1');
	const [dashInfos, setDashInfos] = useState({});

	useEffect(() => {
        buscaDashInfos()
    }, []);

	const handleChange = (event, newValue) => {
        setValue(newValue);
    };

	const buscaDashInfos = async () => {
        try {
            const response = await api.get(`/api/v1/entrada/Dash`, Util.getApiAuthHeader());
            if (response.status === 200)
                setDashInfos(response.data.data);
        } catch (ex) {
            toast.error(`Erro ao carregar Dash de entrada. `, ex);
        }
    }

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
							<Grid container spacing={3}>								
								<Grid item size={{ xs: 12, md: 6 }} >
									<StatCard title="Entradas" value={Util.BRL(dashInfos?.entradas)} subtitle="" icon="Money" />
								</Grid>
								<Grid item size={{ xs: 12, md: 6 }} >
									<StatCard title="Saídas" value={Util.BRL(dashInfos?.saidas)} subtitle="" icon="Debt" />
								</Grid>
								<Grid item size={{ xs: 6 }} >
									<StatCard title="Lucro" value={Util.BRL(dashInfos?.lucro)} subtitle="" icon="Money" />
								</Grid>
							</Grid>
						</TabPanel>
						<TabPanel value="2" className="bg-w">
							<Entradas />
						</TabPanel>
						<TabPanel value="3" className="bg-w">
							<Saidas />
						</TabPanel>
					</TabContext>
				</Box>
			</Box>
		</>
	)
}
