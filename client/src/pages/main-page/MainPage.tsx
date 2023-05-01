import { TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
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
import { ListBooksPage } from "./components/list-books-page";
import styles from "./MainPage.module.scss";

export enum MainPageSubCategory {
  BEST_BOOKS,
  RECOMENDATION_BOOKS,
  CURRENT_BOOK,
  ALL,
}

export const MainPage: FC = () => {
  const [currentCategory, setCurrentCategory] = useState<MainPageSubCategory>(
    MainPageSubCategory.ALL
  );
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

  const changeSubPage = useCallback((page: MainPageSubCategory) => {
    setCurrentCategory(page);
  }, []);

  useEffect(() => {
    console.log(currentCategory);
  }, [currentCategory]);

  return (
    <div className={styles.main}>
      <Hidder condition={currentCategory === MainPageSubCategory.ALL}>
        <HeaderContainer>
          <MobileHeader title="Библиотека" onClickBack={undefined} />
          <TextField size="small" placeholder="Название книги или автор" />
        </HeaderContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingRecomendationBooks}>
            <SwiperBooksContainer
              books={recomendationBooks.slice(0, 10)}
              onClickShowAll={() =>
                changeSubPage(MainPageSubCategory.RECOMENDATION_BOOKS)
              }
              title="Рекомендации дня"
            />
          </Hidder>
          <Hidder isLoading={isLoadingBestBooks}>
            <SwiperBooksContainer
              books={bestBooks.slice(0, 10)}
              onClickShowAll={() =>
                changeSubPage(MainPageSubCategory.BEST_BOOKS)
              }
              title="Бестселлеры"
            />
          </Hidder>
        </ContentContainer>
      </Hidder>
      <Hidder condition={currentCategory === MainPageSubCategory.BEST_BOOKS}>
        <ListBooksPage
          books={bestBooks}
          title="Бестселлеры"
          onClickBack={() => changeSubPage(MainPageSubCategory.ALL)}
        />
      </Hidder>
      <Hidder
        condition={currentCategory === MainPageSubCategory.RECOMENDATION_BOOKS}
      >
        <ListBooksPage
          books={recomendationBooks}
          title="Рекомендации дня"
          onClickBack={() => changeSubPage(MainPageSubCategory.ALL)}
        />
      </Hidder>
    </div>
  );
};
