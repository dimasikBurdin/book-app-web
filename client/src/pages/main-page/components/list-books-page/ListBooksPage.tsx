import type { FC } from "react";
import { ContentContainer } from "../../../../components/shared/content-container";
import { HeaderContainer } from "../../../../components/shared/header-container";
import { MobileHeader } from "../../../../components/shared/mobile-header";
import { PreviewBook } from "../../../../components/shared/preview-book";
import { Book } from "../../../../typing/book";
import styles from "./ListBooksPage.module.scss";

interface Props {
  title: "Бестселлеры" | "Рекомендации дня";
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
      </ContentContainer>
    </div>
  );
};
