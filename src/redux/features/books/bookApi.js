import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ search = "", sort = "" } = {}) => ({
        url: `books`,
        method: "GET",
        params: { search, sort },
      }),
      providesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const { useGetAllBooksQuery, useCreateBookMutation } = bookApi;
