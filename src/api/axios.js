import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://peax3contacts.herokuapp.com/api",
});

export const setAuthTokenInHeaders = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const deleteAuthTokenFromHeaders = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
