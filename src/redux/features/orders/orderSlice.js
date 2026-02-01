import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const orderSlice = createApi({
  reducerPath: "bookOrder",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderSlice;
