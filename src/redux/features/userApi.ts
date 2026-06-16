import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/profile/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deletePermanentUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/permanent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useGetUserByIdQuery,
  useUpdateUserPasswordMutation,
  useDeletePermanentUserMutation,
} = userApi;
