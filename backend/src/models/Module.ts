import { Document, Schema, model } from "mongoose";

export interface IModule extends Document {
  batchName: string;
  moduleName: string;
}

const ModuleSchema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
    },
    moduleName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Module = model<IModule>("Module", ModuleSchema);
