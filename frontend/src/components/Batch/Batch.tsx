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
import Swal from "sweetalert2";

type BatchDetail = {
  _id: string;
  batchName: string;
  updateBatchList: () => void;
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

const Batch = (props: BatchDetail) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [batchName, setBatchName] = useState<string>("");

  const deleteBatch = (batchId: string) => {
    api
      .delete(`batch/${batchId}`)
      .then((res) => {
        props.updateBatchList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newBatch = {
      batchName: batchName,
    };

    api
      .put(`batch/${props._id}`, newBatch)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Updated..!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        props.updateBatchList();
      })
      .catch((error) => {
        console.log(error);
      });

    handleClose();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "batchName") {
      setBatchName(value);
    }
  };

  const editBatch = () => {
    handleOpen();
    setBatchName(props.batchName);
  };

  const setCurrentBatch = () => {
    localStorage.setItem("currentBatch", props.batchName);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold gap-y-4">
      {props.batchName}
      <span className="text-xs text-white font-normal">ID : {props._id}</span>
      <section className="flex gap-4">
        <NavLink to={"/student"}>
          <button
            className="bg-gradient-to-r from-green-300 to-green-600  rounded-full w-6 h-6 flex justify-center items-center"
            onClick={setCurrentBatch}
          >
            <Visibility className="!text-sm text-white" />
          </button>
        </NavLink>
        <button
          className="bg-gradient-to-r from-yellow-500 to-yellow-900  rounded-full w-6 h-6 flex justify-center items-center"
          onClick={editBatch}
        >
          <Edit className="!text-sm text-white" />
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-red-900 rounded-full w-6 h-6 flex justify-center items-center"
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
                label="Batch Name"
                fullWidth
                color="primary"
                name="batchName"
                value={batchName}
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
                Update Batch
              </Button>
            </ThemeProvider>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Batch;
