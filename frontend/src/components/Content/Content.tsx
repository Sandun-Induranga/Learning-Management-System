import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Announcements from "../../pages/Announcements";
import ClassWorks from "../../pages/ClassWorks/ClassWorks";
import BatchPage from "../../pages/BatchPage/BatchPage";
import StudentPage from "../../pages/StudentPage/StudentPage";

const Content = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/student" element={<Announcements />}></Route>
        <Route path="/student/class-work" element={<ClassWorks />}></Route>

        <Route path="/teacher/batch" element={<BatchPage />}></Route>
        <Route path="/teacher/students" element={<StudentPage />}></Route>
      </Routes>
    </>
  );
};

export default Content;
