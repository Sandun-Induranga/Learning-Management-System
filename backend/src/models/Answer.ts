import { Document, Schema, model } from "mongoose";

export interface IAnswer extends Document {
  studentNic: string;
  studentName: string;
  submissionStatus: string;
  file: string;
  batch: string;
}

const AnswerSchema = new Schema(
  {
    studentNic: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    submissionStatus: {
      type: Date,
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
  },
  { timestamps: true }
);

export const Answer = model<IAnswer>("Answer", AnswerSchema);
