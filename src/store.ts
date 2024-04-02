import { configureStore } from "@reduxjs/toolkit";
import snippetReducer from "./features/snippets/snippetSlice.js";
import { customMiddleware } from "./middleware/customMiddleware.js";

export const store = configureStore({
  reducer: snippetReducer,
  // adding custom middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:
export type AppDispatch = typeof store.dispatch;
