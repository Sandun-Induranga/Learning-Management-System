import {
  Avatar,
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

type StudentProps = {
  id?: string;
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
  boxShadow: 24,
  p: 2,
};

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

const Card = (props: StudentProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      studentId: props.id,
      classWorkId: classWorkName,
      mark: marks,
      grade: grade,
    };

    api
      .post("result", newResult)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <aside
        className="flex flex-col items-center text-sm cursor-pointer"
        onClick={handleOpen}
      >
        <Avatar className="border" src={props.profilePhoto}></Avatar>
        <h1>{props.name}</h1>
        {localStorage.getItem("currentRole") == "Teacher" ? (
          <div className="flex flex-col gap-2">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-white rounded-lg text-xs">
              Add Result
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-white rounded-lg text-xs">
              View Result
            </button>
          </div>
        ) : (
          <></>
        )}
      </aside>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
            <form
              className="w-full flex flex-col gap-4"
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
                  Save Result
                </Button>
              </ThemeProvider>
            </form>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default Card;
