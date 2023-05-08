import Header from "../../components/Header";
import Announcement from "../../components/Announcement/Announcement";
import api from "../../api";
import { useEffect, useState } from "react";
import StudentService from "../../services/StudentService";

type Comment = {
  studentName: string;
  comment: string;
};

type AnnouncementDetail = {
  teacherName: string;
  description: string;
  createdAt: string;
  comments: Comment[];
};

const Announcements = () => {
  const [announcementList, setAnnouncementList] = useState<
    AnnouncementDetail[]
  >([]);

  useEffect(() => {
    getAllAnnouncements();
  });

  const getAllAnnouncements = () => {
    let student;
    if (localStorage.getItem("currentUsername") == "Student") {
      student = new StudentService().getStudentByUsername();
    }

    api
      .get(`announcement${student?.batchName}`)
      .then((res) => {
        setAnnouncementList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        {announcementList.map((announcement) => (
          <Announcement
            teacherName={announcement.teacherName}
            description={announcement.description}
            comments={announcement.comments}
            createdAt={announcement.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default Announcements;
