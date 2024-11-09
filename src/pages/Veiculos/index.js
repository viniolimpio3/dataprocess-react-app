import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import Grid from "@mui/material/Grid2";
import { Box, Container, Typography, Button, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import api from "../../services/api";
import { toast } from "react-toastify";
import CarList from "./carList";
import CarForm from "./carForm";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

export default function Veiculos() {
	const { user } = useAuth()
	const [carros, setCarros] = useState([]);
    const [editingCar, setEditingCar] = useState(null);

	const buscaCarros = async () => {
		let response = await api.get('api/v1/carro', {
			headers: {
				Authorization: `Bearer ` + localStorage.getItem('@DataProcess:token')
			}
		})

		if (response.status !== 200) {
			toast.error('Ocorreu um erro na listagem de carros!');
			return;
		}

		setCarros(response.data.data)
	}

	useEffect(() => {
		buscaCarros();
	}, []);

	const handleAddCar = async (car) => {
		const newCar = await new Promise() // addCarro(car);
		setCarros([...carros, newCar]);
	};

	const handleUpdateCar = async (updatedCar) => {
		const updated = await new Promise( ) //updateCarro(updatedCar.id, updatedCar);
		setCarros(carros.map(car => car.id === updated.id ? updated : car));
		setEditingCar(null);
	};

	const handleDeleteCar = async (id) => {
		// await deleteCarro(id);
		setCarros(carros.filter(car => car.id !== id));
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
				<Header user={user} />
				<Grid container spacing={1}>
					<Grid item size={{xs: 6}}>
						<Typography variant="h6" align="left" gutterBottom>
							Gerenciamento de Carros
						</Typography>
					</Grid>
					<Grid item size={{xs: 6}}>
						<Box display="flex" justifyContent="center" my={2}>
							<Button variant="outlined" color="success" onClick={() => setEditingCar({})}>
								<AddCircleOutlineOutlined /> Adicionar Carro
							</Button>
						</Box>
					</Grid>
					<Grid item size={{xs: 12}}>

						{editingCar && (
							<CarForm
								car={editingCar}
								onSave={editingCar.id ? handleUpdateCar : handleAddCar}
								onCancel={() => setEditingCar(null)}
							/>
						)}
						<CarList
							carros={carros}
							onEdit={setEditingCar}
							onDelete={handleDeleteCar}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}
