import Header from "../../components/Header";
import api from "../../api";
import { useState } from "react";

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
    </>
  );
};

export default MembersPage;
