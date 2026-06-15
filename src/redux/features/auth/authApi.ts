import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user-auth/register",
        method: "POST",
        body: data,
      }),
    }),
    registerVerificationUser: builder.mutation({
      query: (data) => ({
        url: "/user-auth/verification",
        method: "POST",
        body: data,
      }),
    }),
    resentOtp: builder.mutation({
      query: (data) => ({
        url: "/user-auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user-auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useRegisterVerificationUserMutation,
  useResentOtpMutation,
  useLoginUserMutation,
} = authApi;
