import { Avatar } from "@mui/material";
import logo from "../../assets/logo.png";
import userImage from "../../assets/avatar.jpg";
import { NavLink } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";
import { useState } from "react";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const openCloseMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <header className="w-full h-20 fixed px-10 sm:px-20 flex justify-between items-center shadow top-0 z-50 bg-white">
        <img src={logo} className="w-20" alt="" />
        <nav className="sm:flex gap-10 text-gray-700 hidden">
          <NavLink to={"/student"}>Announcement</NavLink>
          <NavLink to={"/student/class-work"}>Class Works</NavLink>
          <NavLink to={"/teacher/batch"}>Batches</NavLink>
          <NavLink to={"/student/members"}>Members</NavLink>
          <NavLink to={"/teacher/students"}>Students</NavLink>
        </nav>
        <div className="hidden sm:inline-block">
          <Avatar className="border" src={userImage}></Avatar>
        </div>
        <div className="sm:hidden">
          {!isOpen ? (
            <Menu className="!text-gray-700" onClick={openCloseMenu} />
          ) : (
            <>
              <Close className="!text-gray-700" onClick={openCloseMenu} />
              <nav className="w-3/4 flex flex-col gap-10 absolute top-24 right-0 justify-center items-center bg-sky-edited-500 rounded-lg text-white p-10">
                <NavLink to={"/announcement"}>Announcement</NavLink>
                <NavLink to={"/classWork"}>Class Works</NavLink>
                <NavLink to={"/announcement"}>Members</NavLink>
                <NavLink to={"/teacher/batch"}>Batches</NavLink>
                <NavLink to={"/teacher/students"}>Students</NavLink>
                <Avatar className="border" src={userImage}></Avatar>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
