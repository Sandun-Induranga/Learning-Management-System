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

type TeacherDetail = {
  nic: string;
  teacherName: string;
  address: string;
  email: string;
  contact: string;
  profilePhoto: string;
  username: string;
};

const MembersPage = () => {
  const [studentList, setStudentList] = useState<StudentDetail[]>([]);
  const [teacherList, setTeacherList] = useState<TeacherDetail[]>([]);

  useEffect(() => {
    loadAllStudents();
    loadAllTeachers();
  }, []);

  const loadAllStudents = () => {
    api
      .get(`student/${localStorage.getItem("currentBatch")}`)
      .then((res) => {
        setStudentList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadAllTeachers = () => {
    api
      .get(`teacher`)
      .then((res) => {
        setTeacherList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10 shadow-lg mx-10 rounded-lg">
        <h1 className="text-sky-edited-500 text-xl p-4">Teachers</h1>
        <aside className="grid grid-cols-4">
          {teacherList.map((teacher) => (
            <aside className="text-lg">
              <Avatar className="border" src={teacher.profilePhoto}></Avatar>
              <h1>{teacher.teacherName}</h1>
            </aside>
          ))}
        </aside>
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
