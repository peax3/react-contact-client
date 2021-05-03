import axios from "axios";

const instance = axios.create({
  baseURL: "https://peax3contacts.herokuapp.com/api",
});

export const setAuthTOken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = token;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
