import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import Grid from "@mui/material/Grid2";
import { Box, CssBaseline, Tab } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import api from "../../services/api";
import BasicCRUD from "../../components/BasicCrud";
import StatCard from "../../components/StatCard";
import Util from "../../helpers/Util";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { toast } from "react-toastify";
import EntityList from "../../components/BasicCrud/entityList";

export default function Fornecedores() {
    const [value, setValue] = React.useState('1');
    const { user } = useAuth();
    const [dashInfos, setDashInfos] = useState({});
    const [pagamentos, setPagamentos] = useState([]);
    const [editingEntity, setEditingEntity] = useState(null);

    const entityName = 'fornecedor'

    useEffect(() => {
        buscaDashInfos()
        buscaPagamentos()
    }, []);

    const buscaDashInfos = async () => {
        try {
            const response = await api.get(`/api/v1/${entityName}/Dash`, Util.getApiAuthHeader());
            if (response.status === 200)
                setDashInfos(response.data.data);
        } catch (ex) {
            toast.error(`Erro ao carregar Dash de ${entityName}. `, ex);
        }
    }

    const buscaPagamentos = async () => {
		try {
			const response = await api.get(`/api/v1/${entityName}/Pagamentos`, Util.getApiAuthHeader());
			if (response.status === 200)
				setPagamentos(response.data.data);
		} catch (ex) {
			toast.error(`Erro ao carregar pagamentos! `, ex);
		}
	}

    const fornecedorFields = [
        { name: "nome", label: "Nome" },
        { name: "tipoFornecedor", label: "Tipo" },
        { name: "endereco", label: "Endereço" },
        { name: "telefones", label: "Telefones" },
        { name: "status", label: "Status", hidden: true, defaultValue: "true" },
        { name: "email", label: "E-mail" },
        { name: "formaPagamento", label: "Forma Pag.", inputDisabled: true },
        { name: "dadosPagamento", label: "Dados Pag.", inputDisabled: true }   
    ]

    const subEntities = [{
        inputName: "idFormaPagamento",
        name: "formaPagamento",
        label: "Forma Pag.",
        columnRef: 'tipo',
		canCreate: false
    }];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formaPagamentoFields = [
		{ name: "tipo", label: "Tipo" },
		{ name: "dadosDePagamento", label: "Dados de Pagamento" },
		{ name: "status", label: "Status", type: "boolean", defaultValue: "true", hidden: true},
		{ name: "parcelas", label: "Parcelas", type: "text", defaultValue: "N/A" }
	]

    const columnsPagamentos = [
		{ name: 'nome', label: 'Nome' },
        { name: "tipoFornecedor", label: "Tipo"},
        { name: "telefones", label: "Telefones"},
        { name: "email", label: "Email"},
        { name: "formaPagamento", label: "Forma Pag."},
        { name: "dadosPagamento", label: "Dados Pag."},
        { name: "valor", label: "valor"}
	]

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Sidebar />
            <Box className="main-overflow-auto" component="main" sx={{ p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
                <Header user={user} />
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: "hidden",}} className="bg-w">
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Dashboard" value="1" />
                            <Tab label="Formas Pag." value="2" />
                            <Tab label="Pagamentos" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className="bg-w">
                        <Grid container spacing={3}>
                            <Grid item size={{ xs: 12, md: 4 }} >
                                <StatCard title="Gasto Total" value={dashInfos?.gastoFornecedores?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon="Money" />
                            </Grid>
                            <Grid item size={{ xs: 12, md: 4 }} >
                                <StatCard title="Qtd. Fornecedores" value={dashInfos?.countFornecedores} subtitle="" icon="People" />
                            </Grid>
                            <Grid item size={{ xs: 12, md: 4 }} >
                                <StatCard title="Valor A Pagar" value={dashInfos?.valorAPagar} subtitle="" icon="Money" />
                            </Grid>
                            <Grid item size={{ xs: 12 }} sx={{ maxWidth: '100%' }} >
                                <BasicCRUD
                                    api={api}
                                    entityName={entityName}
                                    fields={fornecedorFields}
                                    requiredFields={[
                                        'nome',
                                        'tipoFornecedor',
                                        'endereco',
                                        'telefones',
                                    ]}
                                    subEntities={subEntities}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2" className="bg-w">
						<BasicCRUD
							api={api}
							entityName={"formaPagamento"}
							fields={formaPagamentoFields}
							requiredFields={['tipo', 'status', 'dadosDePagamento']}
						/>

					</TabPanel>
                    <TabPanel value="3" className="bg-w">
                        <EntityList
                            entities={pagamentos}
                            onEdit={setEditingEntity}
                            onDelete={() => {}}
                            action={false}
                            columns={columnsPagamentos}
                        />
                    </TabPanel>
                    
                </TabContext>
            </Box>
        </Box>
    )
}
