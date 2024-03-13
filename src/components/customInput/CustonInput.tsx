import { FC, InputHTMLAttributes, ChangeEvent } from "react";
import styles from "./CustomInput.module.scss";
interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	label?: string;
	width: string;
	onChange: (value: string) => void;
	errorMessage?: string;
}
const Input: FC<InputProps> = ({ label, width, onChange, ...rest }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		onChange(value);
	};
	return (
		<div className={styles.box}>
			{label && <label className={styles.label}>{label}</label>}
			<input
				onChange={handleChange}
				style={{ width, height: "30px" }}
				{...rest}
			/>
		</div>
	);
};
export default Input;
