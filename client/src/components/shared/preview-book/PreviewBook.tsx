import { Chip, IconButton, Rating } from "@mui/material";
import type { FC } from "react";
import { Book } from "../../../typing/book";
import { getShortString } from "../../../utils/get-short-string";
import tempCover from "../swiper-books-container/Clipboard01.jpg";
import AddIcon from "@mui/icons-material/Add";
import styles from "./PreviewBook.module.scss";

interface Props {
  bookInfo: Book;
  onClick: () => void;
}

export const PreviewBook: FC<Props> = ({
  bookInfo: { author, cover, description, fullBook, name, rate, reviews },
  onClick,
}) => {
  return (
    <div className={styles.main} onClick={onClick}>
      {/* TO DO*/}
      <img src={tempCover} alt="" className={styles.cover} />
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <div className={styles.author}>{author}</div>
        <Rating value={rate} readOnly size="small" />
        <div>more stat</div>
        <div className={styles.description}>
          {getShortString(
            // TO DO
            "«Записки юного врача» — цикл рассказов М. А. Булгакова, опубликованных в 1925—1926 годах в журналах «Медицинский работник» и «Красная панорама»«Записки юного врача» — цикл рассказов М. А. Булгакова, опубликованных в 1925—1926 годах в журналах «Медицинский работник» и «Красная панорама»",
            100
          )}
        </div>
        <div className={styles.badgeContainer}>
          <Chip label="Книги" color="success" size="small" />
        </div>
        <div className={styles.addButton}>
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
