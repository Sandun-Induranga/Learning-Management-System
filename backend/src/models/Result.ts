import { Document, Schema, model } from "mongoose";

export interface IResult extends Document {
  studentId: string;
  classWorkId: string;
  mark: number;
  grade: string;
}

const ResultSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  classWorkId: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

export const Result = model("Result", ResultSchema);
