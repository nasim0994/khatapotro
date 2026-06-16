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
    getTransactionById: builder.query({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "GET",
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
    updateTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/transaction/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const {
  useGetAllTransactionQuery,
  useGetTransactionByIdQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
