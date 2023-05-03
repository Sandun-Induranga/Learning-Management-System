type BatchDetail = {
  _id: string;
  batchName: string;
};

const Batch = (props: BatchDetail) => {
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
