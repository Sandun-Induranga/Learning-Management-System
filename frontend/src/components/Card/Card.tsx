import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";

type StudentProps = {
  profilePhoto: string;
  name: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Card = (props: StudentProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <aside
        className="flex flex-col items-center text-sm cursor-pointer"
        onClick={handleOpen}
      >
        <Avatar className="border" src={props.profilePhoto}></Avatar>
        <h1>{props.name}</h1>
      </aside>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </>
  );
};

export default Card;
