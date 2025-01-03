import React from 'react'
import './global.css'
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './contexts/authContext'


function App() {
	return (
		<AuthProvider>
			<ToastContainer
				position="top-right"
				toastStyle={{fontSize: '2rem'}}
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover 
			/>
			<AppRoutes />
		</AuthProvider>
	)
}

export default App
