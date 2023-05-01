import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Announcements from "../../pages/Announcements";
import ClassWorks from "../../pages/ClassWorks/ClassWorks";

const Content = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/student" element={<Announcements />}></Route>
        <Route path="/student/class-work" element={<ClassWorks />}></Route>
      </Routes>
    </>
  );
};

export default Content;