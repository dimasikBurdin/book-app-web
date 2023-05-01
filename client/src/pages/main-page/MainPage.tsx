import { TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import { SwiperBooksContainer } from "../../components/shared/swiper-books-container";

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

  useEffect(() => {
    dispatch(getBestBooksAsync());
    dispatch(getRecomendationBooksAsync());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <HeaderContainer>
        <MobileHeader title="Библиотека" onClickBack={undefined} />
        <TextField size="small" placeholder="Название книги или автор" />
      </HeaderContainer>
      <ContentContainer>
        <Hidder isLoading={isLoadingRecomendationBooks}>
          <SwiperBooksContainer
            books={recomendationBooks}
            onClickShowAll={() => {}}
            title="Рекомендации дня"
          />
        </Hidder>
        <Hidder isLoading={isLoadingBestBooks}>
          <SwiperBooksContainer
            books={bestBooks}
            onClickShowAll={() => {}}
            title="Бестселлеры"
          />
        </Hidder>
      </ContentContainer>
    </div>
  );
};
