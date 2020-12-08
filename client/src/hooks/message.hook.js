import React, { useCallback } from "react";
import { Position, Toaster, Intent } from "@blueprintjs/core";

const Toast = Toaster.create();
export const useMessage = () => {
	const options = {
		message: "",
		timeout: 1500,
		position: Position.TOP,
	};

	const showSuccess = useCallback((message, timeout) => {
		const successOptions = { ...options, intent: Intent.SUCCESS, message, timeout };
		Toast.show(successOptions);
	}, []);

	const showError = useCallback((message, timeout) => {
		const errorOptions = { ...options, intent: Intent.DANGER, message, timeout };
		Toast.show(errorOptions);
	}, []);

	return { showSuccess, showError };
};
