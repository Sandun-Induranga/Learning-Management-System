import { Avatar } from "@mui/material";
import logo from "../../assets/ijse.png";
import userImage from "../../assets/avatar.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="w-full h-20 fixed px-20 flex justify-between items-center shadow top-0">
        <img src={logo} className="w-20" alt="" />
        <nav className="flex gap-10 text-gray-700">
          <NavLink to={"/announcement"}>Announcement</NavLink>
          <NavLink to={"/announcement"}>Class Works</NavLink>
          <NavLink to={"/announcement"}>Members</NavLink>
        </nav>
        <Avatar className="border" src={userImage}></Avatar>
      </header>
    </>
  );
};

export default Header;
