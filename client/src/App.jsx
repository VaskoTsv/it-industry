import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import dotenv from "dotenv";
import { AppRoutes } from "./AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import Navbar from "./components/Navbar.jsx";
import { __ApplicationContainer } from "./components/styles/app.js";

// Load environment variables.
dotenv.config();

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<__ApplicationContainer>
					<AppRoutes />
				</__ApplicationContainer>
			</Router>
		</AuthProvider>
	);
}

export default App;
