import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants";

interface Products {
	_id: number;
	productName: string;
	photoUrl: string;
	price: number;
	quantity: number;
}

interface CreateUserRequest {
	productName: string;
	quantity: number | null;
	price: number | null;
	photoUrl: string;
}

interface CreateUserResponse {
	productName: string;
	photoUrl: string;
	price: number;
	quantity: number;
}

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({
		baseUrl: REQUEST_URL,
	}),
	endpoints: (builder) => {
		return {
			getProducts: builder.query<Products[], void>({
				query: () => ({
					url: "products",
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}),
			}),
			postProduct: builder.mutation<CreateUserResponse, CreateUserRequest>({
				query: (newData) => ({
					url: "products",
					method: "POST",
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
					body: newData,
				}),
			}),
			deleteProduct: builder.mutation({
				query: (_id) => ({
					url: `products/${_id}`,
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.removeItem("token")}`,
					},
				}),
			}),
		};
	},
});

export const {
	useGetProductsQuery,
	usePostProductMutation,
	useDeleteProductMutation,
} = productApi;
