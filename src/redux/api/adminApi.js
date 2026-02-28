import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken"); // ✅ FIXED

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => "/api/admin/dashboard",
      method: "GET"
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminApi;