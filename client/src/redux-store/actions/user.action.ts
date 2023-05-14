import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserConnector } from "../../api/user-connector";
import { LoginUserPayload, RegisterUserPayload } from "../../typing/user";
import { setLoadingAction, setLoadedAction } from "./common.action";

export enum USER_ACTIONS {
  REGISTER_USER = "[USER] REGISTER_USER",
  LOGIN_USER = "[USER] LOGIN_USER",
  SET_TOKEN = "[USER] SET_TOKEN",
  SET_CURRENT_USER = "[USER] SET_CURRENT_USER",
}

export const setTokenAction = createAction<string>(USER_ACTIONS.SET_TOKEN);

export const setCurrentUserAction = createAction<number>(
  USER_ACTIONS.SET_CURRENT_USER
);

export const registerUserAsync = createAsyncThunk(
  USER_ACTIONS.REGISTER_USER,
  async (payload: RegisterUserPayload, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.REGISTER_USER));

    try {
      await UserConnector.getInstance().registerUser(payload);
    } catch (error) {
      alert(error);
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
      dispatch(setCurrentUserAction(data.userId));
    } catch (error) {
      alert(error);
    }

    dispatch(setLoadedAction(USER_ACTIONS.LOGIN_USER));
  }
);
