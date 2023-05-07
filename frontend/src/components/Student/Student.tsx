import { Box, Button, Modal, TextField, ThemeProvider } from "@mui/material";

type StudentDetail = {
  _id: string;
  nic: string;
  studentName: string;
  address: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchName: string;
  profilePhoto: string;
};

const Student = (props: StudentDetail) => {
  return (
    <>
      <tr className="h-12 cursor-pointer text-center">
        <td>{props._id}</td>
        <td>{props.studentName}</td>
        <td>{props.address}</td>
        <td>{props.email}</td>
        <td>{props.contact}</td>
        <td>{props.username}</td>
        <td>{props.batchName}</td>
      </tr>
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
                value={props._id}
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
    </>
  );
};

export default Student;
