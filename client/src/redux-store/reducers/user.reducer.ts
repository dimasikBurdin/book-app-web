import { createReducer } from "@reduxjs/toolkit";
import { UserStore } from "../../typing/store/user.store";
import { LocalStorageManager, STORAGE_KEYS } from "../../utils";

import { setCurrentUserAction, setTokenAction } from "../actions";

const initialState: UserStore = {
  token: (() => {
    return LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.JWT,
      false
    );
  })(),
  currentUserId: (() => {
    const token = LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.JWT,
      false
    );
    if (token) {
      return JSON.parse(atob(token.split(".")[1])).sub;
    }
    return null;
  })(),
};

const setToken = (
  state: UserStore,
  action: ReturnType<typeof setTokenAction>
): UserStore => {
  LocalStorageManager.setToLocalStorage(
    STORAGE_KEYS.JWT,
    action.payload,
    false
  );
  return {
    ...state,
    token: action.payload,
  };
};

const setCurrentUser = (
  state: UserStore,
  action: ReturnType<typeof setCurrentUserAction>
): UserStore => {
  return {
    ...state,
    currentUserId: action.payload,
  };
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTokenAction, setToken)
    .addCase(setCurrentUserAction, setCurrentUser);
});
