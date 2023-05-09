import Header from "../../components/Header";
import api from "../../api";
import { ChangeEvent, useEffect, useState } from "react";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";
import Module from "../../components/Module";

type ModuleDetail = {
  _id: string;
  batchName: string | null;
  moduleName: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

const ModulePage = () => {
  const [moduleList, setModuleList] = useState<ModuleDetail[]>([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [moduleName, setModuleName] = useState<string>("");

  useEffect(() => {
    getAllModules();
  }, []);

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

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setModuleName(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newModule = {
      batchName: localStorage.getItem("currentBatch"),
      moduleName: moduleName,
    };

    api
      .post("module", newModule)
      .then((res) => {
        getAllModules();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateModuleList = () => {
    getAllModules();
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
              <p>Add New Module</p>
              <span>
                <AddCircle />
              </span>
            </section>
            <section
              className="w-full h-32 border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 cursor-pointer"
              onClick={bindAddAndDiscartEvent}
            >
              <AddCircle />
              Add New Module
            </section>
          </>
        ) : (
          <>
            <section
              className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
              onClick={bindAddAndDiscartEvent}
            >
              <p>Discart Batch</p>
              <span>
                <DoDisturbOn />
              </span>
            </section>
            <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
              <form className="w-ful" onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Module Name"
                    fullWidth
                    color="primary"
                    name="moduleName"
                    value={moduleName}
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
                    Save Module
                  </Button>
                </ThemeProvider>
              </form>
            </section>
          </>
        )}

        <main className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
          {moduleList.map((module) => (
            <Module
              _id={module._id}
              batchName={localStorage.getItem("currentBatch")}
              moduleName={module.moduleName}
              updateModuleList={getAllModules}
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default ModulePage;
