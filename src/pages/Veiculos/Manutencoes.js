import React from "react";
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";


export default function Manutencoes(){


    const fields = [
        {label: "Modelo", name: "modelo", inputDisabled: true},
        {label: "Placa", name: "placa", inputDisabled: true},
        {label: "Km. atual", name: "quilometragemAtual", type: "number"},
        {label: "Data", name: "data", type: "date"},
        {label: "Tipo de Manutenção", name: "tipoManutencao", type: "text"},
        {label: "Descrição", name: "descricao", type: "text"},
        {label: "Valor Mão de Obra", name: "valorMaoDeObra", type: "text", defaultValue: "0"},
        {label: "Valor Peças", name: "valorPecas", type: "text", defaultValue: "0"},
        {label: "Data prevista", name: "dataPrevista", type: "date"},
        {label: "Km. Prevista", name: "quilometragePrevista", type: "number"},
        {label: "Forma Pag.", name: "formaPagamento", inputDisabled: true},
        {label: "Dados Pag.", name: "dadosPagamento", inputDisabled: true},
	]

    const subEntities = [{
		inputName: "idCarro",
		name: "carro",
		label: "Carro",
		columnRef: 'modelo',
        canCreate: false
	},
	{
		inputName: "idFormaPagamento",
		name: "formaPagamento",
		label: "Forma Pag.",
		columnRef: 'tipo',
        canCreate: false
	}]

    const entityName = 'manutencao'
	const requiredFields = ["data", "idCarro", "idFormaPagamento", "tipoManutencao", "quilometragemAtual", "valorPecas", "valorMaoDeObra", "descricao"]
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