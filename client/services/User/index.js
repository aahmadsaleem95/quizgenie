import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const loginUser = (values) => {
  console.log("Path: ", process.env.REACT_APP_BASE_URL);
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/login`,
    values,
    config
  );
};
