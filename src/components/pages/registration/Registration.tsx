import React from "react";
import RegistrationForm from "../../forms/registrationForm/RegistrationForm";
interface RegistrationProps {}
const Registration: React.FC<RegistrationProps> = () => {
	return (
		<div>
			<RegistrationForm />
		</div>
	);
};

export default Registration;
