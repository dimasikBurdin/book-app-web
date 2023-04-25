import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BookConnector } from "../../api/book-connector";
import { BestBooks, MyBooks, RecomendationBooks } from "../../typing/book";
import { Store } from "../../typing/store/store";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum BOOK_ACTIONS {
  GET_BEST_BOOKS = "[BOOKS] GET_BEST_BOOKS",
  SET_BEST_BOOKS = "[BOOKS] SET_BEST_BOOKS",
  GET_RECOMENDATION_BOOKS = "[BOOKS] GET_RECOMENDATION_BOOKS",
  SET_RECOMENDATION_BOOKS = "[BOOKS] SET_RECOMENDATION_BOOKS",
  GET_MY_BOOKS_BOOKS = "[BOOKS] GET_MY_BOOKS_BOOKS",
  SET_MY_BOOKS_BOOKS = "[BOOKS] SET_MY_BOOKS_BOOKS",
}

export const setBestBooksAction = createAction<BestBooks>(
  BOOK_ACTIONS.SET_BEST_BOOKS
);

export const setRecomendationBooksAction = createAction<RecomendationBooks>(
  BOOK_ACTIONS.SET_RECOMENDATION_BOOKS
);

export const setMyBooksAction = createAction<MyBooks>(
  BOOK_ACTIONS.SET_MY_BOOKS_BOOKS
);

export const getBestBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_BEST_BOOKS,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_BEST_BOOKS));

    try {
      const { data } = await BookConnector.getInstance().getBestBooks();
      dispatch(setBestBooksAction(data));
    } catch (error) {
      alert(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_BEST_BOOKS));
  }
);

export const getRecomendationBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_RECOMENDATION_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_RECOMENDATION_BOOKS));

    try {
      const userId = (getState() as Store).common.userId;
      const { data } = await BookConnector.getInstance().getRecomendationBooks(
        userId
      );
      dispatch(setRecomendationBooksAction(data));
    } catch (error) {
      alert(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_RECOMENDATION_BOOKS));
  }
);

export const getMyBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_MY_BOOKS_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_MY_BOOKS_BOOKS));

    try {
      const userId = (getState() as Store).common.userId;
      const { data } = await BookConnector.getInstance().getMyBooks(userId);
      dispatch(setMyBooksAction(data));
    } catch (error) {
      alert(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_MY_BOOKS_BOOKS));
  }
);
