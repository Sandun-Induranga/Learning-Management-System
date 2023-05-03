import Batch from "../../components/Batch/Batch";
import Header from "../../components/Header/Header";
import api from "../../api";
import { ChangeEvent, useEffect, useState } from "react";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";

type BatchDetail = {
  _id: string;
  batchName: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFE",
    },
  },
});

const BatchPage = () => {
  const [batchList, setBatchList] = useState<BatchDetail[]>([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);
  const [batchName, setBatchName] = useState<string>("");

  useEffect(() => {
    getAllBatches();
  });

  const getAllBatches = () => {
    api
      .get("batch")
      .then((res) => {
        setBatchList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "batchName") {
      setBatchName(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newBatch = {
      batchName: batchName,
    };

    api
      .post("batch", newBatch)
      .then((res) => {
        console.log(res);
        let batches = batchList;
        batches.push(res.data.responseData);
        setBatchList(batches);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeBatchFromList = (batchId: string) => {
    setBatchList(batchList.filter((batch) => batch._id !== batchId));
  };

  const updateBatchList = () => {
    getAllBatches();
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
              <p>Add New Batch</p>
              <span>
                <AddCircle />
              </span>
            </section>
            <section
              className="w-full h-32 border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 cursor-pointer"
              onClick={bindAddAndDiscartEvent}
            >
              <AddCircle />
              Add New Batch
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
                    Save Batch
                  </Button>
                </ThemeProvider>
              </form>
            </section>
          </>
        )}

        <main className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
          {batchList.map((batch) => (
            <Batch
              key={batch._id}
              _id={batch._id}
              batchName={batch.batchName}
              removeBatchFromList={removeBatchFromList}
              updateBatchList={updateBatchList}
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default BatchPage;
