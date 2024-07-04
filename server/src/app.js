import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


//routes import
import userRouter from "./routes/user.routes.js"
import courseRouter from "./routes/course.routes.js"
import quizRouter from "./routes/quiz.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/quizzes", quizRouter);

export { app };