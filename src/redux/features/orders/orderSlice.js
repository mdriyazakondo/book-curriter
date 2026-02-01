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
    myBookOrder: builder.query({
      query: (email) => ({
        url: `orders/${email}/payments`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    myOrderData: builder.query({
      query: (email) => ({
        url: `orders/${email}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    orderCancel: builder.mutation({
      query: ({ id, status }) => ({
        url: `order-cancelled/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useMyBookOrderQuery,
  useMyOrderDataQuery,
  useOrderCancelMutation,
} = orderSlice;
