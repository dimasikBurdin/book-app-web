import { Button } from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { ListBooksPage } from "../../components/shared/list-books-page";
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
import { Book } from "../../typing/book";
import styles from "./MyBooksPage.module.scss";

type CategoryItems = {
  title: string;
  books: Book[];
  isLoading: boolean;
}[];

export const MyBooksPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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

  // TO DO ето надо получать с бека
  const categoryItems: CategoryItems = useMemo((): CategoryItems => {
    return [
      {
        title: "Все книги",
        books: preparedMyAllBooks,
        isLoading: isLoadingMyBooks,
      },
      {
        title: "Читаю сейчас",
        books: preparedMyReadingBooks,
        isLoading: isLoadingMyReadingBooks,
      },
      {
        title: "Законченные",
        books: preparedMyFinishedBooks,
        isLoading: isLoadingMyFinishedBooks,
      },
      {
        title: "Хочу прочитать",
        books: preparedMyWantReadBooks,
        isLoading: isLoadingMyWantBooks,
      },
    ];
  }, [
    isLoadingMyBooks,
    isLoadingMyFinishedBooks,
    isLoadingMyReadingBooks,
    isLoadingMyWantBooks,
    preparedMyAllBooks,
    preparedMyFinishedBooks,
    preparedMyReadingBooks,
    preparedMyWantReadBooks,
  ]);

  const changePage = useCallback(
    (page: ROUTES | number) => {
      if (!Number.isNaN(+page)) {
        navigate(page as number);
      } else {
        navigate(`/${page}`);
      }
    },
    [navigate]
  );

  const onClickBook = useCallback(
    (bookId: number) => {
      navigate(`/books/${bookId}`);
    },
    [navigate]
  );

  const onClickShowAll = useCallback((index: number) => {
    setSelectedCategory(index);
  }, []);

  const closeCategory = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  return (
    <div className={styles.main}>
      <Hidder condition={selectedCategory === null}>
        <HeaderContainer>
          <MobileHeader title="Мои книги" />
        </HeaderContainer>
        <div className={styles.content}>
          {categoryItems.map(({ books, title, isLoading }, index) => (
            <ContentContainer key={title}>
              <Hidder isLoading={isLoading}>
                <SwiperBooksContainer
                  books={books.slice(0, 10)}
                  onClickShowAll={() => onClickShowAll(index)}
                  title={title}
                  onClickBook={onClickBook}
                />
              </Hidder>
            </ContentContainer>
          ))}
          <ContentContainer>
            <Hidder isLoading={isLoadingMyBooks}>
              <div className={styles.summaryContainer}>
                {categoryItems.map(({ books, title }) => (
                  <div className={styles.summary}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.count}>{books.length}</div>
                  </div>
                ))}
              </div>
            </Hidder>
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
      </Hidder>
      <Hidder condition={selectedCategory !== null}>
        {selectedCategory !== null && (
          <ListBooksPage
            books={categoryItems[selectedCategory].books}
            onClickBack={closeCategory}
            onClickBook={onClickBook}
            title={categoryItems[selectedCategory].title}
          />
        )}
      </Hidder>
    </div>
  );
};
