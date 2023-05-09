import { Send } from "@mui/icons-material";
import userImage from "../../assets/avatar.jpg";
import { Avatar } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Comment = {
  studentName: string;
  comment: string;
};

type AnnouncementProps = {
  teacherName: string;
  description: string;
  createdAt: string;
  comments: Comment[];
  batch: string;
};

const Announcement = (props: AnnouncementProps) => {
  const [comment, setComment] = useState<string>("");
  const addComment = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let newCommentList = props.comments;
    newCommentList.push({ studentName: "", comment: comment });
    let newAnnouncement = {
      teacherName: props.teacherName,
      description: props.description,
      batch: props.batch,
      comments: [],
    };

    api
      .post("announcement", newAnnouncement)
      .then((res) => {
        console.log(res);
        getAllAnnouncements();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "batchName") {
      setComment(value);
    }
  };

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
          value={comment}
          onChange={handleInputChange}
        />
        <button onClick={addComment}>
          <Send className="text-sky-edited-500" />
        </button>
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
