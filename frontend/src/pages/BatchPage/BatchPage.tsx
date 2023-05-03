import Batch from "../../components/Batch/Batch";
import Header from "../../components/Header/Header";
import api from "../../api";
import { useEffect, useState } from "react";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";

type BatchDetail = {
  _id: string;
  batchName: string;
};

const BatchPage = () => {
  const [batchList, setBatchList] = useState<BatchDetail[]>([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(false);

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
            <section
              className="w-full h-32 border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 cursor-pointer"
              onClick={bindAddAndDiscartEvent}
            >
              <DoDisturbOn />
              Discart Batch
            </section>
          </>
        )}

        <main className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
          {batchList.map((batch) => (
            <Batch
              key={batch._id}
              _id={batch._id}
              batchName={batch.batchName}
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default BatchPage;
