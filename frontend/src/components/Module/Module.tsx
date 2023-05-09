import { Delete, Edit, Visibility } from "@mui/icons-material";
import api from "../../api";
import {
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

type ModuleDetail = {
  _id: string;
  batchName: string | null;
  moduleName: string;
  updateModuleList: () => void;
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

const Module = (props: ModuleDetail) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [moduleName, setModuleName] = useState<string>("");

  const deleteBatch = (batchId: string) => {
    api
      .delete(`batch/${batchId}`)
      .then((res) => {
        props.updateModuleList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newModule = {
      batchName: props.batchName,
      moduleName: moduleName,
    };

    api
      .put(`batch/${props._id}`, newModule)
      .then((res) => {
        props.updateModuleList();
      })
      .catch((error) => {
        console.log(error);
      });

    handleClose();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setModuleName(value);
  };

  const editBatch = (event: React.MouseEvent<HTMLElement>) => {
    handleOpen();
    api
      .put(`batch/${props._id}`)
      .then((res) => {
        setModuleName(res.data.responseData.batchName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-2xl text-sky-edited-500 font-semibold cursor-pointer gap-y-4">
      {props.batchName}
      <span className="text-xs text-gray-700 font-normal">
        ID : {props._id}
      </span>
      <section className="flex gap-4">
        <button className="bg-sky-edited-500 rounded-full w-6 h-6 flex justify-center items-center">
          <NavLink to={"/student"}>
            <Visibility className="!text-sm text-white" />
          </NavLink>
        </button>
        <button
          className="bg-sky-edited-500 rounded-full w-6 h-6 flex justify-center items-center"
          onClick={editBatch}
        >
          <Edit className="!text-sm text-white" />
        </button>
        <button
          className="bg-sky-edited-500 rounded-full w-6 h-6 flex justify-center items-center"
          onClick={() => deleteBatch(props._id)}
        >
          <Delete className="!text-sm text-white" />
        </button>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                Update Module
              </Button>
            </ThemeProvider>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Module;
