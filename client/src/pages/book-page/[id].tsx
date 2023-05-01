import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import { BOOK_ACTIONS, getBookAsync } from "../../redux-store/actions";
import {
  getCurrentBookSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./BookPage.module.scss";

export const BookPage: FC = () => {
  const dispatch = useAppDispatch();
  const currentBook = useSelector(getCurrentBookSelector);
  const isLoadingBook = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_BOOK])
  );
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(+id)) {
      dispatch(getBookAsync(+id)); // Дописать, что если нет такой книги, редирект на 404
    }
  }, [dispatch, id]);

  const toBackPage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Hidder isLoading={isLoadingBook}>
      <div className={styles.main}>
        <HeaderContainer>
          <MobileHeader title={currentBook?.name!} onClickBack={toBackPage} />
        </HeaderContainer>
      </div>
    </Hidder>
  );
};
