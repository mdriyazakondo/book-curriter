import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const latestApi = createApi({
  reducerPath: "latestApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["latest"],
  endpoints: (builder) => ({
    latestBook: builder.query({
      query: () => ({
        url: "latest",
        method: "GET",
      }),
      providesTags: ["latest"],
    }),
  }),
});

export const { useLatestBookQuery } = latestApi;
