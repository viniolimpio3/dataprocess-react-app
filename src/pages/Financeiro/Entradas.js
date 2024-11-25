import React from "react";
import BasicCRUD from "../../components/BasicCrud";
import api from "../../services/api";


export default function Entradas(){


    const fields = [

        {label: "Descrição", name: "descricao"},
        {label: "Emissão", name: "dataEmissao", type: 'date'},
        {label: "Recebimento", name: "dataRecebimento", type: 'date' },
        {label: "Data limite recebimento", name: "dataLimiteRecebimento", type: 'date'},
        {label: "Forma Pag.", name: "formaPagamento", inputDisabled: true},
        {label: "Dados Pag.", name: "dadosPagamento", inputDisabled: true },
        {label: "Parcelas", name: "parcelas", inputDisabled: true },
        {label: "Cliente", name: "cliente", inputDisabled: true },
        {label: "Email", name: "email", inputDisabled: true },
        {label: "Frete", name: "freteDescricao", inputDisabled: true },
        {label: "Valor", name: "freteValor", inputDisabled: true }
	]

    const subEntities = [{
		inputName: "idFrete",
		name: "frete",
		label: "Frete",
		columnRef: 'descricao',
        canCreate: false
	},
	{
		inputName: "idFormaPagamento",
		name: "formaPagamento",
		label: "Forma Pag.",
		columnRef: 'tipo',
        canCreate: false
	},
    {
		inputName: "idTipo",
		name: "tipoEntrada",
		label: "Tipo de entrada",
		columnRef: 'descricao',
        canCreate: true
	},
    ,
    {
		inputName: "idEmpresaCliente",
		name: "empresa",
		label: "Cliente",
		columnRef: 'nome',
        canCreate: true
	}]

    const entityName = 'entrada'
	const requiredFields = ["idEmpresaCliente", "idTipo", "idFormaPagamento", "idFrete", "descricao", "dataEmissao", "dataRecebimento", "dataLimiteRecebimento"]
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