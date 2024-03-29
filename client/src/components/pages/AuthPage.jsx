import React, { useContext, useState } from "react";
import { Button, ButtonGroup, FormGroup, InputGroup } from "@blueprintjs/core";
import { BASE_URL } from "../../constants.js";
import { AuthContext } from "../../context/AuthContext.js";
import { useHttp } from "../../hooks/htpp.hook.js";
import { useMessage } from "../../hooks/message.hook.js";
import { __FormContainer } from "../styles/auth-page.js";
import Loader from "../Loader.jsx";

export default function AuthPage() {
	const auth = useContext(AuthContext);
	const { isLoading, request } = useHttp();
	const { showSuccess, showError } = useMessage();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const registerHandler = async () => {
		try {
			const data = await request(BASE_URL + "/api/auth/register", "POST", { ...form });
			showSuccess(data.message);
		} catch (e) {
			if (!e.responseJSON) return;
			showError(e.responseJSON.message);
		}
	};

	const loginHandler = async () => {
		try {
			const data = await request(BASE_URL + "/api/auth/login", "POST", { ...form });
			auth.login(data.token, data.userId);
		} catch (e) {
			if (!e.responseJSON) return;
			showError(e.responseJSON.message);
		}
	};

	return (
		<__FormContainer>
			<h2 className="bp3-heading">Authenticate</h2>
			<br />
			<FormGroup>
				<InputGroup
					large={true}
					leftIcon="envelope"
					type="email"
					placeholder="Enter your email..."
					name="email"
					value={form.email}
					onChange={changeHandler}
				/>
				<InputGroup
					large={true}
					leftIcon="key"
					type="password"
					placeholder="Enter your password..."
					name="password"
					value={form.password}
					onChange={changeHandler}
				/>
				<ButtonGroup>
					<Button className="bp3-intent-success" large={true} onClick={loginHandler}>
						Login
					</Button>
					<Button className="bp3-intent-primary" large={true} onClick={registerHandler}>
						Register
					</Button>
				</ButtonGroup>
			</FormGroup>
			<Loader isLoading={isLoading} />
		</__FormContainer>
	);
}
