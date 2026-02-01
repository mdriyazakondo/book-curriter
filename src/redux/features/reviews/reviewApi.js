import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["review"],
  endpoints: (builder) => ({
    myReviews: builder.query({
      query: (id) => ({
        url: `review/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useMyReviewsQuery, useCreateReviewMutation } = reviewApi;
