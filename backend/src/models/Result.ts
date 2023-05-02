import { Schema } from "mongoose";

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
