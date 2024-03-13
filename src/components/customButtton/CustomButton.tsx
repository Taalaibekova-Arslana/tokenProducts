import { FC, ButtonHTMLAttributes } from "react";
import scss from "./CustomButton.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	color?: string;
	width: string;
}
const Button: FC<ButtonProps> = ({
	children,
	variant = "primary",
	color,
	width,
	...rest
}) => {
	return (
		<div className={scss.Buttons}>
			<button
				{...rest}
				style={{ backgroundColor: color, width }}
				className={`btn ${
					variant === "primary" ? "btn-primary" : "btn-secondary"
				}`}>
				{children}
			</button>
		</div>
	);
};
export default Button;
