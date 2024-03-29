import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./htpp.hook";
const storageName = "userData";

export const useAuth = () => {
	const { setAuthToken, removeAuthToken } = useHttp();

	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken);
		setUserId(id);
		setAuthToken(jwtToken);
		localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }));
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		removeAuthToken();

		localStorage.removeItem(storageName);
		window.location.replace(window.location.origin);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [login]);

	return { login, logout, token, userId, ready };
};
