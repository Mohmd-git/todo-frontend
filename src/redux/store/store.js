import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../appSlices/authSlice";
import { apiSlice } from "../backendApiRedux/apiSlice";
import { profileApi } from "../api/profileapi";
import { adminApi } from "../api/adminApi";
import { adminAuthApi } from "../api/adminAuthApi";
import { userApi } from "../api/userapi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(profileApi.middleware)
      .concat(adminApi.middleware)
      .concat(adminAuthApi.middleware)
      .concat(userApi.middleware),
});