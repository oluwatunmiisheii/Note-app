import axios from "axios";

// This would be kept in a .env file in a real project
const baseURL = "https://notes-api-2cb35-default-rtdb.firebaseio.com/";

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
