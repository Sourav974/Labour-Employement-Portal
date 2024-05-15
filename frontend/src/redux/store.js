import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import { LoginSlice } from "./slices/LoginSlice";
import { SignupSlice } from "./slices/SignupSlice";

const store = new configureStore({
  reducer: {
    login: LoginSlice.reducer,
    signup: SignupSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
