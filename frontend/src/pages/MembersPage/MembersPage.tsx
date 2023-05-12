import Header from "../../components/Header";
import api from "../../api";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

type StudentDetail = {
  _id: string;
  nic: string;
  studentName: string;
  address: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchName: string;
  profilePhoto: string;
  updateStudentList: () => void;
};

const MembersPage = () => {
  const [studentList, setStudentList] = useState<StudentDetail[]>([]);

  useEffect(() => {
    loadAllStudents();
  }, []);

  const loadAllStudents = () => {
    api.get(`student/${localStorage.getItem("currentBatch")}`).then((res) => {
      setStudentList(res.data.responseData);
    });
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10">
        <h1 className="text-sky-edited-500 text-xl shadow-lg rounded-lg p-4">
          Teachers
        </h1>
      </section>

      <section className="p-10 shadow-lg mx-10 rounded-lg">
        <h1 className="text-sky-edited-500 text-xl p-4">Students</h1>
        <aside className="grid grid-cols-4">
          {studentList.map((student) => (
            <aside className="text-lg">
              <Avatar className="border" src={student.profilePhoto}></Avatar>
              <h1>{student.studentName}</h1>
            </aside>
          ))}
        </aside>
      </section>
    </>
  );
};

export default MembersPage;
