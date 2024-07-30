import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllQuizes = async () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/quizzes`, config);
};

export const getQuizById = async (id) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/quizzes/${id}`, config);
};

export const createQuiz = async (values) => {
  //   values.userId = JSON.parse(localStorage.getItem("user"))._id;
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/quizzes`,
    values,
    config
  );
};
export const deleteQuiz = async (course_id) => {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/quizzes/${course_id}`,
    config
  );
};
export const updateQuiz = async (id, updatedData) => {
  //   updatedData.userId = JSON.parse(localStorage.getItem("user"))._id;
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/quizzes/${id}`,
    updatedData,
    config
  );
};

// Quiz Apis
