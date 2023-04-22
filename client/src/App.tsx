import React, { useCallback } from "react";
import "./styles/primary-styles.scss";
import axios from "axios";

const App = () => {
  const sendCreateBook = useCallback(() => {
    axios.post("/api/book", {
      name: "test1",
      reviews: ["string1", "string2"],
    });
  }, []);

  const getBook = useCallback(() => {
    axios.get("/api/book/2").then((e) => console.log(e));
  }, []);
  return (
    <div className="App">
      <div>Book app web</div>
      <button onClick={sendCreateBook}>create book</button>
      <button onClick={getBook}>get book</button>
    </div>
  );
};

export default App;
