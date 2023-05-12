import { Avatar } from "@mui/material";

const Card = () => {
  return (
    <>
      <aside className="text-lg">
        <Avatar className="border" src={student.profilePhoto}></Avatar>
        <h1>{student.studentName}</h1>
      </aside>
    </>
  );
};

export default Card;
