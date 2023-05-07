import { TextField } from "@mui/material";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import { SwiperBooksContainer } from "../../components/shared/swiper-books-container";
import { ROUTES } from "../../config/routes";

import {
  BOOK_ACTIONS,
  getBestBooksAsync,
  getRecomendationBooksAsync,
} from "../../redux-store/actions";
import {
  getBestBooksSelector,
  getRecomendationBooksSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MainPage.module.scss";

export enum MainPageSubCategory {
  BEST_BOOKS,
  RECOMENDATION_BOOKS,
  CURRENT_BOOK,
  ALL,
}

export const MainPage: FC = () => {
  const bestBooks = useSelector(getBestBooksSelector);
  const recomendationBooks = useSelector(getRecomendationBooksSelector);
  const isLoadingBestBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_BEST_BOOKS])
  );
  const isLoadingRecomendationBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_RECOMENDATION_BOOKS])
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBestBooksAsync());
    dispatch(getRecomendationBooksAsync());
  }, [dispatch]);

  const changeSubPage = useCallback(
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

  const [jwt, setjwt] = useState("");
  const test = useCallback(async () => {
    const res = await axios.post("/api/auth/login", {
      username: "test",
      password: "123Aas_@#$",
    });
    setjwt(res.data.access_token);
  }, []);
  const test3 = useCallback(async () => {
    if (jwt) {
      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: "Bearer ",
        },
      });
    }
  }, [jwt]);

  return (
    <div className={styles.main}>
      <button onClick={test}>aaa</button>
      <button onClick={test3}>aaa</button>
      <HeaderContainer>
        <MobileHeader title="Библиотека" />
        <TextField size="small" placeholder="Название книги или автор" />
      </HeaderContainer>
      <ContentContainer>
        <Hidder isLoading={isLoadingRecomendationBooks}>
          <SwiperBooksContainer
            books={recomendationBooks.slice(0, 10)}
            onClickShowAll={() =>
              changeSubPage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
            }
            title="Рекомендации дня"
            onClickBook={onClickBook}
          />
        </Hidder>
        <Hidder isLoading={isLoadingBestBooks}>
          <SwiperBooksContainer
            books={bestBooks.slice(0, 10)}
            onClickShowAll={() => changeSubPage(ROUTES.BEST_BOOKS_PAGE)}
            title="Бестселлеры"
            onClickBook={onClickBook}
          />
        </Hidder>
      </ContentContainer>
    </div>
  );
};
