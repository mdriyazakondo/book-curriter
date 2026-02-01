import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["invoice"],
  endpoints: (builder) => ({
    getInvoice: builder.query({
      query: (email) => ({
        url: `payments/${email}`,
        method: "GET",
      }),
      providesTags: ["invoice"],
    }),
  }),
});

export const { useGetInvoiceQuery } = invoicesApi;
