import React from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";

export default function Clientes() {
	const { user } = useAuth()

	const clientesFields = [
		{ label: "Nome", name: "nome", type: "text" },
		{ label: "E-mail", name: "email", type: "text" },
		{ label: "Telefones", name: "telefones", type: "text" },
		{ label: "CNPJ", name: "cnpj", type: "text" },
		{ label: "Endereço", name: "endereco", type: "text" }
	]

	const requiredFields = ["nome", "telefones", "endereco"]

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
				<Header user={user} />
				<BasicCRUD
					api={api}
					entityName={"empresa"}
					fields={clientesFields}
					requiredFields={requiredFields}
				/>
			</Box>
		</Box>
	)
}
