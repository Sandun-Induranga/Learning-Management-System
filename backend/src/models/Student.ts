import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  studentName: string;
  address: string;
  dob: Date;
  email: string;
  contact: string;
  username: string;
  password: string;
}

const StudentSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = model<IStudent>("Student", StudentSchema);
