import type { FC } from "react";
import { Book } from "../../../typing/book";
import Button from "@mui/material-next/Button";
import { Stack } from "@mui/system";
import tempCover from "./Clipboard01.jpg";
import styles from "./SwiperBooksContainer.module.scss";

interface Props {
  title: string;
  onClickShowAll: () => void;
  books: Book[];
}

export const SwiperBooksContainer: FC<Props> = ({
  books,
  onClickShowAll,
  title,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <Button size="small" variant="filled">
          Все
        </Button>
      </div>
      <div className={styles.swiper}>
        <Stack
          direction="row"
          spacing={2}
          overflow={(e) => {
            if (e.direction === "ltr") return "auto";
          }}
          padding={[1, 0]}
        >
          {books.map((book) => (
            <BookPreview
              bookName={book.name}
              coverSrc={book.cover}
              key={book.name}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

interface BookPreviewProps {
  bookName: string;
  coverSrc: string;
}

const BookPreview: FC<BookPreviewProps> = ({ bookName, coverSrc }) => {
  return (
    <div className={styles.bookPreview}>
      <img src={tempCover} alt="" className={styles.cover} />
      <div className={styles.bookName}>{bookName}</div>
    </div>
  );
};