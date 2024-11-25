import React from "react";
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";


export default function Abastecimentos(){


    const fields = [
        {label: "Modelo", name: "modelo", inputDisabled: true },
        {label: "Placa", name: "placa", inputDisabled: true },
        {label: "Data", name: "data", type: "date" },
        {label: "Tipo de Combustível", name: "tipoCombustivel"},
        {label: "Valor", name: "valor", type: "number" },
        {label: "Km. Atual", name: "quilometragemAtual", type: "number" },
        {label: "Cidade", name: "cidade", type: "text" }
	]

    const subEntities = [{
		inputName: "idCarro",
		name: "carro",
		label: "Carro",
		columnRef: 'modelo',
        canCreate: false
	}]

    const entityName = 'abastecimento'
	const requiredFields = ["tipoCombustivel", "valor", "quilometragemAtual", "idCarro", "cidade", "data"]

    return (
        <BasicCRUD
            entityName={entityName}
            api={api}
            requiredFields={requiredFields}
            fields={fields}
            subEntities={subEntities}
        />
    )
}