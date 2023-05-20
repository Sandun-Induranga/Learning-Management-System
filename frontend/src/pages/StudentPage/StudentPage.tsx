import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Student from "../../components/Student/Student";
import { Add, AddCircle, DoDisturbOn } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  createTheme,
} from "@mui/material";
import api from "../../api";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

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

const StudentPage = () => {
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<StudentDetail[]>([]);
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

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  useEffect(() => {
    getAllStudents();
    getAllBatches();
  }, []);

  const getAllStudents = () => {
    api
      .get("student")
      .then((res) => {
        setStudentList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        if (/^[A-z ]{4,20}$/.test(value)) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }
        setNic(value);
        break;
      case "studentName":
        if (/^[A-z ]{4,20}$/.test(value)) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }
        setStudentName(value);

        break;
      case "address":
        setAddress(value);
        if (/^[A-z ]{4,20}$/.test(value)) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }
        break;
      case "email":
        setEmail(value);
        if (
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
            value
          )
        ) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }

        break;
      case "contact":
        setContact(value);
        if (/^[0-9]{10}$/.test(value)) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }
        break;
      case "username":
        setUsername(value);
        if (/^[A-z ]{4,20}$/.test(value)) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }
        break;
      case "password":
        setPassword(value);
        if (/^[A-z ]{4,20}$/.test(value)) {
          document.getElementById(name)?.classList.remove("!text-red-700");
          document.getElementById(name)?.classList.add("!text-gray-700");
        } else {
          document.getElementById(name)?.classList.add("!text-red-700");
          document.getElementById(name)?.classList.remove("!text-gray-700");
        }
        break;

      default:
        break;
    }
  };

  const handleComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setBatchName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      profilePhoto: " ",
    };

    api
      .post("student", newStudent)
      .then((res) => {
        let id = res.data.responseData._id;

        let formData = new FormData();
        formData.append("files", profilePhoto);
        api
          .put(`student/image/${id}`, formData)
          .then((res) => {
            getAllStudents();
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileSelect = (event: any) => {
    setProfilePhoto(event.target.files[0]);
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10">
        {!isClickedAddButton ? (
          <>
            <section
              className="w-full h-12 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center cursor-pointer px-20"
              onClick={bindAddAndDiscartEvent}
            >
              <p>Add New Student</p>
              <span>
                <AddCircle />
              </span>
            </section>
            <section
              className="w-full h-32 border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 cursor-pointer"
              onClick={bindAddAndDiscartEvent}
            >
              <AddCircle />
              Add New Student
            </section>
          </>
        ) : (
          <>
            <section
              className="w-full h-12 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center cursor-pointer px-20"
              onClick={bindAddAndDiscartEvent}
            >
              <p>Discart Student</p>
              <span>
                <DoDisturbOn />
              </span>
            </section>
            <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
              <form
                className="w-full grid sm:grid-cols-2 gap-5 justify-between items-center"
                onSubmit={handleSubmit}
              >
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Student NIC"
                    fullWidth
                    color="primary"
                    name="nic"
                    id="nic"
                    value={nic}
                    onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    className=""
                    required
                  />
                  <TextField
                    label="Student Name"
                    fullWidth
                    color="primary"
                    name="studentName"
                    id="studentName"
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
                    id="address"
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
                    id="email"
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
                    id="contact"
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
                    id="username"
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
                    id="password"
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="!mt-5"
                  >
                    Save Student
                  </Button>
                </ThemeProvider>
              </form>
            </section>
          </>
        )}

        <main className="mt-10">
          <table className="w-full border p-5">
            <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 h-12 text-white">
              <tr className="">
                <th>Student NIC</th>
                <th>Student Name</th>
                <th>Student Address</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Username</th>
                <th>Batch</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody className="mt-12 overflow-auto">
              {studentList.map((student) => (
                <Student
                  _id={student._id}
                  nic={student.nic}
                  studentName={student.studentName}
                  address={student.address}
                  contact={student.contact}
                  email={student.email}
                  username={student.username}
                  password={student.password}
                  profilePhoto={student.profilePhoto}
                  batchName={student.batchName}
                  updateStudentList={getAllStudents}
                />
              ))}
            </tbody>
          </table>
        </main>
      </section>
    </>
  );
};

export default StudentPage;
