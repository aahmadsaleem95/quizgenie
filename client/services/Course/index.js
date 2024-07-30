import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllCourses = async () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/courses`, config);
};

export const getCourseById = async (id) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${id}`, config);
};

export const createCourse = async (values) => {
  values.userId = JSON.parse(localStorage.getItem("user"))._id;
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/courses`,
    values,
    config
  );
};
export const deleteCourse = async (course_id) => {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/courses/${course_id}`,
    config
  );
};
export const updateCourse = async (id, updatedData) => {
  updatedData.userId = JSON.parse(localStorage.getItem("user"))._id;
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/courses/${id}`,
    updatedData,
    config
  );
};

// Course Apis
