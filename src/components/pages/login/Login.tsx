import React from "react";
import LoginForm from "../../forms/loginForm/LoginForm";
interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default Login;
