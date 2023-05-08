import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Announcements from "../../pages/Announcements";
import ClassWorks from "../../pages/ClassWorks/ClassWorks";
import BatchPage from "../../pages/BatchPage/BatchPage";
import StudentPage from "../../pages/StudentPage/StudentPage";

type ContentProps = {
  username: string;
  role: string;
  updateBatchList: (username: string, role: string) => void;
};

const Content = (props: ContentProps) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login username={props.username} role={props.role} />}
        ></Route>
        <Route
          path="/student"
          element={
            <Announcements username={props.username} role={props.role} />
          }
        ></Route>
        <Route
          path="/student/class-work"
          element={<ClassWorks username={props.username} role={props.role} />}
        ></Route>

        <Route path="/teacher/batch" element={<BatchPage />}></Route>
        <Route path="/teacher/students" element={<StudentPage />}></Route>
      </Routes>
    </>
  );
};

export default Content;
