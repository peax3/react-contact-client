import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://peax3contacts.herokuapp.com/api",
  baseURL: "http://localhost:7000/api",
});

export const setAuthTokenInHeaders = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const deleteAuthTokenFromHeaders = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
