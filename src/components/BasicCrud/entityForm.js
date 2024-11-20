import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Box, Paper, Button, TextField, Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import Util from "../../helpers/Util";

function EntityForm({ fields, entity, onSave, onCancel, requiredFields, subEntities, api }) {
    const initialFormData = fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue ? field.defaultValue : "" }), {});
    const [formData, setFormData] = useState(initialFormData);
    const [inputValues, setInputValues] = useState({}); // Para rastrear o texto digitado no campo de subentidades
    const [subEntityOptions, setSubEntityOptions] = useState({});
    const [selectedSubEntity, setSelectedSubEntity] = useState({});

    useEffect(() => {
        if (entity) {
            setFormData({ ...initialFormData, ...entity });
        } else {
            setFormData(initialFormData);
        }

        const fetchSubEntities = async () => {
            if (subEntities === false || subEntities.length === 0)
                return;
    
            await subEntities.forEach(async (subEntity) => {
                try {
    
                    if (subEntityOptions[subEntity.name]?.length > 0) {
                        return;
                    }
    
                    const response = await api.get(`/api/v1/${subEntity.name}`, Util.getApiAuthHeader());
                    if (response.status === 200) {
    
                        setSubEntityOptions((prev) => ({
                            ...prev,
                            [subEntity.name]: response.data.data?.map((item) => {
                                const initialValue = initialFormData?.[subEntity.inputName];
                                return { label: item[subEntity.columnRef], value: item.id, isFixed: initialValue && item.id === initialValue }
                            }),
                        }));
                    }
                } catch {
                    toast.error(`Erro ao carregar ${subEntity.name}`);
                }
            });
        }

        fetchSubEntities();
    }, []);
    

    const handleAddSubEntity = async (subEntityName, descricao, columnRef) => {
        if (!descricao?.trim()) return;

        try {
            const response = await api.post(
                `/api/v1/${subEntityName}`,
                { [columnRef]: descricao },
                Util.getApiAuthHeader()
            );
            if (response.status === 201) {
                const newOption = {
                    value: response.data.data.id,
                    label: response.data.data[columnRef],
                };
                setSubEntityOptions((prev) => ({
                    ...prev,
                    [subEntityName]: [...(prev[subEntityName] || []), newOption],
                }));
                setFormData((prev) => ({ ...prev, [subEntityName]: newOption.value }));
                toast.success("Adicionado!");
            }
        } catch {
            toast.error("Erro ao adicionar.");
        }
    };

    const handleDeleteSubEntity = async (subEntityName, option) => {
        if (!window.confirm(`Tem certeza de que deseja excluir "${option.label}"?`)) return;

        try {
            await api.delete(`/api/v1/${subEntityName}/${option.value}`, Util.getApiAuthHeader());
            setSubEntityOptions((prev) => ({
                ...prev,
                [subEntityName]: prev[subEntityName].filter((item) => item.value !== option.value),
            }));
            toast.success("Removido!");
        } catch {
            toast.error("Erro ao remover. Talvez ele já esteja atrelado a outro registro!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const campo in formData) {
            if (requiredFields.includes(campo) && (!formData[campo] || formData[campo] === "")) {
                toast.error("Por favor, preencha todos os campos.");
                return;
            }
            if (formData[campo] === 'true' || formData[campo] === 'false')
                formData[campo] = formData[campo] === 'true';
        }

        onSave(formData);
    };

    const handleSelectChange = (selectedOption, inputName) => {
        setSelectedSubEntity((prev) => ({ ...prev, [inputName]: selectedOption }));
        setFormData((prev) => ({ ...prev, [inputName]: selectedOption?.value }));
    };

    const animatedComponents = makeAnimated()

    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2} sx={{ padding: 3 }}>
                    {fields.map(({ label, name, type = "text", hidden = false, inputDisabled = false }) => {

                        if (inputDisabled !== true)
                            return (
                                <TextField
                                    key={name}
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={formData[name] || ""}
                                    sx={{
                                        display: hidden === false ? 'inherit' : 'none'
                                    }}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                                    }
                                    required={requiredFields.includes(name)}
                                />
                            );
                    })}

                    {subEntities && subEntities?.map(({ name, label, inputName, columnRef }) => (
                        <Box key={name}>
                            <Select
                                options={subEntityOptions[name] || []}
                                components={animatedComponents}
                                isSearchable
                                isClearable
                                name={inputName}
                                value={selectedSubEntity?.[inputName]}
                                onChange={e => {
                                    handleSelectChange(e, inputName)
                                }}
                                placeholder={`Selecione o ${label}`}
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                    menu: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                        backgroundColor: "white",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }),
                                    option: (provided, { isFocused }) => ({
                                        ...provided,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: isFocused ? "#f0f8ff" : "white",
                                        color: "#333",
                                        padding: "8px 12px",
                                        cursor: "pointer",
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        padding: "4px",
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        border: "1px solid #ccc",
                                        boxShadow: "none",
                                        "&:hover": {
                                            border: "1px solid #888",
                                        },
                                    }),
                                }}
                                inputValue={inputValues[name] || ""}
                                onInputChange={(newValue) => {
                                    setInputValues((prev) => ({ ...prev, [name]: newValue }))
                                }}
                                required={requiredFields.includes(inputName)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const descricao = inputValues[name]?.trim();
                                        if (descricao) {
                                            handleAddSubEntity(name, descricao, columnRef);
                                        }
                                    }
                                }}
                                noOptionsMessage={() =>
                                    inputValues[name]?.trim()
                                        ? `Pressione Enter para adicionar "${inputValues[name]}"`
                                        : "Sem opções disponíveis"
                                }
                                formatOptionLabel={(option, { context }) =>
                                    context === "menu" ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <span>{option.label}</span>
                                            <button
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    color: "red",
                                                    fontSize: "12px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSubEntity(name, option);
                                                }}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    ) : (
                                        option.label
                                    )
                                }
                            />
                        </Box>
                    ))}

                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Salvar
                        </Button>
                        <Button onClick={onCancel} variant="outlined" color="secondary">
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
}

export default EntityForm;