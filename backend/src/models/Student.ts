import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  nic: string;
  studentName: string;
  address: string;
  email: string;
  contact: string;
  batch: string;
  profilePhoto: string;
}

const StudentSchema = new Schema(
  {
    nic: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
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
    batchName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = model<IStudent>("Student", StudentSchema);
