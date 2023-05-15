import { createReducer } from "@reduxjs/toolkit";
import { UserStore } from "../../typing/store/user.store";
import { LocalStorageManager, STORAGE_KEYS } from "../../utils";

import {
  logoutUserAction,
  setCurrentUserAction,
  setCurrentUserIdAction,
  setTokenAction,
} from "../actions";

const initialState: UserStore = {
  token: (() => {
    return LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.JWT,
      false
    );
  })(),
  currentUser: (() => {
    const token = LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.JWT,
      false
    );
    if (token) {
      return {
        userId: JSON.parse(atob(token.split(".")[1])).sub,
        email: null,
        name: null,
      };
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
    currentUser: action.payload,
  };
};

const setCurrentUserId = (
  state: UserStore,
  action: ReturnType<typeof setCurrentUserIdAction>
): UserStore => {
  console.log(action.payload);
  return {
    ...state,
    currentUser: {
      ...(state.currentUser || { email: null, name: null }),
      userId: action.payload,
    },
  };
};

const logoutUser = (
  state: UserStore,
  action: ReturnType<typeof logoutUserAction>
): UserStore => {
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.JWT);

  return {
    ...state,
    currentUser: null,
    token: null,
  };
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTokenAction, setToken)
    .addCase(setCurrentUserAction, setCurrentUser)
    .addCase(setCurrentUserIdAction, setCurrentUserId)
    .addCase(logoutUserAction, logoutUser);
});
