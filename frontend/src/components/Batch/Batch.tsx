import { Delete, Edit } from "@mui/icons-material";
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

  const editBatch = (event: React.MouseEvent<HTMLElement>) => {
    handleOpen();
    api
      .put(`batch/${props._id}`)
      .then((res) => {
        setBatchName(res.data.responseData.batchName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-2xl text-sky-edited-500 font-semibold cursor-pointer">
      {props.batchName}
      <span className="text-xs text-gray-700 font-normal">
        ID : {props._id}
      </span>
      <section className="flex gap-4">
        <button className="text-lg" onClick={editBatch}>
          <Edit className="!text-lg" />
        </button>
        <button className="text-lg" onClick={() => deleteBatch(props._id)}>
          <Delete className="!text-lg" />
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
