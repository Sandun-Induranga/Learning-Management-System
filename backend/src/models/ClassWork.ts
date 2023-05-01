import { Document, Schema, model } from "mongoose";

type Answer = {
  studentId: string;
  file: string[];
};

export interface IClassWork extends Document {
  type: string;
  dueDate: Date;
  submissionStatus: string;
  files: string[];
  courseId: string;
  moduleId: string;
  answer: Answer[];
}

const ClassWorkSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    submissionStatus: {
      type: String,
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
    },
    answer: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const ClassWork = model<IClassWork>("ClassWork", ClassWorkSchema);
