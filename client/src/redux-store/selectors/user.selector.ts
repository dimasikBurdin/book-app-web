import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const userSelector = (state: Store) => state.user;

export const getTokenSelector = createSelector([userSelector], ({ token }) => {
  return token;
});

export const currentUserSelector = createSelector(
  [userSelector],
  ({ currentUser }) => {
    return currentUser;
  }
);

export const currentUserIdSelector = createSelector(
  [userSelector],
  ({ currentUser }) => {
    return currentUser?.userId;
  }
);
