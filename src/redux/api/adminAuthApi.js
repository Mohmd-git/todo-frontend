import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),

  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "/api/admin-auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = adminAuthApi;