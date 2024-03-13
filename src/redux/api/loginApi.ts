import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants";

interface LoginRequest {
	email: string;
	password: string;
}
interface LoginResponse {
	token: string;
}

export const loginApi = createApi({
	reducerPath: "loginApi",
	baseQuery: fetchBaseQuery({
		baseUrl: REQUEST_URL,
	}),
	endpoints: (builder) => {
		return {
			login: builder.mutation<LoginResponse, LoginRequest>({
				query: (newData) => ({
					url: "login",
					method: "POST",
					body: newData,
				}),
			}),
		};
	},
});

export const { useLoginMutation } = loginApi;
