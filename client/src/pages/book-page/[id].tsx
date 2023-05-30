import { Button, Chip, Rating } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { HeaderContainer } from "../../components/shared/header-container";
import { Hidder } from "../../components/shared/hidder";
import { MobileHeader } from "../../components/shared/mobile-header";
import {
  addToReadNowAsync,
  addToWantReadAsync,
  BOOK_ACTIONS,
  deleteMyBookAsync,
  getBookAsync,
} from "../../redux-store/actions";
import {
  getCurrentBookSelector,
  isLoadingByKeysSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import tempCover from "./Clipboard01.jpg";
import { ContentContainer } from "../../components/shared/content-container";
import styles from "./BookPage.module.scss";
import { BookConnector } from "../../api/book-connector";
import { currentUserIdSelector } from "../../redux-store/selectors/user.selector";
import { LoadingButton } from "@mui/lab";

export const BookPage: FC = () => {
  const [isMyBook, setIsMyBook] = useState<boolean>(false);
  const currentUserId = useSelector(currentUserIdSelector);
  const currentBook = useSelector(getCurrentBookSelector);
  const isLoadingBook = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.GET_BOOK])
  );
  const isLoadingAddToWantRead = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.ADD_TO_WANT_READ])
  );
  const isLoadingAddToRadNow = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.ADD_TO_READ_NOW])
  );
  const isLoadingDeleteMyBook = useSelector(
    isLoadingByKeysSelector([BOOK_ACTIONS.DELETE_MY_BOOK])
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkIsMyBook = async () => {
      if (!!currentUserId && !!id) {
        const { data } = await BookConnector.getInstance().isMyBook(
          currentUserId,
          +id
        );
        setIsMyBook(data);
      }
    };
    checkIsMyBook();

    if (id !== undefined && !Number.isNaN(+id)) {
      dispatch(getBookAsync(+id)); // TODO Дописать, что если нет такой книги, редирект на 404
    }
  }, [currentUserId, dispatch, id]);

  const toBackPage = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const addToMyBooks = useCallback(async () => {
    if (!!id) {
      if (!isMyBook) {
        const res = (await dispatch(addToWantReadAsync(+id))).payload;
        if (res) {
          setIsMyBook(true);
        }
      } else {
        const res = (await dispatch(deleteMyBookAsync(+id))).payload;
        if (res) {
          setIsMyBook(false);
        }
      }
    }
  }, [dispatch, id, isMyBook]);

  const addToReadNow = useCallback(async () => {
    if (!!id) {
      const res = (await dispatch(addToReadNowAsync(+id))).payload;
      if (res) {
        setIsMyBook(true);
      }
    }
  }, [dispatch, id]);

  return (
    <Hidder isLoading={isLoadingBook}>
      <div className={styles.main}>
        <HeaderContainer>
          <MobileHeader
            title={currentBook?.name || ""}
            onClickBack={toBackPage}
            typeRightButton="favorite"
            onClickRightButton={addToMyBooks}
            isFavorite={isMyBook}
            isLoadingFavorite={
              isLoadingAddToWantRead ||
              isLoadingDeleteMyBook ||
              isLoadingAddToRadNow
            }
          />
        </HeaderContainer>
        <div className={styles.summary}>
          <div className={styles.author}>{currentBook?.author}</div>
          <Rating value={currentBook?.rate} readOnly size="small" />
          <img className={styles.cover} src={tempCover} alt="" />
        </div>
        <div className={styles.statstic}>
          <StatsticContainer count="18K" name="читают" />
          <StatsticContainer count="9K" name="цитаты" />
          <StatsticContainer count="1K" name="полок" />
          <StatsticContainer count="1K" name="впечатления" />
        </div>
        <ContentContainer>
          <div className={styles.info}>
            <div className={styles.badges}>
              <Chip label="Книги" color="success" size="small" />
            </div>
            <div className={styles.title}>Описание</div>
            <div className={styles.description}>
              {currentBook?.description ||
                "На первый взгляд Уве - самый неуживчивый человек на свете. Пожилой въедливый ворчун, достающий соседей вечными придирками. Его раздражают неправильно припаркованные машины, брошенный мимо урны мусор, говорящие на птичьем языке продавцы, портящие людям жизнь бюрократы...Но у ворчливого педанта - большое доброе сердце. И когда молодая семья новых соседей случайно повреждает автомобилем его почтовый ящик, это происшествие становится началом невероятно трогательной истории об утраченной любви, неожиданной дружбе, бездомных котах и древнем искусстве сдавать назад на автомобиле с прицепом..."}
            </div>
            <div className={styles.buttons}>
              <LoadingButton
                variant="contained"
                fullWidth
                onClick={addToReadNow}
                loading={isLoadingAddToRadNow}
              >
                Читать
              </LoadingButton>
              <Button variant="contained" fullWidth>
                Слушать
              </Button>
            </div>
          </div>
        </ContentContainer>
      </div>
    </Hidder>
  );
};

interface StatsticContainerProps {
  count: string;
  name: string;
}

const StatsticContainer: FC<StatsticContainerProps> = ({ count, name }) => {
  return (
    <div className={styles.container}>
      <div className={styles.count}>{count}</div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};
