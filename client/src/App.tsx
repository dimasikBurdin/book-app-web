import React, { useCallback, useState } from "react";
import "./styles/primary-styles.scss";
import axios from "axios";

export enum BookTypes {
  READ_NOW = "read_now",
  WANT_READ = "want_read",
  FINISHED = "finished",
}

const App = () => {
  const [lastUserId, setLastUserId] = useState<number | null>(null);
  const sendCreateBook = useCallback(() => {
    axios.post("/api/book", {
      name: "test1",
      reviews: ["string1", "string2"],
    });
  }, []);

  const getBook = useCallback(() => {
    axios.get("/api/book/2").then((e) => console.log(e));
  }, []);

  const createUser = useCallback(async () => {
    const { data } = await axios.post("/api/user", {
      name: "aoaoao",
      email: "aoaoa@mail.ru",
      password: "sdfJK@($84+f",
    });
    setLastUserId(data.id);
    await axios.post("/api/my-books", {
      userId: data.id,
    });
  }, []);

  const getMyBooks = useCallback(() => {
    if (lastUserId) {
      axios.get(`/api/my-books/${lastUserId}`);
    }
  }, [lastUserId]);

  const addBookToMyBooks = useCallback(() => {
    axios.post("/api/my-books/add-book", {
      userId: 37,
      bookId: 1,
      type: null,
    });
  }, []);

  const getMyBook = useCallback(() => {
    axios.get("/api/my-books/28/1");
  }, []);

  const addBookToMyBooksByType = useCallback(
    (type: BookTypes) => {
      if (lastUserId) {
        axios.post("/api/my-books/add-book", {
          userId: lastUserId,
          bookId: 1,
          type: type,
        });
      }
    },
    [lastUserId]
  );

  const getMyBookByType = useCallback(
    (type?: BookTypes) => {
      if (lastUserId) {
        axios.post("/api/my-books/get-books-by-type", {
          userId: lastUserId,
          type,
        });
      }
    },
    [lastUserId]
  );

  return (
    <div className="App">
      <div>Book app web</div>
      <button onClick={createUser}>create user</button>
      <button onClick={sendCreateBook}>create book</button>
      <button onClick={getBook}>get book</button>
      <button onClick={getMyBooks}>
        get my-books from last user {"<"}
        {lastUserId}
        {">"}
      </button>
      <button onClick={addBookToMyBooks}>add book to my books</button>
      <button onClick={getMyBook}>get my book</button>
      <div>
        <div>
          <button onClick={() => addBookToMyBooksByType(BookTypes.READ_NOW)}>
            add reading my book
          </button>
          <button onClick={() => addBookToMyBooksByType(BookTypes.FINISHED)}>
            add finished my book
          </button>
          <button onClick={() => addBookToMyBooksByType(BookTypes.WANT_READ)}>
            add want_read my book
          </button>
        </div>
        <div>
          <button onClick={() => getMyBookByType(BookTypes.READ_NOW)}>
            get reading my book
          </button>
          <button onClick={() => getMyBookByType(BookTypes.FINISHED)}>
            get finished my book
          </button>
          <button onClick={() => getMyBookByType(BookTypes.WANT_READ)}>
            get want_read my book
          </button>
          <button onClick={() => getMyBookByType()}>get all my book</button>
        </div>
      </div>
    </div>
  );
};

export default App;
