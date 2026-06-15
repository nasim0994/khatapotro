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
  }),
});

export const { useGetAllTransactionQuery } = transactionApi;
