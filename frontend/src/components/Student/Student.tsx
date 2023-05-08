import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import api from "../../api";

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
  width: "80%",
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

  useEffect(() => {
    getAllBatches();
  }, []);

  const getAllBatches = () => {
    api
      .get("batch")
      .then((res) => {
        setBatchList(
          res.data.responseData.map((batch: any) => batch.batchName)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const editStudent = () => {
    handleOpen();
    setNic(props.nic);
    setStudentName(props.studentName);
    setAddress(props.address);
    setEmail(props.email);
    setContact(props.contact);
    setUsername(props.username);
    setPassword(props.password);
    setPassword(props.password);
    setBatchName(props.batchName);
  };

  const handleFileSelect = (event: any) => {
    setProfilePhoto(event.target.files[0]);
  };

  const updateStudent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    let newStudent = {
      nic: nic,
      studentName: studentName,
      address: address,
      email: email,
      contact: contact,
      username: username,
      password: password,
      batchName: batchName,
    };

    api
      .put(`student/${props._id}`, newStudent)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <tr className="h-12 cursor-pointer text-center" onClick={editStudent}>
        <td>{props.nic}</td>
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
          <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
            <form
              className="w-full grid sm:grid-cols-2 gap-5 justify-between items-center"
              // onSubmit={saveStudent}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  label="Student NIC"
                  fullWidth
                  color="primary"
                  name="nic"
                  value={nic}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />
                <TextField
                  label="Student Name"
                  fullWidth
                  color="primary"
                  name="studentName"
                  value={studentName}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />
                <TextField
                  label="Address"
                  fullWidth
                  color="primary"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  color="primary"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />
                <TextField
                  label="Contact"
                  type="text"
                  fullWidth
                  color="primary"
                  name="contact"
                  value={contact}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />
                <TextField
                  label="Username"
                  type="text"
                  fullWidth
                  color="primary"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  color="primary"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Enter Batch Name"
                  required
                />

                <Select
                  value={batchName}
                  name="batchName"
                  onChange={handleComboBox}
                >
                  {batchList.map((batch) => (
                    <MenuItem value={batch}>{batch}</MenuItem>
                  ))}
                </Select>
                <section className="w-40 h-40 border rounded-lg flex justify-center relative">
                  <input
                    className="opacity-0 cursor-pointer w-full h-full z-10"
                    type="file"
                    name="files"
                    id="file"
                    onChange={handleFileSelect}
                  />
                  <Add className="text-gray-200 !text-8xl absolute top-0 bottom-0 left-0 right-0 m-auto" />
                </section>
                <section>
                  <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    className="!mt-5"
                    onClick={updateStudent}
                  >
                    Update Student
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="!mt-5"
                  >
                    Delete Student
                  </Button>
                </section>
              </ThemeProvider>
            </form>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default Student;
