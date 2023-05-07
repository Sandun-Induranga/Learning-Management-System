import {
  Box,
  Button,
  Modal,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type StudentDetail = {
  _id: string;
  nic: string;
  studentName: string;
  address: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchName: string;
  profilePhoto: string;
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

const Student = (props: StudentDetail) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nic, setNic] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [batchName, setBatchName] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<any>(" ");
  const [batchList, setBatchList] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);

    switch (name) {
      case "nic":
        setNic(value);
        break;
      case "studentName":
        setStudentName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const handleComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setBatchName(event.target.value);
  };

  return (
    <>
      <tr className="h-12 cursor-pointer text-center" onClick={handleOpen}>
        <td>{props._id}</td>
        <td>{props.studentName}</td>
        <td>{props.address}</td>
        <td>{props.email}</td>
        <td>{props.contact}</td>
        <td>{props.username}</td>
        <td>{props.batchName}</td>
      </tr>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="w-ful">
            <ThemeProvider theme={theme}>
              <TextField
                label="Batch Name"
                fullWidth
                color="primary"
                name="batchName"
                value={props.nic}
                onChange={handleInputChange}
                placeholder="Enter Batch Name"
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!mt-5"
              >
                Update Batch
              </Button>
            </ThemeProvider>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Student;
