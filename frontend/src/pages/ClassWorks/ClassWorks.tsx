import { useEffect, useState } from "react";
import ClassWork from "../../components/ClassWork/ClassWork";
import Header from "../../components/Header";
import api from "../../api";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  createTheme,
} from "@mui/material";

type ClassWorkDetail = {
  _id: string;
  name: string;
  type: string;
  dueDate: Date;
  moduleName: string;
  file: string;
  batch: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

const ClassWorks = () => {
  const [classWorkList, setClassWorkList] = useState<ClassWorkDetail[]>([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(true);

  useEffect(() => {
    getAllClassWorks();
  }, []);

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  const getAllClassWorks = () => {
    api
      .get("classwork")
      .then((res) => {
        setClassWorkList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        {localStorage.getItem("currentRole") == "Teacher" ? (
          <>
            {!isClickedAddButton ? (
              <>
                <section
                  className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
                  onClick={bindAddAndDiscartEvent}
                >
                  <p>Add New Class Work</p>
                  <span>
                    <AddCircle />
                  </span>
                </section>
                <section
                  className="w-full h-32 border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 cursor-pointer"
                  onClick={bindAddAndDiscartEvent}
                >
                  <AddCircle />
                  Add New Class Work
                </section>
              </>
            ) : (
              <>
                <section
                  className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
                  onClick={bindAddAndDiscartEvent}
                >
                  <p>Discart Class Work</p>
                  <span>
                    <DoDisturbOn />
                  </span>
                </section>
                <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
                  <form className="w-ful flex flex-col gap-4">
                    <ThemeProvider theme={theme}>
                      <TextField
                        label="Name"
                        fullWidth
                        color="primary"
                        name="batchName"
                        // value={description}
                        // onChange={handleInputChange}
                        placeholder="Enter Class Work Name"
                        required
                      />
                      <Select fullWidth>
                        <MenuItem selected value={"Assignment"}>
                          Assignment
                        </MenuItem>
                        <MenuItem value={"Project"}>Project</MenuItem>
                        <MenuItem value={"Quize"}>Quize</MenuItem>
                      </Select>
                      <TextField
                        label="Due Date"
                        fullWidth
                        color="primary"
                        name="batchName"
                        // value={description}
                        // onChange={handleInputChange}
                        placeholder="Enter Class Work Name"
                        type="date"
                        required
                      />
                      <Select fullWidth>
                        <MenuItem selected value={"Assignment"}>
                          Assignment
                        </MenuItem>
                        <MenuItem value={"Project"}>Project</MenuItem>
                        <MenuItem value={"Quize"}>Quize</MenuItem>
                      </Select>
                      <TextField
                        label="Description"
                        fullWidth
                        color="primary"
                        name="batchName"
                        multiline
                        rows={4}
                        // value={description}
                        // onChange={handleInputChange}
                        placeholder="Enter Batch Name"
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="!mt-5"
                      >
                        Save Class Work
                      </Button>
                    </ThemeProvider>
                  </form>
                </section>
              </>
            )}
          </>
        ) : (
          <></>
        )}
        {classWorkList.map((classWork) => (
          <ClassWork
            _id=""
            name=""
            description=""
            dueDate={new Date()}
            batch=""
            moduleName=""
            type=""
            file=""
          />
        ))}
      </div>
    </>
  );
};

export default ClassWorks;
