import React, { useCallback, useState } from "react";
import "./styles/primary-styles.scss";
import axios from "axios";

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
    </div>
  );
};

export default App;
