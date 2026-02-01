import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/users/userApi";
import { bookApi } from "./features/books/bookApi";
import { orderSlice } from "./features/orders/orderSlice";
import { reviewApi } from "./features/reviews/reviewApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      bookApi.middleware,
      orderSlice.middleware,
      reviewApi.middleware,
    ),
});
