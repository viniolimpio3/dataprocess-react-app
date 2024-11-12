import React from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";

export default function Rh() {
	const { user } = useAuth()

	const funcionariosFields = [
		{ label: "Nome", name: "nome" },
		{ label: "Nascimento", name: "nascimento", type: "date" },
		{ label: "Celular", name: "celular" },
		{ label: "endereco", name: "endereco" },
		{ label: "Id Tipo Funcionário [remover]", name: "idTipoFuncionario" }
	]

	const requiredFields = ["nome", "nascimento", "idTipoFuncionario"]

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
				<Header user={user} />
				<BasicCRUD
					api={api}
					entityName={"funcionario"}
					fields={funcionariosFields}
					requiredFields={requiredFields}
				/>
			</Box>
		</Box>
	)
}
