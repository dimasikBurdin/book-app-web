import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserConnector } from "../../api/user-connector";
import { LoginUserPayload, RegisterUserPayload, User } from "../../typing/user";
import { setLoadingAction, setLoadedAction } from "./common.action";

export enum USER_ACTIONS {
  REGISTER_USER = "[USER] REGISTER_USER",
  LOGIN_USER = "[USER] LOGIN_USER",
  SET_TOKEN = "[USER] SET_TOKEN",
  SET_CURRENT_USER = "[USER] SET_CURRENT_USER",
  GET_CURRENT_USER = "[USER] GET_CURRENT_USER",
  SET_CURRENT_USER_ID = "[USER] SET_CURRENT_USER_ID",
  LOGOUT_USER = "[USER] LOGOUT_USER",
}

export const setTokenAction = createAction<string>(USER_ACTIONS.SET_TOKEN);

export const setCurrentUserAction = createAction<User>(
  USER_ACTIONS.SET_CURRENT_USER
);

export const setCurrentUserIdAction = createAction<number>(
  USER_ACTIONS.SET_CURRENT_USER_ID
);

export const logoutUserAction = createAction<void>(USER_ACTIONS.LOGOUT_USER);

export const registerUserAsync = createAsyncThunk(
  USER_ACTIONS.REGISTER_USER,
  async (payload: RegisterUserPayload, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.REGISTER_USER));

    try {
      await UserConnector.getInstance().registerUser(payload);
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(USER_ACTIONS.REGISTER_USER));
  }
);

export const loginUserAsync = createAsyncThunk(
  USER_ACTIONS.LOGIN_USER,
  async (payload: LoginUserPayload, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.LOGIN_USER));

    try {
      const { data } = await UserConnector.getInstance().loginUser(payload);

      dispatch(setTokenAction(data.access_token));
      dispatch(setCurrentUserIdAction(data.userId));

      await dispatch(getCurrentUserAsync(data.userId));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(USER_ACTIONS.LOGIN_USER));
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  USER_ACTIONS.LOGOUT_USER,
  async (payload: number, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.LOGOUT_USER));

    try {
      const { data } = await UserConnector.getInstance().getCurrentUser(
        payload
      );

      dispatch(setCurrentUserAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(USER_ACTIONS.LOGOUT_USER));
  }
);
