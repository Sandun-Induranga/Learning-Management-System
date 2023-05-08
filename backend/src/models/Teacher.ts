import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  nic: string;
  teacherName: string;
  address: string;
  email: string;
  contact: string;
  profilePhoto: string;
  username: string;
}

const TeacherSchema = new Schema(
  {
    nic: {
      type: String,
      required: true,
    },
    teacherName: {
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
    profilePhoto: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Teacher = model<IStudent>("Teacher", TeacherSchema);
