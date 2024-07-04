import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    totalQuestion: {
      type: Number,
      required: true,
      trim: true,
    },
    marks: {
      type: Number,
      required: true,
      trim: true,
    },
    // questionsJson: {
    //   type: Object,
    //   required: true,
    //   trim: true,
    // },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
