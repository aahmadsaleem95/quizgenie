import { Router } from "express";
import {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  listCourses,
} from "../controllers/course.controller.js";

const router = Router();

router
  .route("/")
  .post(createCourse) 
  .get(listCourses); 

router
  .route("/:id")
  .get(getCourse) 
  .put(updateCourse) 
  .delete(deleteCourse); 

export default router;
