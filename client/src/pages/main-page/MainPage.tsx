import { CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { BOOK_ACTIONS, getBestBooksAsync } from "../../redux-store/actions";
import {
  getBestBooksSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";

import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const bestBooks = useSelector(getBestBooksSelector);
  const isLoading = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_BEST_BOOKS])
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBestBooksAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      {isLoading && <CircularProgress />}
      {!isLoading &&
        bestBooks.map(({ author, name }) => (
          <div key={name}>
            <div>{author}</div>
            <div>{name}</div>
          </div>
        ))}
    </div>
  );
};
