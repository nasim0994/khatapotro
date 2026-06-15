import { baseApi } from "@/redux/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (query) => ({
        url: "/category/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery, useAddCategoryMutation } = categoryApi;
