import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:3001";
}

export { axios };
