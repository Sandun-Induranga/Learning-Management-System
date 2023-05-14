import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import api from "../../api";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

type ModuleDetail = {
  _id: string;
  batchName: string | null;
  moduleName: string;
};

type ClassWorkDetail = {
  _id: string;
  name: string;
  description: string;
  type: string;
  dueDate: string;
  moduleName: string;
  file: string;
  batch: string;
};

const ResultsPage = () => {
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [moduleList, setModuleList] = useState<ModuleDetail[]>([]);
  const [classWorkList, setClassWorkList] = useState<ClassWorkDetail[]>([]);
  const [module, setModule] = useState<string>("Choose");
  const [classWorkType, setClassWorkType] = useState<string>("Assignment");
  const [classWorkName, setClassWorkName] = useState<string>("Assignment 01");
  const [marks, setMarks] = useState<string>("");
  const [grade, setGrade] = useState<string>("");

  useEffect(() => {
    getAllModules();
  }, []);

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  const handleTypeComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setClassWorkType(event.target.value);
    getAllClassWorks(event.target.value);
  };

  const handleModuleComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setModule(event.target.value);
  };

  const handleNameComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setClassWorkName(event.target.value);
  };

  const getAllModules = () => {
    api
      .get(`module/${localStorage.getItem("currentBatch")}`)
      .then((res) => {
        setModuleList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllClassWorks = (value: string) => {
    api
      .get(`classwork/${localStorage.getItem("currentBatch")}/${value}`)
      .then((res) => {
        setClassWorkList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "marks":
        setMarks(value);
        break;
      case "grade":
        setGrade(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newResult = {
      studentId: " ",
      classWorkId: classWorkName,
      mark: marks,
      grade: grade,
    };

    api
      .post("classwork", newResult)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10 sm:px-60">
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
                  Add New Result
                </section>
              </>
            ) : (
              <>
                <section
                  className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
                  onClick={bindAddAndDiscartEvent}
                >
                  <p>Discart Result</p>
                  <span>
                    <DoDisturbOn />
                  </span>
                </section>
                <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
                  <form
                    className="w-full flex flex-col gap-4 sm:px-28"
                    onSubmit={handleSubmit}
                  >
                    <ThemeProvider theme={theme}>
                      <Select
                        fullWidth
                        value={module}
                        onChange={handleModuleComboBox}
                      >
                        <MenuItem disabled value={"Choose"}>
                          Choose the Module
                        </MenuItem>
                        {moduleList.map((module) => (
                          <MenuItem value={module.moduleName}>
                            {module.moduleName}
                          </MenuItem>
                        ))}
                      </Select>
                      <Select
                        fullWidth
                        value={classWorkType}
                        onChange={handleTypeComboBox}
                      >
                        <MenuItem selected value={"Assignment"}>
                          Assignment
                        </MenuItem>
                        <MenuItem value={"Project"}>Project</MenuItem>
                        <MenuItem value={"Quize"}>Quize</MenuItem>
                      </Select>
                      <Select
                        fullWidth
                        value={classWorkName}
                        onChange={handleNameComboBox}
                      >
                        <MenuItem disabled value={"Choose Name"}>
                          Choose Name
                        </MenuItem>
                        {classWorkList.map((work) => (
                          <MenuItem value={work._id}>{work.name}</MenuItem>
                        ))}
                      </Select>
                      <TextField
                        label="Marks"
                        fullWidth
                        color="primary"
                        name="marks"
                        value={marks}
                        onChange={handleInputChange}
                        placeholder="Enter Marks"
                        required
                      />

                      <TextField
                        label="Grade"
                        fullWidth
                        color="primary"
                        name="grade"
                        value={grade}
                        onChange={handleInputChange}
                        placeholder="Enter Marks"
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
        <h1>Assignments</h1>
        <h1>Courseworks</h1>
        <h1>Projects</h1>
      </section>
    </>
  );
};

export default ResultsPage;
