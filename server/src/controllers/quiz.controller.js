import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Quiz } from "../models/quiz.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createQuiz = asyncHandler(async (req, res) => {
  const { name, totalQuestion, marks, courseId } = req.body;

  if ([name, courseId].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  if (!Number.isInteger(totalQuestion) || totalQuestion <= 0) {
    throw new ApiError(400, "Total questions must be a positive integer");
  }

  if (!Number.isInteger(marks) || marks <= 0) {
    throw new ApiError(400, "Marks must be a positive integer");
  }

//   if (typeof questionsJson !== "object" || questionsJson === null) {
//     throw new ApiError(400, "questionsJson must be a valid JSON object");
//   }

  const existedQuiz = await Quiz.findOne({ name });
  if (existedQuiz) {
    throw new ApiError(409, "Quiz with this name already exists");
  }

  const quiz = await Quiz.create({
    name,
    totalQuestion,
    marks,
    courseId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { quiz }, "Quiz created successfully"));
});

const getQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate("courseId");
   let quiz1 = quiz.populated("courseId")
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  console.log("Populated Quiz: ", quiz);
  console.log("Populated Quiz11111111: ", quiz1);

  return res
    .status(200)
    .json(new ApiResponse(200, { quiz }, "Quiz retrieved successfully"));
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, totalQuestion, marks, questionsJson, courseId } = req.body;

  if (
    [name, totalQuestion, marks, questionsJson].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!Number.isInteger(totalQuestion) || totalQuestion <= 0) {
    throw new ApiError(400, "Total questions must be a positive integer");
  }

  if (!Number.isInteger(marks) || marks <= 0) {
    throw new ApiError(400, "Marks must be a positive integer");
  }

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    id,
    { name, totalQuestion, marks, questionsJson, courseId },
    { new: true, runValidators: true }
  );

  if (!updatedQuiz) {
    throw new ApiError(404, "Quiz not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { updatedQuiz }, "Quiz updated successfully"));
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedQuiz = await Quiz.findByIdAndDelete(id);

  if (!deletedQuiz) {
    throw new ApiError(404, "Quiz not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { deletedQuiz }, "Quiz deleted successfully"));
});

const listQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find().populate("courseId");

  return res
    .status(200)
    .json(new ApiResponse(200, { quizzes }, "Quizzes retrieved successfully"));
});

export { createQuiz, getQuiz, updateQuiz, deleteQuiz, listQuizzes };
