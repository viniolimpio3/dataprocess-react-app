import React from "react";
import { useAuth } from "../../contexts/authContext";

import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";

export default function Veiculos() {
	const { user } = useAuth()

	const carrosFields = [
		{ label: "Modelo", name: "modelo", type: "text" },
		{ label: "Ano", name: "ano", type: "number" },
		{ label: "Cor", name: "cor", type: "text" },
		{ label: "Placa", name: "placa", type: "text" },
		{ label: "Renavam", name: "renavam", type: "text" }
	]

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

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
				<Header user={user} />
				<BasicCRUD
					api={api}
					entityName={"carro"}
					fields={carrosFields}
					requiredFields={requiredFields}
					customValidationFunction={validation}
				/>
			</Box>
		</Box>
	)
}
