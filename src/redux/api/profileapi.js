import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({

   getProfile: builder.query({
  query: () => "/api/user/get-profile",
  providesTags: ["Profile"],
}),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/user/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;