import { useCallback, useState } from "react";
import { APIError } from "../utils.js";

let options = {
	headers: { "Content-Type": "application/json", Authorization: null },
};

export const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);

	const request = useCallback(async (url, method = "GET", body = null) => {
		options = {
			...options,
			method,
			body: Boolean(body) ? JSON.stringify(body) : null,
		};
		if (!body) delete options.body;

		setIsLoading(true);
		const response = await fetch(url, options);
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			throw new APIError(data);
		}

		setIsLoading(false);
		return data;
	}, []);

	const setAuthToken = useCallback((tokenString) => {
		options = { ...options, headers: { ...options.headers, ["Authorization"]: `Bearer ${tokenString}` } };
	}, []);

	const removeAuthToken = useCallback(() => {
		options = { ...options, headers: { ...options.headers, ["Authorization"]: null } };
	}, []);

	return { isLoading, request, setAuthToken, removeAuthToken };
};
