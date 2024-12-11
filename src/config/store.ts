import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../config/Slice";
import profileReducer from "./UserProfileSlice";
import transactionReducer from "../config/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    transactions: transactionReducer,
    // tambahanreducers...
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
