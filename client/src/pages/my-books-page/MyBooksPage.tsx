import { Button, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import { SwiperBooksContainer } from "../../components/shared/swiper-books-container";
import { ROUTES } from "../../config/routes";
import {
  getMyFinishedBooksAsync,
  BOOK_ACTIONS,
  getMyBooksAsync,
  getMyReadingBooksAsync,
  getMyWantReadBooksAsync,
} from "../../redux-store/actions";
import {
  getMyBooksSelector,
  getMyFinishedBooksSelector,
  getMyReadingBooksSelector,
  getMyWantReadBooksSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MyBooksPage.module.scss";

export const MyBooksPage: FC = () => {
  const myAllBooks = useSelector(getMyBooksSelector);
  const myReadingBooks = useSelector(getMyReadingBooksSelector);
  const myWantBooks = useSelector(getMyWantReadBooksSelector);
  const myFinishedBooks = useSelector(getMyFinishedBooksSelector);
  const isLoadingMyBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_MY_BOOKS])
  );
  const isLoadingMyWantBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_MY_WANT_READ_BOOKS])
  );
  const isLoadingMyFinishedBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_MY_FINISHED_BOOKS])
  );
  const isLoadingMyReadingBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_MY_READING_BOOKS])
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyBooksAsync());
    dispatch(getMyReadingBooksAsync());
    dispatch(getMyWantReadBooksAsync());
    dispatch(getMyFinishedBooksAsync());
  }, [dispatch]);

  const preparedMyAllBooks = useMemo(() => {
    return myAllBooks.map((book) => book.book.book);
  }, [myAllBooks]);

  const preparedMyReadingBooks = useMemo(() => {
    return myReadingBooks.map((book) => book.book.book);
  }, [myReadingBooks]);

  const preparedMyWantReadBooks = useMemo(() => {
    return myWantBooks.map((book) => book.book.book);
  }, [myWantBooks]);

  const preparedMyFinishedBooks = useMemo(() => {
    return myFinishedBooks.map((book) => book.book.book);
  }, [myFinishedBooks]);

  const changePage = useCallback(
    (page: ROUTES) => {
      navigate(page);
    },
    [navigate]
  );

  const onClickBook = useCallback(
    (bookId: number) => {
      navigate(`/books/${bookId}`);
    },
    [navigate]
  );
  return (
    <div className={styles.main}>
      <HeaderContainer>
        <MobileHeader title="Мои книги" />
      </HeaderContainer>
      <div className={styles.content}>
        <ContentContainer>
          <Hidder isLoading={isLoadingMyReadingBooks}>
            <SwiperBooksContainer
              books={preparedMyReadingBooks.slice(0, 10)}
              onClickShowAll={() =>
                changePage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
              }
              title="Читаю сейчас"
              onClickBook={onClickBook}
            />
          </Hidder>
        </ContentContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingMyBooks}>
            <SwiperBooksContainer
              books={preparedMyAllBooks.slice(0, 10)}
              onClickShowAll={() =>
                changePage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
              }
              title="Все книги"
              onClickBook={onClickBook}
            />
          </Hidder>
        </ContentContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingMyFinishedBooks}>
            <SwiperBooksContainer
              books={preparedMyFinishedBooks.slice(0, 10)}
              onClickShowAll={() =>
                changePage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
              }
              title="Законченные"
              onClickBook={onClickBook}
            />
          </Hidder>
        </ContentContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingMyWantBooks}>
            <SwiperBooksContainer
              books={preparedMyWantReadBooks.slice(0, 10)}
              onClickShowAll={() =>
                changePage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
              }
              title="Хочу прочитать"
              onClickBook={onClickBook}
            />
          </Hidder>
        </ContentContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingMyBooks}>Сводка</Hidder>
        </ContentContainer>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            fullWidth
            style={{ fontSize: 12, borderRadius: 24, padding: 12 }}
          >
            Загрузить книгу
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{ fontSize: 12, borderRadius: 24, padding: 12 }}
          >
            Добавить полку
          </Button>
        </div>
      </div>
    </div>
  );
};
