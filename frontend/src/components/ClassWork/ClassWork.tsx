import { Add, PictureAsPdf } from "@mui/icons-material";
import { useState } from "react";
import api from "../../api";

type ClassWorkDetail = {
  _id: string;
  name: string;
  type: string;
  description: string;
  dueDate: string;
  moduleName: string;
  file: string;
  batch: string;
};

const ClassWork = (props: ClassWorkDetail) => {
  const [file, setFile] = useState<any>("");

  const handleFileSelect = (event: any) => {
    setFile(event.target.files[0]);
  };

  const submitAnswer = () => {
    const newAnswer = {
      studentUsername: localStorage.getItem("currentUsername"),
      studentName: localStorage.getItem("currentStudent"),
      submissionStatus: "Submitted",
      file: " ",
      batch: localStorage.getItem("currentBatch"),
      classWorkId: props._id,
    };
    api
      .post("answer", newAnswer)
      .then((res) => {
        let id = res.data.responseData._id;

        let formData = new FormData();
        formData.append("files", file);
        api
          .put(`answer/image/${id}`, formData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="md:w-1/2 border p-10 rounded-lg flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <span className="text-gray-700 text-lg font-semibold">
          {props.moduleName}
        </span>
        <span className="text-gray-700">{props.name}</span>
        <span className="text-xs text-gray-600">Due {props.dueDate}</span>
      </div>

      <section className="text-gray-700 text-center">
        {props.description}
      </section>

      <section className="flex mb-10">
        <a
          href={props.file}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full text-white"
          target="_blank"
        >
          <PictureAsPdf /> Document
        </a>
      </section>
      <h6 className="text-gray-700">Submission Status : Pending</h6>
      <aside className="w-full border p-6 rounded-lg flex flex-col items-center gap-4">
        <p className="text-gray-700 font-semibold">Submit Your Work</p>
        <section className="w-40 h-40 border rounded-lg flex justify-center relative">
          <input
            className="opacity-0 cursor-pointer w-full h-full z-10"
            type="file"
            name="files"
            multiple
            onChange={handleFileSelect}
          />
          <Add className="text-gray-200 !text-8xl absolute top-0 bottom-0 left-0 right-0 m-auto" />
        </section>
        <button
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg w-max"
          onClick={submitAnswer}
        >
          Submit
        </button>
      </aside>
    </main>
  );
};

export default ClassWork;
