import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URI,
    credentials: "include", // ✅ add this line here
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Todo"],
  endpoints: (builder) => ({}),
});