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

export default function Veiculos() {
	const { user } = useAuth()
	const [value, setValue] = React.useState('1');
	const [dashInfos, setDashInfos] = useState({});

	const carrosFields = [
		{ label: "Modelo", name: "modelo", type: "text" },
		{ label: "Ano", name: "ano", type: "number" },
		{ label: "Cor", name: "cor", type: "text" },
		{ label: "Placa", name: "placa", type: "text" },
		{ label: "Renavam", name: "renavam", type: "text" }
	]

	useEffect(() => {
        buscaDashInfos()
    }, []);

	const entityName = 'carro'
	const requiredFields = ["nome", "nascimento", "idTipoFuncionario"]

	const validation = (formData) => {
		// Validação de placa
		const padraoAntigo = /^[A-Z]{3}-\d{4}$/; // Ex: ABC-1234
        const padraoMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/; // Ex: ABC1D23

		if(!(padraoAntigo.test(formData.placa) || padraoMercosul.test(formData.placa))){
			return {
				success: false,
				message: "Placa inválida. Use o formato 'ABC-1234' ou 'ABC1D23'."
			}
		}
        return {
			success: true
		}
	}


	const handleChange = (event, newValue) => {
        setValue(newValue);
    };

	const buscaDashInfos = async () => {
        try {
            const response = await api.get(`/api/v1/${entityName}/Dash`, Util.getApiAuthHeader());
            if (response.status === 200)
                setDashInfos(response.data.data);
        } catch (ex) {
            toast.error(`Erro ao carregar Dash de ${entityName}. `, ex);
        }
    }

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, padding: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
				<Header user={user} />
				<TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: "hidden",}} className="bg-w">
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Dashboard" value="1" />
                            <Tab label="Veículos" value="2" />
                            <Tab label="Manutenções" value="3" />
							<Tab label="Abastecimentos" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className="bg-w">
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
						<BasicCRUD
							api={api}
							entityName={"carro"}
							fields={carrosFields}
							requiredFields={requiredFields}
							customValidationFunction={validation}
						/>
					</TabPanel>
                    <TabPanel value="3" className="bg-w">
						Manutenções
						{/* <BasicCRUD
							api={api}
							entityName={"manutencao"}
							fields={manutencaoFields}
							requiredFields={requiredFieldsManutencao}
							customValidationFunction={validation}
						/> */}
                    </TabPanel>
					<TabPanel value="4" className="bg-w">
						Abastecimentos
						{/* <BasicCRUD
							api={api}
							entityName={"manutencao"}
							fields={manutencaoFields}
							requiredFields={requiredFieldsManutencao}
							customValidationFunction={validation}
						/> */}
                    </TabPanel>
                    
                </TabContext>

			</Box>
		</Box>
	)
}
