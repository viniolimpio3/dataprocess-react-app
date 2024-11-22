import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, Button, CssBaseline, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Grid from "@mui/material/Grid2";
import api from "../../services/api";
import StatCard from "../../components/StatCard";
import EntityList from "../../components/BasicCrud/entityList";
import BasicCRUD from "../../components/BasicCrud";
import EntityForm from "../../components/BasicCrud/entityForm";
import Util from "../../helpers/Util";
import { toast } from "react-toastify";
import { AddCircleOutlineOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import PieChartGeneric from "../../components/PieChartGeneric";

export default function Rh() {
	const { user } = useAuth()
	const entityName = 'funcionario'
	const customValidationFunction = false

	// Padrão ---
	const [value, setValue] = React.useState('1');
	const [entities, setEntities] = useState([]);
	const [editingEntity, setEditingEntity] = useState(null);
	const [dashInfos, setDashInfos] = useState({});
	const [folha, setFolha] = useState([]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const fetchEntities = async () => {
		try {
			const response = await api.get(`/api/v1/${entityName}`, Util.getApiAuthHeader());
			if (response.status === 200) setEntities(response.data.data);
		} catch (ex) {
			toast.error(`Erro ao carregar ${entityName}! `, ex);
		}
	};

	useEffect(() => {
		fetchEntities();
		buscaDashInfos();
		buscaFolha();
	}, []);

	const handleAddEntity = async (newEntity) => {
		try {
			const response = await api.post(`/api/v1/${entityName}`, newEntity, Util.getApiAuthHeader());
			if (response.status === 201) {
				setEntities([...entities, response.data.data]);
				setEditingEntity(null);
				toast.success("Criado com sucesso!");
			}
		} catch {
			console.error(`Erro ao adicionar ${entityName}!`);
		}
	};

	const handleUpdateEntity = async (updatedEntity) => {
		try {
			const response = await api.put(`/api/v1/${entityName}/${updatedEntity.id}`, updatedEntity, Util.getApiAuthHeader());
			if (response.status === 200) {
				setEntities(entities.map(entity => entity.id === updatedEntity.id ? updatedEntity : entity));
				setEditingEntity(null);
				toast.success("Atualizado com sucesso");
			}
		} catch {
			console.error(`Erro ao atualizar ${entityName}!`);
		}
	};

	const handleDeleteEntity = async (id) => {
		try {
			await api.delete(`/api/v1/${entityName}/${id}`, Util.getApiAuthHeader());

			toast.success("Deletado com sucesso");
			setEntities(entities.filter(entity => entity.id !== id));
		} catch {
			console.error(`Erro ao deletar ${entityName}!`);
		}
	};

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};


	// Custom --------
	const funcionariosFields = [
		{ label: "Nome", name: "nome" },
		{ label: "Nascimento", name: "nascimento", type: "date" },
		{ label: "Celular", name: "celular" },
		{ label: "endereco", name: "endereco" }
	]

	const requiredFields = ["nome", "nascimento", "idTipoFuncionario"]

	const subEntities = [{
		inputName: "idTipoFuncionario",
		name: "tipoFuncionario",
		label: "Tipo de Funcionário",
		columnRef: 'descricao'
	},
	{
		inputName: "idFormaPagamento",
		name: "forma Pagamento",
		label: "Forma Pag.",
		columnRef: 'tipo'
	}]

	const columnsFolha = [
		{ name: 'funcionarioId', label: 'Id' },
		{ name: 'nome', label: 'Funcionário' },
		{ name: 'valorAPagar', label: 'Valor a Pagar' },
		{ name: 'totalFretes', label: 'Qtd. Viagens' }
	]

	const columnsFunc = [
		{ name: "id", label: "Id" },
		{ name: "nome", label: "Nome" },
		{ name: "nascimento", label: "Nascimento" },
		{ name: "celular", label: "Celular" },
		{ name: "endereco", label: "Endereço" },
		{ name: "tipoFuncionario", label: "Tipo de Funcionário" },
		{ name: "formaPagamento", label: "Forma Pag." }
	]

	const formaPagamentoFields = [
		{ name: "tipo", label: "Tipo" },
		{ name: "dadosDePagamento", label: "Dados de Pagamento" },
		{ name: "status", label: "Status", type: "boolean", defaultValue: "true", hidden: true},
		{ name: "parcelas", label: "Parcelas", type: "text", defaultValue: "N/A" }
	]

	const buscaDashInfos = async () => {
		try {
			const response = await api.get(`/api/v1/${entityName}/Dash`, Util.getApiAuthHeader());
			if (response.status === 200)
				setDashInfos(response.data.data);
		} catch (ex) {
			toast.error(`Erro ao carregar Dash de ${entityName}. `, ex);
		}
	}

	const buscaFolha = async () => {
		try {
			const response = await api.get(`/api/v1/${entityName}/Folha`, Util.getApiAuthHeader());
			if (response.status === 200)
				setFolha(response.data.data);
		} catch (ex) {
			toast.error(`Erro ao carregar Folha de pagamentos! `, ex);
		}
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
				<Header user={user} />

				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider'}} className="bg-w">
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Dashboard" value="1" />
							<Tab label="Formas de Pagamento" value="4" />
							<Tab label="Funcionários" value="2" />
							<Tab label="Folha de Pagamento" value="3" />
						</TabList>
					</Box>
					<TabPanel value="1" className="bg-w">
						<Grid container spacing={3}>
							<Grid item size={{ xs: 12, md: 6 }} >
								<StatCard title="Total de colaboradores" value={dashInfos?.countFuncionarios} subtitle="Número de colaboradores ativos" icon="People" />
							</Grid>
							<Grid item size={{ xs: 12, md: 6 }} >
								<StatCard title="Folha de Pagamento" value={dashInfos?.valorAPagar?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} subtitle="Valor a Pagar" icon="Money" />
							</Grid>
							<Grid item size={{ xs: 3 }} >
							</Grid>
							<Grid item size={{ xs: 6 }} >
								<PieChartGeneric
									data={folha?.map(f => f.totalFretes)}
									labels={folha?.map(f => f.nome)}
									title={"Qtd. Viagens x Funcionário"}
								/>
							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value="2" className="bg-w">
						<Grid container spacing={1}>
							<Grid item size={{ xs: 6 }}>
								<Typography variant="h6" align="left" gutterBottom>
									{`Gerenciamento de ${entityName}`}
								</Typography>
							</Grid>
							<Grid item size={{ xs: 6 }}>
								<Box display="flex" justifyContent="end" my={2}>
									<Button variant="outlined" color="success" onClick={() => setEditingEntity({})}>
										<AddCircleOutlineOutlined /> Adicionar {entityName}
									</Button>
								</Box>
							</Grid>
							<Grid item size={{ xs: 12 }}>
								{editingEntity && (
									<EntityForm
										fields={funcionariosFields}
										entity={editingEntity}
										onSave={editingEntity.id ? handleUpdateEntity : handleAddEntity}
										onCancel={() => setEditingEntity(null)}
										requiredFields={requiredFields}
										customValidationFunction={customValidationFunction}
										subEntities={subEntities}
										api={api}
									/>
								)}
								<Paper sx={{ width: '100%', overflow: 'hidden' }}>
									<TableContainer component={Paper} sx={{ maxHeight: 500 }}>
										<Table stickyHeader aria-label="sticky table">
											<TableHead>
												<TableRow>
													{columnsFunc.map((col) => (
														<TableCell key={col.name}>{col.label}</TableCell>
													))}
													<TableCell align="right">Ação</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{entities.map((entity) => (
													<TableRow key={entity.id}>
														{columnsFunc.map((col) => (
															<TableCell key={col.name}>{entity[col.name]}</TableCell>
														))}
														<TableCell align="right" sx={{ display: "flex", flexDirection: "row" }}>
															<Button onClick={() => setEditingEntity(entity)} variant="outlined" color="primary">
																<EditOutlined />
															</Button>

															<Button
																onClick={() => handleDeleteEntity(entity.id)}
																variant="outlined"
																color="secondary"
																style={{ marginLeft: '5px' }}
															>
																<DeleteOutlined />
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
									<TablePagination
										rowsPerPageOptions={[10, 25, 100]}
										component="div"
										count={entities.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</Paper>
							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value="3" className="bg-w">
						<EntityList
							entities={folha}
							onEdit={setEditingEntity}
							onDelete={handleDeleteEntity}
							action={false}
							columns={columnsFolha}
						/>

					</TabPanel>

					<TabPanel value="4" className="bg-w">
						<BasicCRUD
							api={api}
							entityName={"formaPagamento"}
							fields={formaPagamentoFields}
							requiredFields={['tipo', 'status', 'dadosDePagamento']}
						/>

					</TabPanel>
				</TabContext>
			</Box>
		</Box>
	)
}
