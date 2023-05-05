import { Send } from "@mui/icons-material";
import userImage from "../../assets/avatar.jpg";
import { Avatar } from "@mui/material";

type Comment = {
  studentName: string;
  comment: string;
};

type AnnouncementProps = {
  teacherName: string;
  description: string;
  createdAt: string;
  comments: Comment[];
};

const Announcement = (props: AnnouncementProps) => {
  return (
    <main className="md:w-1/2 border p-10 rounded-lg flex flex-col gap-6">
      <section className="flex gap-4">
        <Avatar className="border" src={userImage} />
        <div className="flex flex-col">
          <span className="text-gray-700">{props.teacherName}</span>
          <span className="text-xs text-gray-600">{props.createdAt}</span>
        </div>
      </section>
      <section className="text-gray-700">{props.description}</section>
      <section className="py-3 px-5 border rounded-lg flex justify-between">
        <input
          type="text"
          placeholder="Add a Comment"
          className="w-[92%] outline-none"
        />
        <Send className="text-sky-edited-500" />
      </section>
      {props.comments.map((comment) => (
        <section className="text-gray-700">
          <h1>{comment.studentName}</h1>
          <h1 className="text-sm ml-4">{comment.comment}</h1>
        </section>
      ))}
    </main>
  );
};

export default Announcement;
