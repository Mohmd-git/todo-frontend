import { apiSlice } from "../backendApiRedux/apiSlice";

const AUTH_API = "/api/auth"; // ✅ KEEP /api here

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/login`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/resend-otp`,
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ id, newPassword }) => ({
        url: `${AUTH_API}/reset-password/${id}`,
        method: "PUT",
        body: { newPassword },
      }),
    }),
  }),
});


export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;