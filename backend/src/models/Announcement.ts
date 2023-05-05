import { Document, Schema, model } from "mongoose";

type Comment = {
  studentName: string;
  comment: string;
};

interface IAnnouncement extends Document {
  description: string;
  comments: Comment;
}

const AnnouncementSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
});

export const Announcement = model<IAnnouncement>(
  "Announcement",
  AnnouncementSchema
);
