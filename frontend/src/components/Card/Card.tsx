import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";

type StudentProps = {
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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Card = (props: StudentProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <aside
        className="flex flex-col items-center text-sm cursor-pointer"
        onClick={handleOpen}
      >
        <Avatar className="border" src={props.profilePhoto}></Avatar>
        <h1>{props.name}</h1>
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
        </Box>
      </Modal>
    </>
  );
};

export default Card;
