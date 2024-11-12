import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import Util from "../../helpers/Util";

function EntityForm({ fields, entity, onSave, onCancel, requiredFields, customValidationFunction = false }) {
    const initialFormData = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (entity) {
            setFormData({ ...initialFormData, ...entity }); // Garante todos os campos no formData
        } else {
            setFormData(initialFormData); // Reseta o form se entity estiver vazio
        }
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const campo in formData) {
            if (requiredFields.indexOf(campo) >= 0  && (!formData[campo] || formData[campo] === "")) {
                toast.error("Por favor, preencha todos os campos.");
                return;
            }

            let isDate = fields.map( i => i.type === 'date' && i.type === campo ) > 0;
            if(isDate){
                formData[campo] = Util.convertDateToISO(formData[campo])
            }
        }

        if(customValidationFunction !== false){
            
            const valid = customValidationFunction(formData)

            if(!valid.success === true){
                toast.error("Erro: " + valid.message)
                return;
            }
        }
        
        onSave(formData);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2} sx={{padding: 3}}>
                <TextField type="number" sx={{ display: "none" }} name="id" value={formData.id} />
                    {fields.map(({ label, name, type = "text" }) => (
                        <TextField
                            key={name}
                            label={label}
                            name={name}
                            type={type}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            required={requiredFields.indexOf(name) >= 0}
                        />
                    ))}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button type="submit" variant="contained" color="primary">Salvar</Button>
                        <Button onClick={onCancel} variant="outlined" color="secondary">Cancelar</Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
}

export default EntityForm;