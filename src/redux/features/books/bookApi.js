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
    getBookById: builder.query({
      query: (id) => ({
        url: `books/${id}`,
        method: "GET",
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
    // dashboard
    myAllBooks: builder.query({
      query: (email) => ({
        url: `my-books/${email}`,
        method: "GET",
      }),
      providesTags: ["book"],
    }),
    deleteBooks: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),

    bookUpdate: builder.mutation({
      query: ({ id, status }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["book"],
    }),
    myBookUpdate: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    updateBookById: builder.query({
      query: (id) => ({
        url: `update-book/${id}`,
        method: "GET",
      }),
      providesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useGetBookByIdQuery,
  useMyAllBooksQuery,
  useDeleteBooksMutation,
  useBookUpdateMutation,
  useMyBookUpdateMutation,
  useUpdateBookByIdQuery,
} = bookApi;
