import { useEffect, useState } from "react";
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

type StudentDetail = {};

const StudentPage = () => {
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<StudentDetail>();

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  useEffect(() => {
    getAllBatches();
  });

  const getAllBatches = () => {
    api
      .get("batch")
      .then((res) => {
        setStudentList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    // value={batchName}
                    // onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    label="Address"
                    fullWidth
                    color="primary"
                    name="address"
                    // value={batchName}
                    // onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    // label="Date Of Birth"
                    type="date"
                    fullWidth
                    color="primary"
                    name="batchName"
                    // value={batchName}
                    // onChange={handleInputChange}
                    // placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    color="primary"
                    name="batchName"
                    // value={batchName}
                    // onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    label="Contact"
                    type="text"
                    fullWidth
                    color="primary"
                    name="batchName"
                    // value={batchName}
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
                    // value={batchName}
                    // onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    color="primary"
                    name="batchName"
                    // value={batchName}
                    // onChange={handleInputChange}
                    placeholder="Enter Batch Name"
                    required
                  />
                  <Autocomplete
                    disablePortal
                    id="batch"
                    options={[1, 2, 3, 4, 5]}
                    fullWidth
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
          <table className="w-full">
            <thead>
              <tr>
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
              <Student />
              <Student />
              <Student />
            </tbody>
          </table>
        </main>
      </section>
    </>
  );
};

export default StudentPage;
