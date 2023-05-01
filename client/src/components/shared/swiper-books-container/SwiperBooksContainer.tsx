import type { FC } from "react";
import { Book } from "../../../typing/book";
// import Button from "@mui/material-next/Button";
import { Stack } from "@mui/system";
import tempCover from "./Clipboard01.jpg";
import { Button, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./SwiperBooksContainer.module.scss";

interface Props {
  title: string;
  onClickShowAll: () => void;
  books: Book[];
  onClickBook: (bookId: number) => void;
}

export const SwiperBooksContainer: FC<Props> = ({
  books,
  onClickShowAll,
  title,
  onClickBook,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={onClickShowAll}
        >
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
              onClick={() => onClickBook(book.id)}
            />
          ))}
          <MoreCover onClick={onClickShowAll} />
        </Stack>
      </div>
    </div>
  );
};

interface BookPreviewProps {
  bookName: string;
  coverSrc: string;
  onClick: () => void;
  isMoreBook?: boolean;
}

const BookPreview: FC<BookPreviewProps> = ({ bookName, coverSrc, onClick }) => {
  return (
    <div className={styles.bookPreview} onClick={onClick}>
      <img src={tempCover} alt="" className={styles.cover} />
      <div className={styles.bookName}>{bookName}</div>
    </div>
  );
};

interface MoreCoverProps {
  onClick: () => void;
}

const MoreCover: FC<MoreCoverProps> = ({ onClick }) => {
  return (
    <div className={styles.moreCover}>
      <IconButton onClick={onClick}>
        <MoreHorizIcon />
      </IconButton>
    </div>
  );
};
