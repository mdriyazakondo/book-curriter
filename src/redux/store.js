import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/users/userApi";
import { bookApi } from "./features/books/bookApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, bookApi.middleware),
});
