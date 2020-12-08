import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import logo from "../assets/images/logo.png";
import {
	__Navigation,
	__NavigationContainer,
	__NavigationLogo,
	__NavigationGroup,
	__NavigationTitle,
} from "./styles/navigation.js";

export default function Navbar() {
	return (
		<__Navigation className="bp3-navbar">
			<__NavigationContainer>
				<Navbar.Left />
				<Navbar.Right />
			</__NavigationContainer>
		</__Navigation>
	);
}

Navbar.Left = function NavbarLeft() {
	return (
		<__NavigationGroup className="bp3-navbar-group bp3-align-left">
			<NavLink to="/">
				<__NavigationLogo className="bp3-navbar-heading">
					<img src={logo} alt="main-logo" />
				</__NavigationLogo>
			</NavLink>
			<NavLink to="/">
				<__NavigationTitle className="bp3-navbar-heading">IT Industry Analyzer</__NavigationTitle>
			</NavLink>
		</__NavigationGroup>
	);
};

Navbar.Right = function NavbarRight() {
	const auth = useContext(AuthContext);
	const isAuthenticated = Boolean(auth.token);

	return (
		<__NavigationGroup className="bp3-navbar-group bp3-align-right">
			<NavLink to="/">
				<button className="bp3-button bp3-minimal bp3-icon-home">Home</button>
			</NavLink>
			<NavLink to="/city-comparer">
				<button className="bp3-button bp3-minimal bp3-icon-list">City comparer</button>
			</NavLink>
			{isAuthenticated && (
				<NavLink to="/bookmarked-companies">
					<button className="bp3-button bp3-minimal bp3-icon-bookmark">Bookmarked</button>
				</NavLink>
			)}
			<span className="bp3-navbar-divider" />
			{!isAuthenticated && (
				<NavLink to="/auth">
					<button className="bp3-button bp3-minimal bp3-icon-log-in">Login/Register</button>
				</NavLink>
			)}
			{isAuthenticated && (
				<button className="bp3-button bp3-minimal bp3-icon-log-out" onClick={() => auth.logout()}>
					Log out
				</button>
			)}
		</__NavigationGroup>
	);
};
