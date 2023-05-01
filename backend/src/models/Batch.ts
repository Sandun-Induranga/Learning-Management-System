import { Document, Schema, model } from "mongoose";

export interface IBatch extends Document {
  batchName: string;
}

const BatchSchema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Batch = model<IBatch>("Batch", BatchSchema);
