import { Send } from "@mui/icons-material";
import userImage from "../../assets/avatar.jpg";
import { Avatar } from "@mui/material";
import { ChangeEvent, useState } from "react";
import api from "../../api";
import Swal from "sweetalert2";

type Comment = {
  studentName: string | null;
  comment: string;
};

type AnnouncementProps = {
  teacherName: string;
  description: string;
  createdAt: string;
  comments: Comment[];
  batch: string;
  updateAnnouncementList: () => void;
};

const Announcement = (props: AnnouncementProps) => {
  const [comment, setComment] = useState<string>("");
  const addComment = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let newCommentList = props.comments;
    newCommentList.push({
      studentName: localStorage.getItem("currentStudent"),
      comment: comment,
    });
    let newAnnouncement = {
      teacherName: props.teacherName,
      description: props.description,
      batch: props.batch,
      comments: newCommentList,
    };

    api
      .put(`announcement/${props.description}`, newAnnouncement)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Updated..!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setComment(value);
    if (/^[A-z 0-9]{3,20}$/.test(value)) {
      document.getElementById(name)?.classList.remove("!text-red-700");
      document.getElementById(name)?.classList.add("!text-gray-700");
    } else {
      document.getElementById(name)?.classList.add("!text-red-700");
      document.getElementById(name)?.classList.remove("!text-gray-700");
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
          name="comment"
          value={comment}
          onChange={handleInputChange}
          id="comment"
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
