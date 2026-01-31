import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (email) => ({
        url: `all-users/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    userCreate: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "user-role",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUserCreateMutation,
  useUpdateUserMutation,
} = userApi;
