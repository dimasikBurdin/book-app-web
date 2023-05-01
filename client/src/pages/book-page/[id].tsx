import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getBookAsync } from "../../redux-store/actions";
import { getCurrentBookSelector } from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./BookPage.module.scss";

export const BookPage: FC = () => {
  const dispatch = useAppDispatch();
  const currentBook = useSelector(getCurrentBookSelector);
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(+id)) {
      dispatch(getBookAsync(+id));
    }
  }, [dispatch, id]);

  return <div className={styles.main}>{currentBook?.name}</div>;
};
