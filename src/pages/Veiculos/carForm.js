import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import Input from "../../components/Input";

function CarForm({ car, onSave, onCancel }) {
    const [formData, setFormData] = useState({ marca: "", modelo: "", ano: "", cor: "", placa: "", renavam: "" });

    useEffect(() => {
        if (car) setFormData(car);
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Input label="Marca" name="marca" value={formData.marca} onChange={handleChange} required />
                    <Input label="Modelo" name="modelo" value={formData.modelo} onChange={handleChange} required />
                    <Input label="Ano" name="ano" value={formData.ano} onChange={handleChange} required />
                    <Input label="Cor" name="cor" value={formData.cor} onChange={handleChange} required />
                    <Input label="Placa" name="placa" value={formData.placa} onChange={handleChange} required />
                    <Input label="Renavam" name="renavam" value={formData.renavam} onChange={handleChange} required />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button type="submit" variant="contained" color="primary">Salvar</Button>
                        <Button onClick={onCancel} variant="outlined" color="secondary">Cancelar</Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
}

export default CarForm;
