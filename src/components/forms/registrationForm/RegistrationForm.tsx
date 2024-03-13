import React, { useState } from "react";
import Input from "../../customInput/CustonInput";
import { Link, useNavigate } from "react-router-dom";
import Button, { ButtonProps } from "../../customButtton/CustomButton";
import { useCreateUsersMutation } from "../../../redux/api/usersApi";
import scss from "./RegistrationForm.module.scss";

const RegistrationForm: React.FC = () => {
	const navigate = useNavigate();
	const [createUser] = useCreateUsersMutation();
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleGetEmail = (value: string) => {
		setEmail(value);
	};
	const handleGetPassword = (value: string) => {
		setPassword(value);
	};
	const handleGetUserName = (value: string) => {
		setUserName(value);
	};

	const loginButtonProps: ButtonProps = {
		type: "submit",
		variant: "primary",
		color: "blue",
		width: "300px",
	};

	const handleAddPost = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const result = await createUser({ email, userName, password });
		if (result) {
			setEmail("");
			setUserName("");
			setPassword("");
			navigate("/login");
		}
	};

	return (
		<form onSubmit={handleAddPost}>
			<div className={scss.InputReg}>
				<h2>Регистрация</h2>
				<div>
					<label htmlFor="name">Email</label>
					<Input
						className={scss.InputClass}
						type="email"
						name="Email"
						placeholder="Введите сообщение"
						value={email}
						onChange={handleGetEmail}
						width="300px"
					/>
				</div>
				<div>
					<label htmlFor="name">Имя пользователя</label>
					<Input
						className={scss.InputClass}
						type="text"
						name="Имя пользователя"
						placeholder="Имя пользователя"
						value={userName}
						onChange={handleGetUserName}
						width="300px"
					/>
				</div>
				<div>
					<label htmlFor="name">Password</label>
					<Input
						className={scss.InputClass}
						type="password"
						name="Password"
						placeholder="Введите password"
						value={password}
						onChange={handleGetPassword}
						width="300px"
					/>
				</div>
				<Link to="/login">У меня есть аккаунт войти</Link>
				<div>
					<Button {...loginButtonProps}>Зарегистироваться</Button>
				</div>
			</div>
		</form>
	);
};

export default RegistrationForm;
