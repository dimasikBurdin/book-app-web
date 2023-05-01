import { Button, Chip, Rating } from "@mui/material";
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
import tempCover from "./Clipboard01.jpg";
import styles from "./BookPage.module.scss";
import { ContentContainer } from "../../components/shared/content-container";

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
      dispatch(getBookAsync(+id)); // TODO Дописать, что если нет такой книги, редирект на 404
    }
  }, [dispatch, id]);

  const toBackPage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Hidder isLoading={isLoadingBook}>
      <div className={styles.main}>
        <HeaderContainer>
          <MobileHeader
            title={currentBook?.name || ""}
            onClickBack={toBackPage}
          />
        </HeaderContainer>
        <div className={styles.summary}>
          <div className={styles.author}>{currentBook?.author}</div>
          <Rating value={currentBook?.rate} readOnly size="small" />
          <img className={styles.cover} src={tempCover} alt="" />
        </div>
        <div className={styles.statstic}>
          {/* TODO в компонент */}
          <div className={styles.container}>
            <div className={styles.count}>18K</div>
            <div className={styles.name}>читают</div>
          </div>
          <div className={styles.container}>
            <div className={styles.count}>9K</div>
            <div className={styles.name}>цитаты</div>
          </div>
          <div className={styles.container}>
            <div className={styles.count}>1K</div>
            <div className={styles.name}>полок</div>
          </div>
          <div className={styles.container}>
            <div className={styles.count}>1K</div>
            <div className={styles.name}>впечатления</div>
          </div>
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
              <Button variant="contained" fullWidth>
                Читать
              </Button>
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
