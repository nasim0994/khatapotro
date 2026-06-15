import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: (query) => ({
        url: "/transaction/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["transaction"],
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: "/transaction/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const { useGetAllTransactionQuery, useAddTransactionMutation } =
  transactionApi;
