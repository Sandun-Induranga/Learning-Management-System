import { Document, Schema, model } from "mongoose";

export interface IAnswer extends Document {
  studentUsername: string;
  studentName: string;
  submissionStatus: string;
  file: string;
  batch: string;
  classWorkId: string;
}

const AnswerSchema = new Schema(
  {
    studentUsername: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    submissionStatus: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    classWorkId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Answer = model<IAnswer>("Answer", AnswerSchema);
