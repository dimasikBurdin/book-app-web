import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BookConnector } from "../../api/book-connector";
import {
  BestBooks,
  Book,
  BookTypes,
  MyBooks,
  RecomendationBooks,
} from "../../typing/book";
import { Store } from "../../typing/store/store";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum BOOK_ACTIONS {
  GET_BEST_BOOKS = "[BOOKS] GET_BEST_BOOKS",
  SET_BEST_BOOKS = "[BOOKS] SET_BEST_BOOKS",
  GET_RECOMENDATION_BOOKS = "[BOOKS] GET_RECOMENDATION_BOOKS",
  SET_RECOMENDATION_BOOKS = "[BOOKS] SET_RECOMENDATION_BOOKS",
  GET_MY_BOOKS = "[BOOKS] GET_MY_BOOKS",
  SET_MY_BOOKS = "[BOOKS] SET_MY_BOOKS",
  GET_MY_READING_BOOKS = "[BOOKS] GET_MY_READING_BOOKS",
  SET_MY_READING_BOOKS = "[BOOKS] SET_MY_READING_BOOKS",
  GET_MY_WANT_READ_BOOKS = "[BOOKS] GET_MY_WANT_READ_BOOKS",
  SET_MY_WANT_READ_BOOKS = "[BOOKS] SET_MY_WANT_READ_BOOKS",
  GET_MY_FINISHED_BOOKS = "[BOOKS] GET_MY_FINISHED_BOOKS",
  SET_MY_FINISHED_BOOKS = "[BOOKS] SET_MY_FINISHED_BOOKS",
  GET_BOOK = "[BOOKS] GET_BOOK",
  SET_BOOK = "[BOOKS] SET_BOOK",
  ADD_TO_WANT_READ = "[BOOKS] ADD_TO_WANT_READ",
  ADD_TO_READ_NOW = "[BOOKS] ADD_TO_READ_NOW",
  DELETE_MY_BOOK = "[BOOKS] DELETE_MY_BOOK",
}

export const setBestBooksAction = createAction<BestBooks>(
  BOOK_ACTIONS.SET_BEST_BOOKS
);

export const setRecomendationBooksAction = createAction<RecomendationBooks>(
  BOOK_ACTIONS.SET_RECOMENDATION_BOOKS
);

export const setMyBooksAction = createAction<MyBooks>(
  BOOK_ACTIONS.SET_MY_BOOKS
);

export const setMyReadingBooksAction = createAction<MyBooks>(
  BOOK_ACTIONS.SET_MY_READING_BOOKS
);

export const setMyWantReadBooksAction = createAction<MyBooks>(
  BOOK_ACTIONS.SET_MY_WANT_READ_BOOKS
);

export const setMyFinishedBooksAction = createAction<MyBooks>(
  BOOK_ACTIONS.SET_MY_FINISHED_BOOKS
);

export const setBookAction = createAction<Book>(BOOK_ACTIONS.SET_BOOK);

export const getBestBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_BEST_BOOKS,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_BEST_BOOKS));

    try {
      const { data } = await BookConnector.getInstance().getBestBooks();
      dispatch(setBestBooksAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_BEST_BOOKS));
  }
);

export const getRecomendationBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_RECOMENDATION_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_RECOMENDATION_BOOKS));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      const { data } = await BookConnector.getInstance().getRecomendationBooks(
        userId
      );
      dispatch(setRecomendationBooksAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_RECOMENDATION_BOOKS));
  }
);

export const getMyBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_MY_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_MY_BOOKS));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      const { data } = await BookConnector.getInstance().getMyBooks(userId);
      dispatch(setMyBooksAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_MY_BOOKS));
  }
);

export const getMyReadingBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.SET_MY_READING_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.SET_MY_READING_BOOKS));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      const { data } = await BookConnector.getInstance().getMyReadingBooks(
        userId
      );
      dispatch(setMyReadingBooksAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.SET_MY_READING_BOOKS));
  }
);
export const getMyWantReadBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.SET_MY_WANT_READ_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.SET_MY_WANT_READ_BOOKS));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!!;
      const { data } = await BookConnector.getInstance().getMyWantReadBooks(
        userId
      );
      dispatch(setMyWantReadBooksAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.SET_MY_WANT_READ_BOOKS));
  }
);
export const getMyFinishedBooksAsync = createAsyncThunk(
  BOOK_ACTIONS.SET_MY_FINISHED_BOOKS,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.SET_MY_FINISHED_BOOKS));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      const { data } = await BookConnector.getInstance().getMyFinishedBooks(
        userId
      );
      dispatch(setMyFinishedBooksAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.SET_MY_FINISHED_BOOKS));
  }
);

export const getBookAsync = createAsyncThunk(
  BOOK_ACTIONS.GET_BOOK,
  async (bookId: number, { dispatch }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.GET_BOOK));

    try {
      const { data } = await BookConnector.getInstance().getBook(bookId);
      dispatch(setBookAction(data));
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoadedAction(BOOK_ACTIONS.GET_BOOK));
  }
);

export const addToWantReadAsync = createAsyncThunk(
  BOOK_ACTIONS.ADD_TO_WANT_READ,
  async (bookId: number, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.ADD_TO_WANT_READ));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      await BookConnector.getInstance().addToMyBooks({
        bookId,
        userId,
        type: BookTypes.WANT_READ,
      });

      dispatch(setLoadedAction(BOOK_ACTIONS.ADD_TO_WANT_READ));
      return true;
    } catch (error) {
      console.log(error);

      dispatch(setLoadedAction(BOOK_ACTIONS.ADD_TO_WANT_READ));
      return false;
    }
  }
);

export const addToReadNowAsync = createAsyncThunk(
  BOOK_ACTIONS.ADD_TO_READ_NOW,
  async (bookId: number, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.ADD_TO_READ_NOW));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      await BookConnector.getInstance().addToMyBooks({
        bookId,
        userId,
        type: BookTypes.READ_NOW,
      });

      dispatch(setLoadedAction(BOOK_ACTIONS.ADD_TO_READ_NOW));
      return true;
    } catch (error) {
      console.log(error);

      dispatch(setLoadedAction(BOOK_ACTIONS.ADD_TO_READ_NOW));
      return false;
    }
  }
);

export const deleteMyBookAsync = createAsyncThunk(
  BOOK_ACTIONS.DELETE_MY_BOOK,
  async (bookId: number, { dispatch, getState }) => {
    dispatch(setLoadingAction(BOOK_ACTIONS.DELETE_MY_BOOK));

    try {
      const userId = (getState() as Store).user.currentUser?.userId!;
      await BookConnector.getInstance().deleteMyBook({
        bookId,
        userId,
      });

      dispatch(setLoadedAction(BOOK_ACTIONS.DELETE_MY_BOOK));
      return true;
    } catch (error) {
      console.log(error);

      dispatch(setLoadedAction(BOOK_ACTIONS.DELETE_MY_BOOK));
      return false;
    }
  }
);
