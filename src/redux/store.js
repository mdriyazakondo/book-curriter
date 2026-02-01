import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/users/userApi";
import { bookApi } from "./features/books/bookApi";
import { orderSlice } from "./features/orders/orderSlice";
import { reviewApi } from "./features/reviews/reviewApi";
import { latestApi } from "./features/latestBook/latestApi";
import { wishListApi } from "./features/wishList/wishListApi";
import { invoicesApi } from "./features/invoices/invoice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [latestApi.reducerPath]: latestApi.reducer,
    [wishListApi.reducerPath]: wishListApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      bookApi.middleware,
      orderSlice.middleware,
      reviewApi.middleware,
      latestApi.middleware,
      invoicesApi.middleware,
    ),
});
