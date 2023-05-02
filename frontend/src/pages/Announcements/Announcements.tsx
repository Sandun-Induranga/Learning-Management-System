import Header from "../../components/Header";
import Announcement from "../../components/Announcement/Announcement";
import api from "../../api";
import { useEffect, useState } from "react";

type StudentDetail = {
  _id: string;
  studentName: string;
  address: string;
  dob: Date;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchId: string;
  profilePhoto: string;
};

const Announcements = () => {
  const [studentList, setStudentList] = useState<StudentDetail[]>([]);

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    api
      .get("student")
      .then((res) => {
        setStudentList(res.data.responesData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        <Announcement />
        <Announcement />
        <Announcement />
        <div>
          {studentList.map((student) => (
            <h1>{student._id}</h1>
          ))}
        </div>
      </div>
    </>
  );
};

export default Announcements;
