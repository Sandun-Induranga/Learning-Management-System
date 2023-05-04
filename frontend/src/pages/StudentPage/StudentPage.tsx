import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Student from "../../components/Student/Student";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import { Autocomplete, Button, TextField, createTheme } from "@mui/material";
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
  studentName: string;
  address: string;
  dob: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchId: string;
  profilePhoto: string;
};

const StudentPage = () => {
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<StudentDetail[]>([]);
  const [studentName, setStudentName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [batch, setbatch] = useState<string>("");

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  useEffect(() => {
    getAllBatches();
  });

  const getAllBatches = () => {
    api
      .get("student")
      .then((res) => {
        setStudentList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "studentName") {
      setStudentName(value);
    }
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10">
        {!isClickedAddButton ? (
          <>
            <section
              className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
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
              className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
              onClick={bindAddAndDiscartEvent}
            >
              <p>Discart Student</p>
              <span>
                <DoDisturbOn />
              </span>
            </section>
            <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
              <form className="w-ful space-y-5">
                <ThemeProvider theme={theme}>
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
                    // label="Date Of Birth"
                    type="date"
                    fullWidth
                    color="primary"
                    name="batchName"
                    value={date}
                    onChange={handleInputChange}
                    // placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    color="primary"
                    name="batchName"
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
                    name="batchName"
                    value={contact}
                    // onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    color="primary"
                    name="batchName"
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
                    name="batchName"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <Autocomplete
                    disablePortal
                    id="batch"
                    options={["1", "2", "3", "4", "5"]}
                    fullWidth
                    value={batch}
                    renderInput={(params) => (
                      <TextField {...params} label="Batch" />
                    )}
                  />
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
            <thead className="bg-sky-edited-500 h-12 text-white">
              <tr className="">
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Student Adress</th>
                <th>Date Of Birth</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Username</th>
                <th>Batch</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
                <Student
                  _id={student._id}
                  studentName={student.studentName}
                  address={student.address}
                  contact={student.contact}
                  dob={student.dob}
                  email={student.email}
                  username={student.username}
                  password={student.password}
                  profilePhoto={student.profilePhoto}
                  batchId={student.batchId}
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
