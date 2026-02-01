import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const wishListApi = createApi({
  reducerPath: "wishListApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["wishList"],
  endpoints: (builder) => ({
    createWishList: builder.mutation({
      query: (data) => ({
        url: "wish-list",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishList"],
    }),
    getAllWishList: builder.query({
      query: () => ({ url: "wish-list", method: "GET" }),
      providesTags: ["wishList"],
    }),
    deleteWishList: builder.mutation({
      query: (id) => ({
        url: `wish-list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishList"],
    }),
  }),
});

export const {
  useCreateWishListMutation,
  useGetAllWishListQuery,
  useDeleteWishListMutation,
} = wishListApi;
