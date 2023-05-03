import api from "../../api";

type BatchDetail = {
  _id: string;
  batchName: string;
  removeBatchFromList?: (batchId: string) => void;
};

const Batch = (props: BatchDetail) => {
  const deleteBatch = (batchId: string) => {
    api
      .delete(`batch/${batchId}`)
      .then((res) => {
        if (props.removeBatchFromList) {
          props.removeBatchFromList(batchId);
        }
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
    </div>
  );
};

export default Batch;
