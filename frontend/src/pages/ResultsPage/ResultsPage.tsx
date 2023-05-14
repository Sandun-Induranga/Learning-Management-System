import Header from "../../components/Header";
import api from "../../api";
import { useEffect, useState } from "react";

type ResultDetail = {
  studentId: string;
  classWorkId: string;
  mark: number;
  grade: string;
};

type ClassWorkDetail = {
  _id: string;
  name: string;
  description: string;
  type: string;
  dueDate: string;
  moduleName: string;
  file: string;
  batch: string;
};

const ResultsPage = () => {
  const [resultList, setResultList] = useState<ResultDetail[]>([]);
  const [classWork, setClassWork] = useState<ClassWorkDetail>();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    api.get("result").then((res) => {
      setResultList(res.data.responseData);
    });
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10 sm:px-60">
        <h1 className="text-2xl text-slate-700">Assignments</h1>
        {resultList.map((result) => (
          <>
            {api
              .get(`classwork/:${result.classWorkId}`)
              .then((res) => {
                setClassWork(res.data.responseData);
              })
              .catch((error) => {
                console.log(error);
              })}
            <h1>ClassWork : {classWork?.name}</h1>
            <h1>Module Name : {classWork?.moduleName}</h1>
            <h1>Marks : {result.mark}</h1>
            <h1>Grade : {result.grade}</h1>
          </>
        ))}
      </section>
    </>
  );
};

export default ResultsPage;
