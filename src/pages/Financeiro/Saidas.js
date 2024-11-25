import React from "react";
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";


export default function Saidas(){
    const fields = [
        {label: "Descrição", name: "descricao"},
        {label: "Valor", name: "valor", type: "number" },
        {label: "Emissão", name: "dataEmissao", type: "date" },
        {label: "Vencimento", name: "dataVencimento", type: "date" },
        {label: "Data Pagamento", name: "dataPagamento", type: "date" },
	]

    const subEntities = [{
		inputName: "idFormaPagamento",
		name: "formaPagamento",
		label: "Forma Pag.",
		columnRef: 'tipo',
        canCreate: false
	},
    {
		inputName: "idTipo",
		name: "TipoEntrada",
		label: "Tipo de Entrada",
		columnRef: 'descricao',
        canCreate: true
	}]

    const entityName = 'saida'
	const requiredFields = ["valor", "descricao", "dataEmissao", "dataVencimento", "dataPagamento"]
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