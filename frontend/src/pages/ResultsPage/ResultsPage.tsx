import { useState } from "react";
import Header from "../../components/Header";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import {
  Button,
  MenuItem,
  Select,
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

const ResultsPage = () => {
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
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
                  <form
                    className="w-full flex flex-col gap-4 sm:px-28"
                    // onSubmit={handleSubmit}
                  >
                    <ThemeProvider theme={theme}>
                      <Select
                        fullWidth
                        // value={type}
                        // onChange={handleTypeComboBox}
                      >
                        <MenuItem selected value={"Assignment"}>
                          Assignment
                        </MenuItem>
                        <MenuItem value={"Project"}>Project</MenuItem>
                        <MenuItem value={"Quize"}>Quize</MenuItem>
                      </Select>
                      <Select
                        fullWidth
                        // value={type}
                        // onChange={handleTypeComboBox}
                      >
                        <MenuItem selected value={"Assignment"}>
                          Assignment
                        </MenuItem>
                        <MenuItem value={"Project"}>Project</MenuItem>
                        <MenuItem value={"Quize"}>Quize</MenuItem>
                      </Select>
                      <TextField
                        label="Marks"
                        fullWidth
                        color="primary"
                        name="marks"
                        // value={classWorkName}
                        // onChange={handleInputChange}
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
