import React, { useEffect, useState } from "react"
// import { toast } from "react-toastify"
// import { Link } from "react-router-dom"

import { useAuth } from "../../contexts/authContext"
// import api from "../../services/api"
// import ibge from "../../services/ibge"

// import Post from "../../components/Post"
// import Select from "../../components/Select"
// import Navbar from "../../components/Navbar"
// import EditProfileModal from "../../components/editProfileModal"

import { Box, Grid2 as Grid, CssBaseline, CardContent } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';
import EmployeeList from '../../components/EmployeeList';
import BillingSummary from '../../components/BillingSummary';
import PaymentsTable from '../../components/PaymentsTable';
import ContractsPieChart from '../../components/ContractsPieChart';


import { Container, SideBar, MainContent, FilterContainer } from "./styles.js"

//--Começo do Front-end---//
export default function Home() {
	const { user } = useAuth()
	// const [isFilterActive, setFilterActive] = useState(false)
	// const [areFilteredServices, setAreFilteredServices] = useState(false)
	// const [servicePage, setServicePage] = useState(2)
	// const [services, setServices] = useState([])

	// const [ufs, setUfs] = useState([])
	// const [cities, setCities] = useState([])

	// const [selectedUf, setSelectedUf] = useState()
	// const [selectedCity, setSelectedCity] = useState()

	// const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

	// function clearFilters() {
	// 	getServicesData()
	// 	setServicePage(2)
	// 	setSelectedUf("")
	// 	setSelectedCity("")
	// }

	// async function getUfs() {
	// 	const ufs = await ibge.getUfs()

	// 	setUfs(ufs)
	// }

	// async function getCities() {
	// 	const cities = await ibge.getCities(selectedUf)

	// 	setCities(cities)
	// }

	// async function getServicesData() {
	// 	const apiResponse = await api.get("search/services")
	// 	setServices(apiResponse.data.services)
	// }

	// useEffect(() => {
	// 	getServicesData()

	// 	getUfs()
	// }, [])

	// useEffect(() => {
	// 	getCities()
	// }, [selectedUf])

	// async function handleSubmit(e) {
	// 	e.preventDefault()

	// 	const response = await api.get("/search/services", {
	// 		params: {
	// 			uf: selectedUf,
	// 			city: selectedCity,
	// 		},
	// 	})

	// 	const data = response.data
	// 	setServices(data.services)
	// 	setAreFilteredServices(true)
	// }

	// async function getMorePages() {
	// 	setServicePage(servicePage + 1)
	// 	console.log("paginaaa", servicePage);
	// 	if (areFilteredServices) {

	// 		const response = await api.get("/search/services", {
	// 			params: {
	// 				uf: selectedUf,
	// 				city: selectedCity,
	// 				page: servicePage,
	// 			},
	// 		})

	// 		if (response.data.services.length >= 1) {
	// 			setServices([...services, ...response.data.services])
	// 		} else {
	// 			toast.warning("Não tem mais nada por aqui!")
	// 		}
	// 	} else {
	// 		const response = await api.get("/search/services", {
	// 			params: {
	// 				page: servicePage,
	// 			},
	// 		})

	// 		console.log("tamanho", response.data.services)
	// 		if (response.data.services.length < 1) {
	// 			toast.warning("Não tem mais nada por aqui!")
	// 		} else {
	// 			setServices([...services, ...response.data.services])
	// 		}
	// 	}
	// }

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#F5F5F5', minHeight: '100vh' }}>
					<Header user={user} />
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							<StatCard title="Total de colaboradores" value="250" subtitle="+12% do que nos últimos 3 meses" icon="People" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<StatCard title="Contratos" value="100" subtitle="-2% do que nos últimos 3 meses" icon="Folder" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<StatCard title="Entregas" value="10" subtitle="+20% do que nos últimos 3 meses" icon="LocalShipping" /></Grid>
						<Grid item xs={12} md={8}>
							<EmployeeList />
						</Grid>
						<Grid item xs={12} md={4}>
							<BillingSummary />
						</Grid>
						<Grid item xs={12} md={6}>
							<PaymentsTable />
						</Grid>
						<Grid item xs={12} md={6}>
							<ContractsPieChart />
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	)
}
