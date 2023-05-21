import { Add, PictureAsPdf } from "@mui/icons-material";
import { useEffect, useState } from "react";
import api from "../../api";
import Swal from "sweetalert2";

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

type AnswerDetail = {
  studentUsername: string;
  studentName: string;
  submissionStatus: string;
  file: string;
  batch: string;
  classWorkId: string;
};

const ClassWork = (props: ClassWorkDetail) => {
  const [file, setFile] = useState<any>("");
  const [answerList, setAnswerList] = useState<AnswerDetail[]>([]);

  useEffect(() => {
    getAllAnswers();
  }, []);

  const getAllAnswers = () => {
    api
      .get(`answer/${localStorage.getItem("currentUsername")}/${props._id}`)
      .then((res) => {
        setAnswerList(res.data.responseData);
      });
  };

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
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Saved..!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllAnswers();
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
    <main className="w-full border p-10 rounded-lg flex flex-col items-center gap-6 shadow-xl">
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

      <section className="flex mb-5">
        <a
          href={props.file}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full text-white"
          target="_blank"
        >
          <PictureAsPdf /> {props.file.split("/").pop()}
        </a>
      </section>
      <section>
        <h1 className="text-gray-700 font-semibold">Answers</h1>
        {answerList.map((answer) => (
          <div className="flex flex-col justify-center items-center gap-2 border px-2 py-4 rounded-lg">
            <h6 className="text-gray-700">
              Submission Status :{"  "}
              <span
                className={
                  answer.submissionStatus == "Submitted"
                    ? "text-green-600 font-semibold"
                    : "text-red-700 font-semibold"
                }
              >
                {answer.submissionStatus}
              </span>
            </h6>
            <a
              href={answer.file}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full text-white opacity-70 hover:opacity-100 text-sm"
              target="_blank"
            >
              <PictureAsPdf /> {answer.file.split("/").pop()}
            </a>
          </div>
        ))}
      </section>

      <aside className="w-full border p-6 rounded-lg flex flex-col items-center gap-4">
        <p className="text-gray-700 font-semibold">Submit Your Work</p>
        <section className="w-28 h-28 border rounded-lg flex justify-center relative">
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
