import { Document, Schema, model } from "mongoose";

export interface IClassWork extends Document {
  name: string;
  type: string;
  dueDate: Date;
  moduleName: string;
  description: string;
  file: string;
  batch: string;
}

const ClassWorkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    description: {
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
  },
  { timestamps: true }
);

export const ClassWork = model<IClassWork>("ClassWork", ClassWorkSchema);
