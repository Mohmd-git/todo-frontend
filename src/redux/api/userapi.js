import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const adminToken = localStorage.getItem("adminToken");
      const userToken = localStorage.getItem("token");
      const token = adminToken || userToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      // ✅ EXACT MATCH: /api/users (from index.js) + /all-progress (from router)
      query: () => "/api/users/all-progress", 
    }),
  }),
});

export const { useGetUsersQuery } = userApi;