import { Document, Schema, model } from "mongoose";

export interface IClassWork extends Document {
  type: string;
  dueDate: Date;
  submissionStatus: string;
  courseId: string;
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
    courseId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ClassWork = model("ClassWork", ClassWorkSchema);
