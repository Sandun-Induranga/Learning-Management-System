import { Avatar } from "@mui/material";

type StudentProps = {
  profilePhoto: string;
  name: string;
};

const Card = (props: StudentProps) => {
  return (
    <>
      <aside className="text-lg">
        <Avatar className="border" src={props.profilePhoto}></Avatar>
        <h1>{props.name}</h1>
      </aside>
    </>
  );
};

export default Card;
