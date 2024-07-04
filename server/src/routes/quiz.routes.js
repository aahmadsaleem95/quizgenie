import { Router } from "express";
import {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  listQuizzes,
} from "../controllers/quiz.controller.js";

const router = Router();

router.route("/").post(createQuiz).get(listQuizzes);
router.route("/:id").get(getQuiz).put(updateQuiz).delete(deleteQuiz);

export default router;
