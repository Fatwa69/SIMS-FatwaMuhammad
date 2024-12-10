import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../config/Slice";
import profileReducer from "./UserProfileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    // tambahanreducers...
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
