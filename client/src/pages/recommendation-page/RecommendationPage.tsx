import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import { PreviewBook } from "../../components/shared/preview-book";
import {
  BOOK_ACTIONS,
  getRecomendationBooksAsync,
} from "../../redux-store/actions";
import {
  getRecomendationBooksSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./RecommendationPage.module.scss";

export const RecommendationPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recomendationBooks = useSelector(getRecomendationBooksSelector);
  const isLoadingRecomendationBooks = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_RECOMENDATION_BOOKS])
  );

  useEffect(() => {
    dispatch(getRecomendationBooksAsync());
  }, [dispatch]);

  const onClickBook = useCallback(
    (bookId: number) => {
      navigate(`/books/${bookId}`);
    },
    [navigate]
  );

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Hidder isLoading={isLoadingRecomendationBooks}>
      <div className={styles.main}>
        <HeaderContainer>
          <MobileHeader title="Рекомендации дня" onClickBack={onClickBack} />
        </HeaderContainer>
        <ContentContainer>
          {recomendationBooks.map((book) => (
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
