import Batch from "../../components/Batch/Batch";
import Header from "../../components/Header/Header";
import api from "../../api";
import { useEffect, useState } from "react";

type BatchDetail = {
  _id: string;
  batchName: string;
};

const BatchPage = () => {
  const [batchList, setBatchList] = useState<BatchDetail[]>([]);

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

  return (
    <>
      <Header />
      <main className="mt-20 p-10 grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
        {batchList.map((batch) => (
          <Batch key={batch._id} _id={batch._id} batchName={batch.batchName} />
        ))}
      </main>
    </>
  );
};

export default BatchPage;
