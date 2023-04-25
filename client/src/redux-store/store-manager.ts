import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { bookReducer } from "./reducers";
import { commonReducer } from "./reducers/common.reducer";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddelware) => [
    ...getDefaultMiddelware({
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<StorageEvent, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
