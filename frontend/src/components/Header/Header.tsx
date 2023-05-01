import { Avatar } from "@mui/material";
import logo from "../../assets/ijse.png";
import userImage from "../../assets/avatar.jpg";
import { NavLink } from "react-router-dom";
import { Menu } from "@mui/icons-material";

const Header = () => {
  return (
    <>
      <header className="w-full h-20 fixed px-10 sm:px-20 flex justify-between items-center shadow top-0">
        <img src={logo} className="w-20" alt="" />
        <nav className="sm:flex gap-10 text-gray-700 hidden">
          <NavLink to={"/announcement"}>Announcement</NavLink>
          <NavLink to={"/announcement"}>Class Works</NavLink>
          <NavLink to={"/announcement"}>Members</NavLink>
        </nav>
        <div className="hidden sm:inline-block">
          <Avatar className="border" src={userImage}></Avatar>
        </div>
        <div className="sm:hidden">
          <Menu className="!text-gray-700" />
        </div>
      </header>
    </>
  );
};

export default Header;
