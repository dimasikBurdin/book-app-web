import type { FC } from "react";
import { ContentContainer } from "../content-container";
import { HeaderContainer } from "../header-container";
import { MobileHeader } from "../mobile-header";
import { PreviewBook } from "../preview-book";
import { Book } from "../../../typing/book";
import styles from "./ListBooksPage.module.scss";

interface Props {
  title: string;
  books: Book[];
  onClickBack: () => void;
  onClickBook: (bookId: number) => void;
}

export const ListBooksPage: FC<Props> = ({
  title,
  onClickBack,
  books,
  onClickBook,
}) => {
  return (
    <div className={styles.main}>
      <HeaderContainer>
        <MobileHeader title={title} onClickBack={onClickBack} />
      </HeaderContainer>
      <ContentContainer>
        {books.map((book) => (
          <PreviewBook
            key={book.id + book.name}
            bookInfo={book}
            onClick={() => onClickBook(book.id)}
          />
        ))}
        {books.length === 0 && <div>Ой, сейчас тут пусто</div>}
      </ContentContainer>
    </div>
  );
};
