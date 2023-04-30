import { Avatar } from "@mui/material";
import logo from "../../assets/ijse.png";
import userImage from "../../assets/avatar.jpg";

const Header = () => {
  return (
    <>
      <header className="w-full h-20 bg-blue-600 fixed px-20 flex justify-between items-center">
        <img src={logo} className="w-20" alt="" />
        <Avatar src={userImage}></Avatar>
      </header>
    </>
  );
};

export default Header;
