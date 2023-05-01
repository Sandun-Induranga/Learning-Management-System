import { Document, Schema, model } from "mongoose";

export interface ISubmission extends Document {
  file: string;
}

const SubmissionSchema = new Schema(
  {
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Submission = model<ISubmission>("Submission", SubmissionSchema);
