import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectServices = (state: RootState) => state.profile.services;



export const selectMemoizedServices = createSelector(
  [selectServices],
  (services) => services || []
);
