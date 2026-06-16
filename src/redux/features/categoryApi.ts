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
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
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
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
