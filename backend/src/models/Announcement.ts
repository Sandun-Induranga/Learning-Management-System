import { Document, Schema, model } from "mongoose";

type Comment = {
  studentName: string;
  comment: string;
};

interface IAnnouncement extends Document {
  teacherName: string;
  description: string;
  comments: Comment;
}

const AnnouncementSchema = new Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const Announcement = model<IAnnouncement>(
  "Announcement",
  AnnouncementSchema
);
