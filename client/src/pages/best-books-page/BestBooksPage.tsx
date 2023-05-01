import { FC, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import { PreviewBook } from "../../components/shared/preview-book";
import { BOOK_ACTIONS, getBestBooksAsync } from "../../redux-store/actions";
import {
  getBestBooksSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./BestBooksPage.module.scss";

export const BestBooksPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bestBooks = useSelector(getBestBooksSelector);
  const isLoadingBestBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_BEST_BOOKS])
  );

  useEffect(() => {
    dispatch(getBestBooksAsync());
  }, [dispatch]);

  const onClickBook = useCallback(
    (bookId: number) => {
      navigate(`/books/${bookId}`);
    },
    [navigate]
  );

  const onClickBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Hidder isLoading={isLoadingBestBooks}>
      <div className={styles.main}>
        <HeaderContainer>
          <MobileHeader title="Бестселлеры" onClickBack={onClickBack} />
        </HeaderContainer>
        <ContentContainer>
          {bestBooks.map((book) => (
            <PreviewBook
              key={book.id + book.name}
              bookInfo={book}
              onClick={() => onClickBook(book.id)}
            />
          ))}
        </ContentContainer>
      </div>
    </Hidder>
  );
};
