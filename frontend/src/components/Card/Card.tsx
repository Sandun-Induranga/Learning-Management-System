import { Avatar } from "@mui/material";

type StudentProps = {
  profilePhoto: string;
  name: string;
};

const Card = (props: StudentProps) => {
  return (
    <>
      <aside className="flex flex-col items-center text-sm">
        <Avatar className="border" src={props.profilePhoto}></Avatar>
        <h1>{props.name}</h1>
      </aside>
    </>
  );
};

export default Card;
