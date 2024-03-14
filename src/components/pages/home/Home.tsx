import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useDeleteProductMutation,
	useGetProductsQuery,
	usePostProductMutation,
} from "../../../redux/api/productApi";
import scss from "./Home.module.scss";
import { TextField } from "@mui/material";

interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
	const navigate = useNavigate();
	const [productName, setProductName] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [price, setPrice] = useState<number | null>(null);
	const [quantity, setQuantity] = useState<number | null>(null);
	const { data: products = [], refetch } = useGetProductsQuery();
	const [postProduct] = usePostProductMutation();
	const [deleteProduct] = useDeleteProductMutation();
	console.log(products);

	useEffect(() => {
		const isAuth = localStorage.getItem("isAuth");
		if (isAuth !== "true") {
			navigate("/login");
		}
	}, [navigate]);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isAuth");
		navigate("/login");
	};

	const handlePost = async () => {
		try {
			const newData = {
				productName,
				quantity,
				price,
				photoUrl,
			};
			await postProduct(newData);
			refetch();
			setProductName("");
			setPhotoUrl("");
			setPrice(null);
			setQuantity(null);
		} catch (error) {
			console.error("Error while posting product:", error);
		}
	};

	const handleDeleteProduct = async (_id: number) => {
		await deleteProduct(_id);
	};

	return (
		<div className={scss.cardProduct}>
			<button onClick={logout}>Log Out</button>
			<div className={scss.Inputs}>
				<TextField
					id="outlined-basic"
					label="Product Name"
					variant="outlined"
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Photo"
					variant="outlined"
					value={photoUrl}
					onChange={(e) => setPhotoUrl(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Price"
					variant="outlined"
					value={price}
					onChange={(e) => setPrice(+e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Quantity"
					variant="outlined"
					value={quantity}
					onChange={(e) => setQuantity(+e.target.value)}
				/>
				<div>
					<button onClick={handlePost}>Add</button>
				</div>
			</div>
			<div className={scss.cards}>
				{products.map((item) => (
					<div className={scss.card} key={item._id}>
						<h1>{item.productName}</h1>
						<img src={item.photoUrl} alt={item.productName} />
						<h3>{item.price}</h3>
						<h3>{item.quantity}</h3>
						<button onClick={() => handleDeleteProduct(item._id)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
