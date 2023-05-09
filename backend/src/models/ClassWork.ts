import { Document, Schema, model } from "mongoose";

type Answer = {
  studentNic: string;
  studentName: string;
  submissionStatus: string;
  file: string;
};

export interface IClassWork extends Document {
  type: string;
  dueDate: Date;
  moduleName: string;
  file: string;
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
    moduleName: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ClassWork = model<IClassWork>("ClassWork", ClassWorkSchema);
