import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import HomePage from "./components/pages/HomePage.jsx";
import ComparerPage from "./components/pages/ComparerPage.jsx";
import BookmarksPage from "./components/pages/BookmarksPage.jsx";
import AuthPage from "./components/pages/AuthPage.jsx";

const FREE_ACCESS_ROUTES = [
	{ path: "/", Component: HomePage },
	{ path: "/city-comparer", Component: ComparerPage },
	{ path: "/auth", Component: AuthPage },
];

const AUTH_ACCESS_ROUTES = [
	{ path: "/", Component: HomePage },
	{ path: "/city-comparer", Component: ComparerPage },
	{ path: "/bookmarked-companies", Component: BookmarksPage },
];

export const AppRoutes = () => {
	const auth = useContext(AuthContext);
	const isAuthenticated = Boolean(auth.token);

	return (
		<Switch>
			{!isAuthenticated
				? FREE_ACCESS_ROUTES.map((route) => {
						const { path, Component } = route;

						return (
							<Route key={`${path}_key_access`} path={path} exact>
								<Component />
							</Route>
						);
				  })
				: AUTH_ACCESS_ROUTES.map((route) => {
						const { path, Component } = route;

						return (
							<Route key={`${path}_key_auth`} path={path} exact>
								<Component />
							</Route>
						);
				  })}
			<Redirect to="/" />
		</Switch>
	);
};
