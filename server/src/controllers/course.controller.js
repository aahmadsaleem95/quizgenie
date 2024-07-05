import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Course } from "../models/course.model.js";
import { Quiz } from "../models/quiz.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCourse = asyncHandler(async (req, res) => {
  const { name, code, creditHours, userId } = req.body;

  if ([name, code, userId].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!Number.isInteger(creditHours) || creditHours <= 0) {
    throw new ApiError(400, "Credit hours must be a positive integer");
  }
  const existedCourse = await Course.findOne({ $or: [{ name }, { code }] });
  if (existedCourse) {
    throw new ApiError(409, "Course with this name or code already exists");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const course = await Course.create({ name, code, creditHours, userId });

  return res
    .status(201)
    .json(new ApiResponse(201, { course }, "Course created successfully"));
});

const getCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).populate("userId", "-password");

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { course }, "Course retrieved successfully"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, code, creditHours, userId } = req.body;

  if ([name, code, userId].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!Number.isInteger(creditHours) || creditHours <= 0) {
    throw new ApiError(400, "Credit hours must be a positive integer");
  }
  
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { name, code, creditHours, userId },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    throw new ApiError(404, "Course not found");
  }
  

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedCourse }, "Course updated successfully")
    );
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Quiz.deleteMany({ courseId: id });
  const deletedCourse = await Course.findByIdAndDelete(id);

  if (!deletedCourse) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Course deleted successfully")
    );
});

const listCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate("userId", "-password");

  return res
    .status(200)
    .json(new ApiResponse(200, { courses }, "Courses retrieved successfully"));
});

export { createCourse, getCourse, updateCourse, deleteCourse, listCourses };
