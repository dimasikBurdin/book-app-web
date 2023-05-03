import { FC, useCallback, useEffect } from "react";
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
  getRecomendationBooksAsync,
} from "../../redux-store/actions";
import {
  getRecomendationBooksSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import { ProfileStatistic } from "./components/profile-statistic";
import { ProfileSummary } from "./components/profile-summary";
import styles from "./ProfilePage.module.scss";

export const ProfilePage: FC = () => {
  const recomendationBooks = useSelector(getRecomendationBooksSelector);
  const isLoadingRecomendationBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_RECOMENDATION_BOOKS])
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecomendationBooksAsync());
  }, [dispatch]);

  const onClickBook = useCallback(
    (bookId: number) => {
      navigate(`/books/${bookId}`);
    },
    [navigate]
  );

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

  return (
    <div className={styles.main}>
      <HeaderContainer>
        <MobileHeader
          title="Профиль"
          typeRightButton="settings"
          onClickRightButton={() => changePage(ROUTES.SETTINGS)}
        />
      </HeaderContainer>
      <div className={styles.content}>
        <ContentContainer>
          <ProfileSummary />
        </ContentContainer>
        <ContentContainer>
          <ProfileStatistic
            info={{
              boardCount: 0,
              subscriberCount: 12,
              subscriptionCount: 3,
            }}
          />
        </ContentContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingRecomendationBooks}>
            <SwiperBooksContainer
              books={recomendationBooks.slice(0, 10)}
              onClickShowAll={() =>
                changePage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
              }
              title="Рекомендации дня"
              onClickBook={onClickBook}
            />
          </Hidder>
        </ContentContainer>
        <ContentContainer>
          <Hidder isLoading={isLoadingRecomendationBooks}>
            <SwiperBooksContainer
              books={recomendationBooks.slice(0, 10)}
              onClickShowAll={() =>
                changePage(ROUTES.RECOMMENDATION_BOOKS_PAGE)
              }
              title="Любимые авторы"
              onClickBook={onClickBook}
            />
          </Hidder>
        </ContentContainer>
      </div>
    </div>
  );
};
