import { baseApi } from "@/redux/baseApi";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserBalanceReport: builder.query({
      query: (id) => ({
        url: `/report/balance/${id}`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
    getStatisticsReport: builder.query({
      query: ({ id, query }) => ({
        url: `/report/statistics/${id}`,
        method: "GET",
        params: query,
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetUserBalanceReportQuery, useGetStatisticsReportQuery } =
  reportApi;
