import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CssBaseline } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import EntityList from "./entityList";
import EntityForm from "./entityForm";
import Util from "../../helpers/Util";
import { toast } from "react-toastify";

export default function BasicCRUD({ entityName, fields, api, requiredFields, customValidationFunction, subEntities = false }) {
	const [entities, setEntities] = useState([]);
	const [editingEntity, setEditingEntity] = useState(null);

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
			toast.error(`Erro ao adicionar ${entityName}!`);
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
			toast.error(`Erro ao atualizar ${entityName}!`);
		}
	};

	const handleDeleteEntity = async (id) => {
		try {
			await api.delete(`/api/v1/${entityName}/${id}`, Util.getApiAuthHeader());

			toast.success("Deletado com sucesso");
			setEntities(entities.filter(entity => entity.id !== id));
		} catch {
			toast.error(`Erro ao deletar ${entityName}!`);
		}
	};

	return (
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
						fields={fields}
						entity={editingEntity}
						onSave={editingEntity.id ? handleUpdateEntity : handleAddEntity}
						onCancel={() => setEditingEntity(null)}
						requiredFields={requiredFields}
						customValidationFunction={customValidationFunction}
						subEntities={subEntities}
						api={api}
					/>
				)}
				<EntityList
					entities={entities}
					columns={fields}
					onEdit={setEditingEntity}
					onDelete={handleDeleteEntity}
				/>
			</Grid>
		</Grid>
	);
}
