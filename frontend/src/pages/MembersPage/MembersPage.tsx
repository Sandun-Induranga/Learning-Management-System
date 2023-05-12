import Header from "../../components/Header";
import api from "../../api";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

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
        <h1 className="text-sky-edited-500 text-lg p-4">Teachers</h1>
        <aside className="grid grid-cols-6">
          {teacherList.map((teacher) => (
            <Card
              profilePhoto={teacher.profilePhoto}
              name={teacher.teacherName}
            />
          ))}
        </aside>
      </section>

      <section className="mt-10 p-10 shadow-lg mx-10 rounded-lg">
        <h1 className="text-sky-edited-500 text-lg p-4">Students</h1>
        <aside className="grid grid-cols-6">
          {studentList.map((student) => (
            <Card
              profilePhoto={student.profilePhoto}
              name={student.studentName}
            />
          ))}
        </aside>
      </section>
    </>
  );
};

export default MembersPage;
