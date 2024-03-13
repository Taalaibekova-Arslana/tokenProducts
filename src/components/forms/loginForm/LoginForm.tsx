import React, { useState } from "react";
import Input from "../../customInput/CustonInput";
import { Link, useNavigate } from "react-router-dom";
import Button, { ButtonProps } from "../../customButtton/CustomButton";
import { useLoginMutation } from "../../../redux/api/loginApi";
import scss from "./LoginForm.module.scss";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const [login] = useLoginMutation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleGetEmail = (value: string) => {
		setEmail(value);
	};
	const handleGetPassword = (value: string) => {
		setPassword(value);
	};

	const loginButtonProps: ButtonProps = {
		type: "submit",
		variant: "primary",
		color: "blue",
		width: "300px",
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const result = await login({ email, password });
		if ("data" in result) {
			const { token } = result.data;
			localStorage.setItem("token", token);
			localStorage.setItem("isAuth", "true");
			setEmail("");
			setPassword("");
			navigate("/");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={scss.InputLog}>
				<h2>Вход</h2>
				<div>
					<label htmlFor="name">Email</label>
					<Input
						type="email"
						name="Email"
						placeholder="Введите сообщение"
						value={email}
						onChange={handleGetEmail}
						width="300px"
					/>
				</div>
				<div>
					<label htmlFor="name"> Password</label>
					<Input
						type="password"
						name="Password"
						placeholder="Введите password"
						value={password}
						onChange={handleGetPassword}
						width="300px"
					/>
				</div>
				<Link to="/registration">Нет аккаунта зарегистируйтесь</Link>
				<div>
					<Button {...loginButtonProps}>Войти</Button>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
