import { Document, Schema, model } from "mongoose";

export interface ICourse extends Document {
  courseName: string;
}

const CourseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = model("Course", CourseSchema);
