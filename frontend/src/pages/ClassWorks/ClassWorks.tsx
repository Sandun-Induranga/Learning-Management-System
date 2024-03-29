import { ChangeEvent, useEffect, useState } from "react";
import ClassWork from "../../components/ClassWork/ClassWork";
import Header from "../../components/Header";
import api from "../../api";
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
import Swal from "sweetalert2";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

const ClassWorks = () => {
  const [classWorkList, setClassWorkList] = useState<ClassWorkDetail[]>([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [classWorkName, setClassWorkName] = useState<string>("");
  const [type, setType] = useState<string>("Assignment");
  const [moduleName, setModuleName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<any>(" ");
  const [moduleList, setModuleList] = useState<any[]>([]);

  useEffect(() => {
    getAllClassWorks();
    getAllModules();
  }, []);

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  const handleFileSelect = (event: any) => {
    setFile(event.target.files[0]);
  };

  const getAllClassWorks = () => {
    api
      .get(`classwork/batch/${localStorage.getItem("currentBatch")}`)
      .then((res) => {
        setClassWorkList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllModules = () => {
    api
      .get("module")
      .then((res) => {
        setModuleList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "classWorkName":
        setClassWorkName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "dueDate":
        setDueDate("2022-10-20");
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newClassWork = {
      name: classWorkName,
      type: type,
      dueDate: dueDate,
      description: description,
      moduleName: moduleName,
      file: " ",
      batch: localStorage.getItem("currentBatch"),
    };

    api
      .post("classwork", newClassWork)
      .then((res) => {
        let id = res.data.responseData._id;

        let formData = new FormData();
        formData.append("files", file);
        api
          .put(`classwork/image/${id}`, formData)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Saved..!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllClassWorks();
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

  const handleTypeComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setType(event.target.value);
  };

  const handleModuleComboBox = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setModuleName(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4 sm:px-64 mx-36">
        {localStorage.getItem("currentRole") == "Teacher" ? (
          <>
            {!isClickedAddButton ? (
              <>
                <section
                  className="w-full h-12 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center cursor-pointer px-20"
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
                  className="w-full h-12 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center cursor-pointer px-20"
                  onClick={bindAddAndDiscartEvent}
                >
                  <p>Discart Class Work</p>
                  <span>
                    <DoDisturbOn />
                  </span>
                </section>
                <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
                  <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleSubmit}
                  >
                    <ThemeProvider theme={theme}>
                      <TextField
                        label="Name"
                        fullWidth
                        color="primary"
                        name="classWorkName"
                        value={classWorkName}
                        onChange={handleInputChange}
                        placeholder="Enter Class Work Name"
                        required
                      />
                      <Select
                        fullWidth
                        value={type}
                        onChange={handleTypeComboBox}
                      >
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
                        name="dueDate"
                        value={dueDate}
                        onChange={handleInputChange}
                        placeholder="Enter Class Work Name"
                        type="date"
                        // required
                      />
                      <Select
                        fullWidth
                        value={moduleName}
                        onChange={handleModuleComboBox}
                      >
                        {moduleList.map((module) => (
                          <MenuItem selected value={module.moduleName}>
                            {module.moduleName}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField
                        label="Description"
                        fullWidth
                        color="primary"
                        name="description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleInputChange}
                        placeholder="Enter Batch Name"
                        required
                      />
                      <section className="w-40 h-40 border rounded-lg flex justify-center relative">
                        <input
                          className="opacity-0 cursor-pointer w-full h-full z-10"
                          type="file"
                          name="files"
                          id="file"
                          onChange={handleFileSelect}
                          multiple
                        />
                        <Add className="text-gray-200 !text-8xl absolute top-0 bottom-0 left-0 right-0 m-auto" />
                      </section>
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
            _id={classWork._id}
            name={classWork.name}
            description={classWork.description}
            dueDate={classWork.dueDate}
            batch={classWork.batch}
            moduleName={classWork.moduleName}
            type={classWork.type}
            file={classWork.file}
          />
        ))}
      </div>
    </>
  );
};

export default ClassWorks;
