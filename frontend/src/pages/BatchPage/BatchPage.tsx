import Batch from "../../components/Batch/Batch";
import Header from "../../components/Header/Header";

const BatchPage = () => {
  return (
    <>
      <Header />
      <main className="mt-20 p-10 grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
        <Batch _id="1" batchName="GDSE 60" />
        <Batch _id="1" batchName="GDSE 60" />
        <Batch _id="1" batchName="GDSE 60" />
        <Batch _id="1" batchName="GDSE 60" />
        <Batch _id="1" batchName="GDSE 60" />
      </main>
    </>
  );
};

export default BatchPage;
